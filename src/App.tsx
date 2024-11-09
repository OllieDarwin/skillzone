import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

function App() {
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  // Sample question data - this would come from your database
  const currentQuestion = {
    id: 1,
    imageUrl: '/api/placeholder/600/400',
    correctAnswer: '42',
    topic: 'algebra',
    solution: 'The solution involves factoring the quadratic equation...',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAnswerCorrect = userAnswer.trim() === currentQuestion.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    if (!isAnswerCorrect) {
      setShowSolution(true);
    }
    // Here you would also update the user's profile with their performance
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader></CardHeader>
        <CardContent className="space-y-6">
          {/* Question Image */}
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <img 
              src={currentQuestion.imageUrl} 
              alt="Math Question"
              className="w-full object-contain h-96"
            />
          </div>

          {/* Answer Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="answer" className="block text-sm font-medium">
                Your Answer:
              </label>
              <Input
                id="answer"
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer here"
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Answer
            </Button>
          </form>

          {/* Feedback Section */}
          {isCorrect !== null && (
            <Alert className={isCorrect ? 'bg-green-50' : 'bg-red-50'}>
              <AlertTitle>
                {isCorrect ? 'Correct! 🎉' : 'Not quite right'}
              </AlertTitle>
              <AlertDescription>
                {isCorrect 
                  ? 'Great job! Ready for the next question?'
                  : 'Keep practicing! Check out the solution below:'}
              </AlertDescription>
            </Alert>
          )}

          {/* Solution Section */}
          {showSolution && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium mb-2">Solution:</h3>
              <p>{currentQuestion.solution}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default App
