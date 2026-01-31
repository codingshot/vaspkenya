import { useState, useEffect } from 'react';
import { 
  User, Settings, Download, Trash2, Save, 
  Building2, CheckCircle2, AlertTriangle, X, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { companyTypesData } from '@/data/companyTypesData';

const PROFILE_KEY = 'vasp-user-profile';
const COMPLIANCE_KEY = 'vasp-compliance-tracker';
const QUESTIONNAIRE_KEY = 'vasp-questionnaire-answers';
const SETTINGS_KEY = 'vasp-user-settings';

interface UserProfileData {
  selectedCompanyType?: string;
  questionnaireAnswers?: Record<string, string | string[]>;
  questionnaireCompleted?: boolean;
  advancedModeEnabled?: boolean;
  lastVisit?: string;
  createdAt?: string;
}

interface ComplianceData {
  completed: string[];
  inProgress: string[];
  timestamp: string;
}

export const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [compliance, setCompliance] = useState<ComplianceData | null>(null);

  useEffect(() => {
    // Load profile data
    const profileData = localStorage.getItem(PROFILE_KEY);
    const complianceData = localStorage.getItem(COMPLIANCE_KEY);
    const questionnaireData = localStorage.getItem(QUESTIONNAIRE_KEY);

    if (profileData) {
      setProfile(JSON.parse(profileData));
    }
    if (complianceData) {
      setCompliance(JSON.parse(complianceData));
    }
    if (questionnaireData) {
      const answers = JSON.parse(questionnaireData);
      setProfile(prev => ({
        ...prev,
        questionnaireAnswers: answers,
        questionnaireCompleted: Object.keys(answers).length > 0
      }));
    }
  }, [isOpen]);

  const hasData = profile || compliance;

  const getCompanyType = () => {
    if (!profile?.selectedCompanyType) return null;
    return companyTypesData.find(c => c.id === profile.selectedCompanyType);
  };

  const exportAllData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      profile: profile || {},
      compliance: compliance || {},
      settings: JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}')
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vasp-kenya-profile-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetAllData = () => {
    if (confirm('Are you sure you want to reset all saved data? This cannot be undone.')) {
      localStorage.removeItem(PROFILE_KEY);
      localStorage.removeItem(COMPLIANCE_KEY);
      localStorage.removeItem(QUESTIONNAIRE_KEY);
      localStorage.removeItem(SETTINGS_KEY);
      localStorage.removeItem('vasp-pdf-revisions');
      setProfile(null);
      setCompliance(null);
    }
  };

  const companyType = getCompanyType();
  const totalComplianceItems = 21;
  const completedCount = compliance?.completed?.length || 0;
  const inProgressCount = compliance?.inProgress?.length || 0;
  const progressPercent = (completedCount / totalComplianceItems) * 100;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          aria-label="User Profile"
        >
          <User className="h-5 w-5" />
          {hasData && (
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Your Profile
          </SheetTitle>
          <SheetDescription>
            Your saved progress and settings
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)] mt-4">
          <div className="space-y-4 pr-4">
            {/* Quick Stats */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{completedCount}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-amber-500">{inProgressCount}</p>
                    <p className="text-xs text-muted-foreground">In Progress</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{Math.round(progressPercent)}%</p>
                    <p className="text-xs text-muted-foreground">Overall</p>
                  </div>
                </div>
                <Progress value={progressPercent} className="mt-3 h-2" />
              </CardContent>
            </Card>

            {/* Company Type */}
            {companyType && (
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Selected Company Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="font-medium">{companyType.name}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={companyType.isRegulated ? 'destructive' : 'secondary'}>
                      {companyType.isRegulated ? 'Regulated' : 'Exempt'}
                    </Badge>
                    {companyType.regulatoryAuthority.map(auth => (
                      <Badge key={auth} variant="outline" className="text-[10px]">
                        {auth.includes('Central') ? 'CBK' : 'CMA'}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Questionnaire Status */}
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Assessment Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {profile?.questionnaireCompleted ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm">Assessment Completed</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">Assessment not completed</span>
                  </div>
                )}
                {profile?.advancedModeEnabled && (
                  <Badge variant="secondary" className="mt-2">
                    Advanced Mode Enabled
                  </Badge>
                )}
              </CardContent>
            </Card>

            {/* Last Activity */}
            {compliance?.timestamp && (
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">Last saved</p>
                  <p className="text-sm font-medium">
                    {new Date(compliance.timestamp).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="space-y-2 pt-4 border-t">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={exportAllData}
              >
                <Download className="h-4 w-4" />
                Export All Data
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                onClick={resetAllData}
              >
                <Trash2 className="h-4 w-4" />
                Reset All Data
              </Button>
            </div>

            {!hasData && (
              <div className="text-center py-8 text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No saved data yet</p>
                <p className="text-xs">Complete the questionnaire or use the compliance tracker to save your progress</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
