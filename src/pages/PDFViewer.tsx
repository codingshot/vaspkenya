import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { 
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Search, 
  FileText, MessageSquare, Download, 
  Trash2, Edit3, X, Check, BookOpen, Grid, Loader2,
  ArrowLeft, ArrowRight, Home
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

// Import PDF.js styles
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker with CDN for better performance
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Comment {
  id: string;
  page: number;
  text: string;
  createdAt: string;
}

interface PDFRevision {
  id: string;
  name: string;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'vasp-pdf-revisions';

const PDFViewer = () => {
  const [searchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialSearch = searchParams.get('search') || '';
  
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [scale, setScale] = useState(1.0);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [searchResults, setSearchResults] = useState<{page: number; text: string}[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [pdfText, setPdfText] = useState<Record<number, string>>({});
  const [showRevisions, setShowRevisions] = useState(false);
  const [revisions, setRevisions] = useState<PDFRevision[]>([]);
  const [activeRevision, setActiveRevision] = useState<PDFRevision | null>(null);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [newRevisionName, setNewRevisionName] = useState('');
  const [showNewRevisionDialog, setShowNewRevisionDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'single' | 'thumbnails'>('single');
  const [textExtractionProgress, setTextExtractionProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const pdfUrl = '/documents/VASP_Bill_2025_Kenya.pdf';
  
  // Calculate responsive scale based on container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth - 32; // Account for padding
        setContainerWidth(width);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && pageNumber > 1) {
        setPageNumber(p => p - 1);
      } else if (e.key === 'ArrowRight' && pageNumber < numPages) {
        setPageNumber(p => p + 1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pageNumber, numPages]);

  // Auto-search if URL has search param
  useEffect(() => {
    if (initialSearch && Object.keys(pdfText).length > 0) {
      handleSearch();
    }
  }, [pdfText, initialSearch]);

  // Load revisions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRevisions(parsed);
      } catch (e) {
        console.error('Failed to parse revisions', e);
      }
    }
  }, []);

  // Save revisions to localStorage
  const saveRevisions = useCallback((newRevisions: PDFRevision[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRevisions));
    setRevisions(newRevisions);
  }, []);

  const onDocumentLoadSuccess = async ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    // Extract text from all pages in background
    extractAllText(numPages);
  };

  const extractAllText = async (totalPages: number) => {
    try {
      const pdf = await pdfjs.getDocument(pdfUrl).promise;
      const textContent: Record<number, string> = {};
      
      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const text = await page.getTextContent();
        const pageText = text.items
          .map((item: any) => item.str)
          .join(' ');
        textContent[i] = pageText;
        setTextExtractionProgress(Math.round((i / totalPages) * 100));
      }
      
      setPdfText(textContent);
    } catch (error) {
      console.error('Error extracting text:', error);
    }
  };

  // Search functionality
  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const results: {page: number; text: string}[] = [];
    const query = searchQuery.toLowerCase();

    Object.entries(pdfText).forEach(([pageNum, text]) => {
      if (text.toLowerCase().includes(query)) {
        const lowerText = text.toLowerCase();
        const matchIndex = lowerText.indexOf(query);
        const start = Math.max(0, matchIndex - 50);
        const end = Math.min(text.length, matchIndex + query.length + 50);
        const context = text.slice(start, end);
        
        results.push({
          page: parseInt(pageNum),
          text: (start > 0 ? '...' : '') + context + (end < text.length ? '...' : '')
        });
      }
    });

    setSearchResults(results);
    setIsSearching(false);
  }, [searchQuery, pdfText]);

  // Revision functions
  const createRevision = () => {
    if (!newRevisionName.trim()) return;
    
    const revision: PDFRevision = {
      id: Date.now().toString(),
      name: newRevisionName.trim(),
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updated = [...revisions, revision];
    saveRevisions(updated);
    setActiveRevision(revision);
    setNewRevisionName('');
    setShowNewRevisionDialog(false);
    setShowRevisions(true);
  };

  const deleteRevision = (id: string) => {
    const updated = revisions.filter(r => r.id !== id);
    saveRevisions(updated);
    if (activeRevision?.id === id) {
      setActiveRevision(null);
    }
  };

  const addComment = () => {
    if (!activeRevision || !newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      page: pageNumber,
      text: newComment.trim(),
      createdAt: new Date().toISOString()
    };
    
    const updatedRevision = {
      ...activeRevision,
      comments: [...activeRevision.comments, comment],
      updatedAt: new Date().toISOString()
    };
    
    const updated = revisions.map(r => 
      r.id === activeRevision.id ? updatedRevision : r
    );
    
    saveRevisions(updated);
    setActiveRevision(updatedRevision);
    setNewComment('');
  };

  const updateComment = (commentId: string) => {
    if (!activeRevision || !editingText.trim()) return;
    
    const updatedComments = activeRevision.comments.map(c =>
      c.id === commentId ? { ...c, text: editingText.trim() } : c
    );
    
    const updatedRevision = {
      ...activeRevision,
      comments: updatedComments,
      updatedAt: new Date().toISOString()
    };
    
    const updated = revisions.map(r =>
      r.id === activeRevision.id ? updatedRevision : r
    );
    
    saveRevisions(updated);
    setActiveRevision(updatedRevision);
    setEditingComment(null);
    setEditingText('');
  };

  const deleteComment = (commentId: string) => {
    if (!activeRevision) return;
    
    const updatedComments = activeRevision.comments.filter(c => c.id !== commentId);
    const updatedRevision = {
      ...activeRevision,
      comments: updatedComments,
      updatedAt: new Date().toISOString()
    };
    
    const updated = revisions.map(r =>
      r.id === activeRevision.id ? updatedRevision : r
    );
    
    saveRevisions(updated);
    setActiveRevision(updatedRevision);
  };

  const currentPageComments = useMemo(() => {
    if (!activeRevision) return [];
    return activeRevision.comments.filter(c => c.page === pageNumber);
  }, [activeRevision, pageNumber]);

  const goToPage = (page: number) => {
    setPageNumber(Math.max(1, Math.min(page, numPages)));
  };

  const exportRevision = () => {
    if (!activeRevision) return;
    
    const data = JSON.stringify(activeRevision, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeRevision.name.replace(/\s+/g, '_')}_revision.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Calculate page width to fit screen
  const pageWidth = useMemo(() => {
    if (containerWidth === 0) return undefined;
    // Default A4 ratio, fit to container with some margin
    return Math.min(containerWidth * 0.95, 800);
  }, [containerWidth]);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
      <main className="flex-1 container px-2 md:px-4 py-4 md:py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground flex items-center gap-1">
            <Home className="h-3 w-3" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">VASP Act 2025 - Official PDF</span>
        </nav>

        <div className="grid gap-4 lg:grid-cols-[1fr_350px]">
          {/* Main PDF Viewer */}
          <div className="space-y-4">
            {/* Controls */}
            <Card>
              <CardContent className="p-3 md:p-4">
                <div className="flex flex-wrap items-center gap-2 md:gap-4">
                  {/* Page Navigation */}
                  <div className="flex items-center gap-1 md:gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => goToPage(pageNumber - 1)}
                      disabled={pageNumber <= 1}
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-1 text-sm">
                      <Input
                        type="number"
                        value={pageNumber}
                        onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
                        className="w-14 h-8 text-center"
                        min={1}
                        max={numPages}
                        aria-label="Page number"
                      />
                      <span className="text-muted-foreground">/ {numPages || 44}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => goToPage(pageNumber + 1)}
                      disabled={pageNumber >= numPages}
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Zoom */}
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-sm w-12 text-center">{Math.round(scale * 100)}%</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setScale(s => Math.min(2, s + 0.1))}
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* View Mode */}
                  <div className="flex items-center gap-1 border rounded-md">
                    <Button
                      variant={viewMode === 'single' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('single')}
                      className="gap-1"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span className="hidden sm:inline">Page</span>
                    </Button>
                    <Button
                      variant={viewMode === 'thumbnails' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('thumbnails')}
                      className="gap-1"
                    >
                      <Grid className="h-4 w-4" />
                      <span className="hidden sm:inline">Thumbnails</span>
                    </Button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 ml-auto">
                    <Button
                      variant={showRevisions ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setShowRevisions(!showRevisions)}
                      className="gap-1"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span className="hidden sm:inline">Notes</span>
                    </Button>
                    <a href={pdfUrl} download="VASP_Act_2025_Kenya.pdf">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Text Extraction Progress */}
                {textExtractionProgress > 0 && textExtractionProgress < 100 && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Indexing for search: {textExtractionProgress}%
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Search Bar */}
            <Card>
              <CardContent className="p-3 md:p-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search in PDF..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      className="pl-9"
                      disabled={Object.keys(pdfText).length === 0}
                    />
                  </div>
                  <Button onClick={handleSearch} disabled={isSearching || Object.keys(pdfText).length === 0}>
                    {isSearching ? 'Searching...' : 'Search'}
                  </Button>
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">
                      Found {searchResults.length} results:
                    </p>
                    <ScrollArea className="h-48">
                      <div className="space-y-2">
                        {searchResults.map((result, i) => (
                          <button
                            key={i}
                            onClick={() => goToPage(result.page)}
                            className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                          >
                            <Badge variant="secondary" className="mb-1">
                              Page {result.page}
                            </Badge>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {result.text}
                            </p>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* PDF Display with Navigation Arrows */}
            <Card className="overflow-hidden relative">
              {/* Floating Navigation Arrows */}
              {viewMode === 'single' && numPages > 0 && (
                <>
                  <button
                    onClick={() => goToPage(pageNumber - 1)}
                    disabled={pageNumber <= 1}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background border shadow-lg rounded-full p-3 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110"
                    aria-label="Previous page"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => goToPage(pageNumber + 1)}
                    disabled={pageNumber >= numPages}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background border shadow-lg rounded-full p-3 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110"
                    aria-label="Next page"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </button>
                </>
              )}
              
              <CardContent className="p-0" ref={containerRef}>
                <div className="flex justify-center p-4 bg-muted/20 min-h-[500px] md:min-h-[700px]">
                  {viewMode === 'single' ? (
                    <Document
                      file={pdfUrl}
                      onLoadSuccess={onDocumentLoadSuccess}
                      loading={
                        <div className="flex flex-col items-center justify-center h-96 gap-4">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <p className="text-muted-foreground">Loading PDF...</p>
                        </div>
                      }
                      error={
                        <div className="flex items-center justify-center h-96 flex-col gap-4">
                          <div className="text-destructive">Failed to load PDF</div>
                          <a href={pdfUrl} download>
                            <Button variant="outline">Download Instead</Button>
                          </a>
                        </div>
                      }
                    >
                      <Page
                        pageNumber={pageNumber}
                        width={pageWidth ? pageWidth * scale : undefined}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="shadow-lg mx-auto"
                        loading={
                          <div className="flex items-center justify-center h-96">
                            <Loader2 className="h-6 w-6 animate-spin" />
                          </div>
                        }
                      />
                    </Document>
                  ) : (
                    <Document
                      file={pdfUrl}
                      onLoadSuccess={onDocumentLoadSuccess}
                      loading={
                        <div className="flex items-center justify-center h-96">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                      }
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Array.from({ length: numPages }, (_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => {
                              setPageNumber(i + 1);
                              setViewMode('single');
                            }}
                            className={`relative border-2 rounded-lg overflow-hidden transition-all hover:border-primary ${
                              pageNumber === i + 1 ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'
                            }`}
                          >
                            <Page
                              pageNumber={i + 1}
                              width={150}
                              renderTextLayer={false}
                              renderAnnotationLayer={false}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-background/80 py-1 text-center text-xs font-medium">
                              Page {i + 1}
                            </div>
                            {activeRevision?.comments.some(c => c.page === i + 1) && (
                              <Badge className="absolute top-2 right-2" variant="secondary">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                {activeRevision.comments.filter(c => c.page === i + 1).length}
                              </Badge>
                            )}
                          </button>
                        ))}
                      </div>
                    </Document>
                  )}
                </div>

                {/* Page indicator at bottom */}
                {viewMode === 'single' && numPages > 0 && (
                  <div className="flex items-center justify-center gap-2 py-3 bg-muted/50 border-t">
                    <span className="text-sm text-muted-foreground">
                      Page {pageNumber} of {numPages}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      • Use arrow keys or buttons to navigate
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Revisions Panel */}
          {showRevisions && (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Revisions
                    </span>
                    <Dialog open={showNewRevisionDialog} onOpenChange={setShowNewRevisionDialog}>
                      <DialogTrigger asChild>
                        <Button size="sm">New</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Revision</DialogTitle>
                          <DialogDescription>
                            Name your revision session to track comments and notes.
                          </DialogDescription>
                        </DialogHeader>
                        <Input
                          placeholder="e.g., Legal Review - Jan 2025"
                          value={newRevisionName}
                          onChange={(e) => setNewRevisionName(e.target.value)}
                        />
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowNewRevisionDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={createRevision}>Create</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {revisions.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No revisions yet. Create one to start adding comments.
                    </p>
                  ) : (
                    <ScrollArea className="h-40">
                      <div className="space-y-2">
                        {revisions.map((revision) => (
                          <div
                            key={revision.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                              activeRevision?.id === revision.id
                                ? 'border-primary bg-primary/5'
                                : 'hover:border-muted-foreground/50'
                            }`}
                            onClick={() => setActiveRevision(revision)}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-sm">{revision.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {revision.comments.length} comments
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteRevision(revision.id);
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>

              {activeRevision && (
                <>
                  {/* Add Comment */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">
                        Add Comment (Page {pageNumber})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Textarea
                        placeholder="Add your comment about this page..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <Button onClick={addComment} className="w-full" disabled={!newComment.trim()}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Add Comment
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Current Page Comments */}
                  {currentPageComments.length > 0 && (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">
                          Comments on Page {pageNumber}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-48">
                          <div className="space-y-3">
                            {currentPageComments.map((comment) => (
                              <div key={comment.id} className="p-3 bg-muted/50 rounded-lg">
                                {editingComment === comment.id ? (
                                  <div className="space-y-2">
                                    <Textarea
                                      value={editingText}
                                      onChange={(e) => setEditingText(e.target.value)}
                                      className="min-h-[60px]"
                                    />
                                    <div className="flex gap-2">
                                      <Button size="sm" onClick={() => updateComment(comment.id)}>
                                        <Check className="h-3 w-3 mr-1" /> Save
                                      </Button>
                                      <Button size="sm" variant="outline" onClick={() => setEditingComment(null)}>
                                        <X className="h-3 w-3 mr-1" /> Cancel
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <p className="text-sm">{comment.text}</p>
                                    <div className="flex items-center justify-between mt-2">
                                      <span className="text-xs text-muted-foreground">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                      </span>
                                      <div className="flex gap-1">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6"
                                          onClick={() => {
                                            setEditingComment(comment.id);
                                            setEditingText(comment.text);
                                          }}
                                        >
                                          <Edit3 className="h-3 w-3" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6"
                                          onClick={() => deleteComment(comment.id)}
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  )}

                  {/* All Comments */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        All Comments ({activeRevision.comments.length})
                        {activeRevision.comments.length > 0 && (
                          <Button variant="outline" size="sm" onClick={exportRevision}>
                            <Download className="h-3 w-3 mr-1" /> Export
                          </Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {activeRevision.comments.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No comments yet. Navigate to a page and add a comment.
                        </p>
                      ) : (
                        <ScrollArea className="h-60">
                          <div className="space-y-2">
                            {activeRevision.comments
                              .sort((a, b) => a.page - b.page)
                              .map((comment) => (
                                <button
                                  key={comment.id}
                                  onClick={() => goToPage(comment.page)}
                                  className="w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className="text-xs">
                                      Page {comment.page}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {comment.text}
                                  </p>
                                </button>
                              ))}
                          </div>
                        </ScrollArea>
                      )}
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PDFViewer;
