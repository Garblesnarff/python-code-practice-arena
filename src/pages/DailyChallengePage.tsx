
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { CalendarDays, Clock, Award } from 'lucide-react';
import { usePyodide } from '@/hooks/usePyodide';
import { formatDistanceToNow } from 'date-fns';
import { Problem } from '@/data/problems/types';
import { getProblemById } from '@/services/dailyChallengeService';

const DailyChallengePage = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [code, setCode] = useState<string>("");
  const [testResults, setTestResults] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const { isPyodideLoading } = usePyodide();
  const { toast } = useToast();

  useEffect(() => {
    const loadProblem = async () => {
      if (problemId) {
        try {
          const fetchedProblem = await getProblemById(problemId);
          setProblem(fetchedProblem);
          if (fetchedProblem?.starter_code) {
            setCode(fetchedProblem.starter_code);
          }
        } catch (error) {
          console.error("Failed to load daily challenge:", error);
          toast({
            title: "Error",
            description: "Failed to load the challenge. Please try again later.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    loadProblem();
  }, [problemId, toast]);

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const handleRunTests = async () => {
    if (!problem) return;
    
    setIsExecuting(true);
    // Placeholder for test execution logic
    setTimeout(() => {
      setTestResults({ success: true, message: "All tests passed!" });
      setIsExecuting(false);
    }, 1000);
  };

  const handleClearCode = () => {
    if (problem?.starter_code) {
      setCode(problem.starter_code);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-10">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!problem) {
    return (
      <Layout>
        <div className="container py-10">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Challenge Not Found</h2>
                <p className="text-muted-foreground mt-2">
                  The challenge you're looking for doesn't exist or might have been removed.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{problem.title}</CardTitle>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center text-muted-foreground">
                    <CalendarDays className="w-4 h-4 mr-1" />
                    <span className="text-sm">Daily Challenge</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">
                      {formatDistanceToNow(new Date(), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Award className="w-4 h-4 mr-1" />
                    <span className="text-sm">+50 XP on completion</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Problem Description</h3>
                <p>{problem.description}</p>
                
                {problem.examples && problem.examples.length > 0 && (
                  <>
                    <h3>Examples</h3>
                    <div className="space-y-4">
                      {problem.examples.map((example, index) => (
                        <div key={index} className="bg-muted p-4 rounded-md">
                          <p><strong>Input:</strong> {example.input}</p>
                          <p><strong>Output:</strong> {example.output}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                
                <h3>Your Solution</h3>
              </div>
              
              {/* Placeholder for code editor component */}
              <div className="border rounded-md h-96 bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Code Editor Placeholder</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleClearCode}>
              Reset Code
            </Button>
            <Button onClick={handleRunTests} disabled={isExecuting || isPyodideLoading}>
              {isExecuting ? "Running Tests..." : "Run Tests"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default DailyChallengePage;
