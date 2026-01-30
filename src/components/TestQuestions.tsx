import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Trophy, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Can an individual (natural person) operate as a VASP in Kenya?',
    options: ['Yes, with a license', 'Yes, without restrictions', 'No, only companies can', 'Only if registered as sole proprietor'],
    correctAnswer: 2,
    explanation: 'Section 9(2) explicitly states that natural persons shall NOT carry on the business of virtual asset services in Kenya. Only companies incorporated under the Companies Act are eligible.',
    section: 'Section 9(2)'
  },
  {
    id: 2,
    question: 'How long is a VASP license valid?',
    options: ['1 year from issue date', 'Until December 31st of issue year', '5 years', 'Indefinitely until revoked'],
    correctAnswer: 1,
    explanation: 'Section 14 states that licenses expire on December 31st of the year they are issued, requiring annual renewal.',
    section: 'Section 14'
  },
  {
    id: 3,
    question: 'How long must VASPs retain transaction records?',
    options: ['3 years', '5 years', '7 years', '10 years'],
    correctAnswer: 2,
    explanation: 'Section 44(2) requires VASPs to maintain transaction records for a minimum of 7 years from the transaction date.',
    section: 'Section 44(2)'
  },
  {
    id: 4,
    question: 'Which authority regulates Virtual Asset Payment Processors?',
    options: ['Capital Markets Authority only', 'Central Bank of Kenya only', 'Both CMA and CBK', 'National Treasury'],
    correctAnswer: 1,
    explanation: 'Payment gateway/processing activities fall exclusively under Central Bank of Kenya regulation as per the Schedule.',
    section: 'Schedule'
  },
  {
    id: 5,
    question: 'What is the transitional period for existing VASPs to apply for a license?',
    options: ['3 months', '6 months', '12 months', '24 months'],
    correctAnswer: 1,
    explanation: 'Section 47(1) provides existing VASPs 6 months from Act commencement to apply for a license.',
    section: 'Section 47(1)'
  },
  {
    id: 6,
    question: 'Are utility tokens (virtual service tokens) regulated under this Bill?',
    options: ['Yes, fully regulated', 'Yes, partially regulated', 'No, they are exempt', 'Only if tradeable'],
    correctAnswer: 2,
    explanation: 'Section 3(2) exempts virtual service tokens that are non-transferable and only provide access to a specific service.',
    section: 'Section 3(2)'
  },
  {
    id: 7,
    question: 'What is the maximum fine for operating without a license (companies)?',
    options: ['KES 5 million', 'KES 10 million', 'KES 20 million', 'KES 30 million'],
    correctAnswer: 2,
    explanation: 'Section 41(1)(b) prescribes up to KES 20 million fine for companies operating without a license.',
    section: 'Section 41(1)(b)'
  },
  {
    id: 8,
    question: 'How many directors must a VASP company have at minimum?',
    options: ['1 director', '2 directors', '3 directors', '5 directors'],
    correctAnswer: 1,
    explanation: 'Section 21 requires VASPs to be managed by a board of at least 2 directors, who must be natural persons.',
    section: 'Section 21'
  },
  {
    id: 9,
    question: 'Are NFTs used solely for art/collectibles regulated under this Bill?',
    options: ['Yes, all NFTs are regulated', 'No, they are exempt', 'Only if valued over KES 1 million', 'Depends on the regulator'],
    correctAnswer: 1,
    explanation: 'Section 5(2)(d) exempts NFTs not used for payment, investment, or financial purposes.',
    section: 'Section 5(2)(d)'
  },
  {
    id: 10,
    question: 'What must a VASP do if it becomes aware of potential insolvency?',
    options: ['Continue operations normally', 'Notify the regulator in writing', 'Immediately cease operations', 'Notify clients only'],
    correctAnswer: 1,
    explanation: 'Section 26 requires the CEO to notify the regulatory authority in writing of insolvency or potential insolvency.',
    section: 'Section 26'
  },
];

export const TestQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <section id="test-questions" className="py-12 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10">
                  <Trophy className="h-10 w-10 md:h-12 md:w-12 text-primary" />
                </div>
                <CardTitle className="font-display text-2xl md:text-3xl">Quiz Complete!</CardTitle>
                <CardDescription className="text-base md:text-lg">
                  You scored {score} out of {questions.length}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-4xl md:text-5xl font-bold text-primary">{percentage}%</div>
                <Progress value={percentage} className="h-3" />
                <p className="text-muted-foreground text-sm md:text-base">
                  {percentage >= 80 ? 'Excellent! You have a strong understanding of the VASP Bill.' :
                   percentage >= 60 ? 'Good job! Review the sections you missed for better understanding.' :
                   'Keep studying! Review the bill sections and try again.'}
                </p>
                <Button onClick={resetQuiz} className="gap-2 w-full sm:w-auto">
                  <RotateCcw className="h-4 w-4" />
                  Take Quiz Again
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="test-questions" className="py-12 md:py-20 bg-muted/30">
      <div className="container px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center mb-8 md:mb-12">
          <Badge className="mb-4 bg-accent/10 text-accent-foreground hover:bg-accent/20">
            <BookOpen className="h-3 w-3 mr-1" />
            Test Your Knowledge
          </Badge>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            VASP Bill Quiz
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Test your understanding of the Virtual Asset Service Providers Bill.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-xs md:text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>Score: {score}/{answeredQuestions.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="border-2">
            <CardHeader>
              <Badge variant="outline" className="w-fit mb-2 text-xs">
                {question.section}
              </Badge>
              <CardTitle className="text-lg md:text-xl font-display leading-relaxed">
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full text-left p-3 md:p-4 rounded-lg border-2 transition-all text-sm md:text-base ${
                    showResult
                      ? index === question.correctAnswer
                        ? 'border-primary bg-primary/10'
                        : index === selectedAnswer
                        ? 'border-destructive bg-destructive/10'
                        : 'border-border opacity-50'
                      : selectedAnswer === index
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {showResult ? (
                      index === question.correctAnswer ? (
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      ) : index === selectedAnswer ? (
                        <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                      )
                    ) : (
                      <div className={`h-5 w-5 rounded-full border-2 flex-shrink-0 ${
                        selectedAnswer === index ? 'border-primary bg-primary' : 'border-muted-foreground/50'
                      }`} />
                    )}
                    <span>{option}</span>
                  </div>
                </button>
              ))}

              {/* Explanation */}
              {showResult && (
                <div className={`p-3 md:p-4 rounded-lg mt-4 text-sm ${
                  selectedAnswer === question.correctAnswer
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-destructive/10 border border-destructive/20'
                }`}>
                  <p className="font-medium mb-1">
                    {selectedAnswer === question.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                  <p className="text-muted-foreground">{question.explanation}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                {!showResult ? (
                  <Button 
                    onClick={checkAnswer} 
                    disabled={selectedAnswer === null}
                    className="flex-1"
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button onClick={nextQuestion} className="flex-1">
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
