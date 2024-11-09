import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

import questions from "./assets/questions.json"

function App() {
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState(null)
  const [showSolution, setShowSolution] = useState(false)

  const [attempts, setAttempts] = useState(0); // Track the number of attempts on a question

  const [scores, setScores] = useState({ nterm: 0.5, prob: 0.5, prop: 0.5, pythag: 0.5, unkdenom: 0.5 });

  // Function to select the next question based on lowest scoring topic
  const getNextQuestion = () => {
    const lowestTopic = Object.keys(scores).reduce((a, b) => scores[a] <= scores[b] ? a : b);
    const topicQuestions = questions.questions.filter(q => q.topic === lowestTopic);
    const nextQuestion = topicQuestions[Math.floor(Math.random() * topicQuestions.length)];
    return nextQuestion;
  };

  // Question data
  const [currentQuestion, setCurrentQuestion] = useState(questions.questions[0])

  // Handle answer submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isAnswerCorrect = userAnswer.trim() === currentQuestion.correctAnswer;
    setIsCorrect(isAnswerCorrect);

    // Scoring adjustment based on correctness, attempts, and difficulty
    const difficulty = currentQuestion.difficulty;
    const topic = currentQuestion.topic;

    if (isAnswerCorrect) {
      // If correct on the first try, increase score by difficulty
      if (attempts === 0) {
        setScores(prevScores => ({
          ...prevScores,
          [topic]: Math.min(prevScores[topic] + difficulty * 0.1, 1) // Cap score at 1
        }));
      }
      setShowSolution(false);
      setAttempts(0);  // Reset attempts

      const nextQuestion = getNextQuestion();
      setCurrentQuestion(nextQuestion);
      setIsCorrect(null)
    } else {
      // If incorrect, decrease score by difficulty
      setScores(prevScores => ({
        ...prevScores,
        [topic]: Math.max(prevScores[topic] - difficulty * 0.05, 0) // Floor score at 0
      }));
      setShowSolution(true);
      setAttempts(attempts + 1); // Increment attempts for this question
    }

    setUserAnswer('');  // Reset answer input
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl pt-6">
        <CardContent className="space-y-6">
          {/* Question Image */}
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <img 
              src={`src/assets/${currentQuestion.image}`} 
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
                  ? <>
                  'Great job! Ready for the next question?'
                  <Button className='ml-4' onClick={handleSubmit}>Go</Button>
                  </>
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
      <div className="scoreboard">
        <h2>Scores</h2>
        <ul>
          {Object.keys(scores).map((topic) => (
            <li key={topic}>
              {topic}: {scores[topic]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App
