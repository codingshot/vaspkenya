import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, Circle, Clock, Save, RotateCcw, 
  Building2, Shield, FileText, Users, Wallet, AlertTriangle, Download,
  ExternalLink, ChevronRight, Book
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { complianceResources, getResourcesForItem } from '@/data/complianceResources';

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  section: string;
  priority: 'critical' | 'high' | 'medium';
  category: 'entity' | 'licensing' | 'governance' | 'aml' | 'operations' | 'reporting';
}

const complianceItems: ComplianceItem[] = [
  // Entity Requirements
  { id: 'entity-1', title: 'Company Incorporation', description: 'Incorporate under the Companies Act (Cap. 486) or obtain Certificate of Compliance for foreign companies', section: 'Section 3, 9', priority: 'critical', category: 'entity' },
  { id: 'entity-2', title: 'Registered Office in Kenya', description: 'Establish and maintain a registered office in Kenya', section: 'Section 20', priority: 'critical', category: 'entity' },
  { id: 'entity-3', title: 'Kenya Bank Account', description: 'Open and maintain a bank account in Kenya', section: 'Section 25(g)', priority: 'high', category: 'entity' },
  // Licensing Requirements
  { id: 'license-1', title: 'License Application Submitted', description: 'Submit complete license application to relevant regulatory authority (CMA/CBK)', section: 'Section 11', priority: 'critical', category: 'licensing' },
  { id: 'license-2', title: 'Application Fee Paid', description: 'Pay prescribed non-refundable application fee', section: 'Section 11', priority: 'high', category: 'licensing' },
  { id: 'license-3', title: 'License Displayed', description: 'Display license at principal place of business once obtained', section: 'Section 13', priority: 'medium', category: 'licensing' },
  // Governance Requirements
  { id: 'gov-1', title: 'Board of Directors Appointed', description: 'Appoint at least 2 natural persons as directors', section: 'Section 21', priority: 'critical', category: 'governance' },
  { id: 'gov-2', title: 'Fit and Proper Assessment', description: 'Ensure all directors and key officers pass fit and proper assessment', section: 'Section 19', priority: 'critical', category: 'governance' },
  { id: 'gov-3', title: 'CEO Appointment', description: 'Appoint a fit and proper Chief Executive Officer', section: 'Section 19', priority: 'high', category: 'governance' },
  { id: 'gov-4', title: 'Compliance Officer', description: 'Designate a compliance officer responsible for regulatory matters', section: 'Section 25', priority: 'high', category: 'governance' },
  // AML/CFT/CPF Requirements
  { id: 'aml-1', title: 'AML/KYC Program Established', description: 'Implement customer due diligence and KYC procedures compliant with POCAMLA', section: 'Section 33', priority: 'critical', category: 'aml' },
  { id: 'aml-2', title: 'Suspicious Activity Reporting', description: 'Establish procedures for detecting and reporting suspicious transactions to FRC', section: 'Section 33', priority: 'critical', category: 'aml' },
  { id: 'aml-3', title: 'Sanctions Screening', description: 'Implement screening against targeted financial sanctions lists', section: 'Section 33', priority: 'high', category: 'aml' },
  { id: 'aml-4', title: 'Risk Assessment Framework', description: 'Conduct and document institutional ML/TF/PF risk assessment', section: 'Section 33', priority: 'high', category: 'aml' },
  // Operations Requirements
  { id: 'ops-1', title: 'Cyber Security Framework', description: 'Implement measures per Computer Misuse and Cybercrimes Act', section: 'Section 29', priority: 'critical', category: 'operations' },
  { id: 'ops-2', title: 'Customer Asset Protection', description: 'Segregate customer assets and maintain sufficient reserves', section: 'Section 32', priority: 'critical', category: 'operations' },
  { id: 'ops-3', title: 'Business Continuity Plan', description: 'Develop and test business continuity and disaster recovery plan', section: 'Section 25(i)', priority: 'high', category: 'operations' },
  { id: 'ops-4', title: 'Data Protection Compliance', description: 'Comply with Data Protection Act requirements', section: 'Section 25(h)', priority: 'high', category: 'operations' },
  { id: 'ops-5', title: 'Customer Complaint Mechanism', description: 'Establish mechanism to handle and address customer complaints', section: 'Section 25(j)', priority: 'medium', category: 'operations' },
  { id: 'ops-6', title: 'Professional Insurance', description: 'Obtain professional indemnity insurance covering operational risks', section: 'Section 23', priority: 'high', category: 'operations' },
  // Reporting Requirements
  { id: 'report-1', title: 'Auditor Appointed', description: 'Engage an approved auditor for annual financial statements', section: 'Section 25(f)', priority: 'high', category: 'reporting' },
  { id: 'report-2', title: '7-Year Record Keeping', description: 'Establish system to maintain transaction records for 7 years', section: 'Section 44', priority: 'high', category: 'reporting' },
  { id: 'report-3', title: 'Real-Time Access Capability', description: 'Capability to provide regulators with real-time read-only transaction access', section: 'Section 44', priority: 'medium', category: 'reporting' },
  { id: 'report-4', title: 'Incident Notification Procedures', description: 'Establish procedures for notifying regulators of material events within 7 working days', section: 'Section 26', priority: 'high', category: 'reporting' }
];

const categoryInfo = {
  entity: { label: 'Entity Setup', icon: Building2, color: 'text-blue-600' },
  licensing: { label: 'Licensing', icon: FileText, color: 'text-green-600' },
  governance: { label: 'Governance', icon: Users, color: 'text-purple-600' },
  aml: { label: 'AML/CFT/CPF', icon: Shield, color: 'text-red-600' },
  operations: { label: 'Operations', icon: Wallet, color: 'text-amber-600' },
  reporting: { label: 'Reporting', icon: Clock, color: 'text-cyan-600' }
};

const STORAGE_KEY = 'vasp-compliance-tracker';

export const ComplianceTracker = () => {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [inProgressItems, setInProgressItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['entity', 'licensing']));
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCompletedItems(new Set(data.completed || []));
        setInProgressItems(new Set(data.inProgress || []));
        setLastSaved(data.timestamp);
      } catch (e) {
        console.error('Error loading saved progress:', e);
      }
    }
  }, []);

  useEffect(() => {
    const data = {
      completed: Array.from(completedItems),
      inProgress: Array.from(inProgressItems),
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setLastSaved(data.timestamp);
  }, [completedItems, inProgressItems]);

  const toggleItem = (id: string) => {
    if (completedItems.has(id)) {
      const newCompleted = new Set(completedItems);
      newCompleted.delete(id);
      setCompletedItems(newCompleted);
    } else if (inProgressItems.has(id)) {
      const newInProgress = new Set(inProgressItems);
      newInProgress.delete(id);
      setInProgressItems(newInProgress);
      setCompletedItems(new Set([...completedItems, id]));
    } else {
      setInProgressItems(new Set([...inProgressItems, id]));
    }
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setCompletedItems(new Set());
      setInProgressItems(new Set());
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getItemStatus = (id: string) => {
    if (completedItems.has(id)) return 'completed';
    if (inProgressItems.has(id)) return 'in-progress';
    return 'not-started';
  };

  const getItemsByCategory = (category: string) => complianceItems.filter(item => item.category === category);

  const getCategoryProgress = (category: string) => {
    const items = getItemsByCategory(category);
    const completed = items.filter(item => completedItems.has(item.id)).length;
    return (completed / items.length) * 100;
  };

  const totalProgress = (completedItems.size / complianceItems.length) * 100;
  const criticalItems = complianceItems.filter(item => item.priority === 'critical');
  const criticalCompleted = criticalItems.filter(item => completedItems.has(item.id)).length;

  const exportProgress = () => {
    const data = {
      exportDate: new Date().toISOString(),
      totalItems: complianceItems.length,
      completed: Array.from(completedItems),
      inProgress: Array.from(inProgressItems),
      summary: {
        totalProgress: `${Math.round(totalProgress)}%`,
        criticalProgress: `${criticalCompleted}/${criticalItems.length}`,
        byCategory: Object.keys(categoryInfo).map(cat => ({
          category: categoryInfo[cat as keyof typeof categoryInfo].label,
          progress: `${Math.round(getCategoryProgress(cat))}%`
        }))
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vasp-compliance-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="compliance-tracker" className="py-12 md:py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center mb-8 md:mb-12">
          <Badge className="mb-3 md:mb-4 bg-primary/10 text-primary hover:bg-primary/20 text-xs md:text-sm">
            Interactive Tool
          </Badge>
          <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-3 md:mb-4">
            Compliance Progress Tracker
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground mb-4">
            Track your VASP licensing requirements. Progress auto-saves to your browser.
          </p>
          
          {/* Explanation Card */}
          <Card className="max-w-2xl mx-auto text-left mb-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Book className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium mb-1">How to use this tracker:</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Click once to mark as "In Progress"</li>
                    <li>• Click again to mark as "Completed"</li>
                    <li>• Click a third time to reset to "Not Started"</li>
                    <li>• Click the info button to see detailed resources and guidance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          {/* Overall Progress Card */}
          <Card className="border-2 border-primary/20">
            <CardContent className="p-4 md:p-6">
              <div className="grid gap-4 md:gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">{completedItems.size}/{complianceItems.length} items</span>
                  </div>
                  <Progress value={totalProgress} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-2">{Math.round(totalProgress)}% complete</p>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Critical Items</span>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-primary">{criticalCompleted}/{criticalItems.length}</p>
                </div>
              </div>
              {lastSaved && (
                <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                  <Save className="h-3 w-3" />
                  Auto-saved: {new Date(lastSaved).toLocaleString()}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            <Button variant="outline" size="sm" onClick={exportProgress} className="gap-1.5 text-xs md:text-sm">
              <Download className="h-3.5 w-3.5" />
              Export Progress
            </Button>
            <Button variant="outline" size="sm" onClick={resetProgress} className="gap-1.5 text-xs md:text-sm text-destructive hover:text-destructive">
              <RotateCcw className="h-3.5 w-3.5" />
              Reset All
            </Button>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-1.5">
              <Circle className="h-4 w-4 text-muted-foreground" />
              <span>Not Started</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-amber-500" />
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Completed</span>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full flex-wrap h-auto gap-1 bg-muted/50 p-1">
              <TabsTrigger value="all" className="text-xs md:text-sm flex-1 min-w-[60px]">All</TabsTrigger>
              {Object.entries(categoryInfo).map(([key, info]) => (
                <TabsTrigger key={key} value={key} className="text-xs md:text-sm flex-1 min-w-[60px]">
                  <span className="hidden md:inline">{info.label}</span>
                  <span className="md:hidden">{info.label.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-4 space-y-3">
              {Object.entries(categoryInfo).map(([category, info]) => {
                const CategoryIcon = info.icon;
                const items = getItemsByCategory(category);
                const categoryProgress = getCategoryProgress(category);
                
                return (
                  <Collapsible key={category} open={expandedCategories.has(category)} onOpenChange={() => toggleCategory(category)}>
                    <Card>
                      <CollapsibleTrigger className="w-full">
                        <CardHeader className="p-3 md:p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 md:gap-3">
                              <CategoryIcon className={`h-4 w-4 md:h-5 md:w-5 ${info.color}`} />
                              <CardTitle className="text-sm md:text-base font-semibold">{info.label}</CardTitle>
                            </div>
                            <div className="flex items-center gap-2 md:gap-3">
                              <span className="text-xs md:text-sm text-muted-foreground">{items.filter(i => completedItems.has(i.id)).length}/{items.length}</span>
                              <Progress value={categoryProgress} className="w-16 md:w-24 h-2" />
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="p-3 md:p-4 pt-0 space-y-2">
                          {items.map((item) => (
                            <ComplianceItemRow
                              key={item.id}
                              item={item}
                              status={getItemStatus(item.id)}
                              onToggle={() => toggleItem(item.id)}
                            />
                          ))}
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                );
              })}
            </TabsContent>

            {Object.keys(categoryInfo).map((category) => (
              <TabsContent key={category} value={category} className="mt-4">
                <Card>
                  <CardContent className="p-3 md:p-4 space-y-2">
                    {getItemsByCategory(category).map((item) => (
                      <ComplianceItemRow
                        key={item.id}
                        item={item}
                        status={getItemStatus(item.id)}
                        onToggle={() => toggleItem(item.id)}
                      />
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

interface ComplianceItemRowProps {
  item: ComplianceItem;
  status: 'not-started' | 'in-progress' | 'completed';
  onToggle: () => void;
}

const ComplianceItemRow = ({ item, status, onToggle }: ComplianceItemRowProps) => {
  const priorityColors = {
    critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    high: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
  };

  const resources = getResourcesForItem(item.id);
  const hasResources = resources && resources.resources.length > 0;

  return (
    <div className={`w-full text-left p-3 md:p-4 rounded-lg border transition-all ${
      status === 'completed' 
        ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
        : status === 'in-progress'
        ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800'
        : 'bg-background border-border hover:border-primary/50'
    }`}>
      <div className="flex items-start gap-3">
        <button onClick={onToggle} className="mt-0.5 flex-shrink-0 touch-manipulation">
          {status === 'completed' ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : status === 'in-progress' ? (
            <Clock className="h-5 w-5 text-amber-500" />
          ) : (
            <Circle className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <p className={`font-medium text-sm md:text-base ${status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
              {item.title}
            </p>
            <Badge variant="outline" className={`text-[10px] md:text-xs ${priorityColors[item.priority]}`}>
              {item.priority}
            </Badge>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{item.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <Link to={resources?.pdfPage ? `/pdf-viewer?page=${resources.pdfPage}` : `/bill/${resources?.billSection || 'part1-preliminary'}`}>
              <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted">
                {item.section}
                <ExternalLink className="h-2.5 w-2.5 ml-1" />
              </Badge>
            </Link>
            {hasResources && (
              <Link to={`/compliance/${item.id}`}>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1">
                  <Book className="h-3 w-3" />
                  Resources
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
