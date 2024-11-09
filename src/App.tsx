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

  // Question data
  const [currentQuestion, setCurrentQuestion] = useState(questions.questions[0])

  const handleSubmit = (e) => {
    e.preventDefault();
    const isAnswerCorrect = userAnswer.trim() === currentQuestion.correctAnswer
    setIsCorrect(isAnswerCorrect)
    if (!isAnswerCorrect) {
      setShowSolution(true)
    }
    // Here you would also update the user's profile with their performance
  };

  const handleQuestionIncrement = () => {
    setIsCorrect(null)
    setShowSolution(false)
    setUserAnswer("")
    setCurrentQuestion(!(questions.questions[currentQuestion.index + 1]) ? questions.questions[0] : questions.questions[currentQuestion.index + 1])
  }

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
          {isCorrect !== true ?
          <>
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
          </>
          :
          <></>
          }

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
                  <Button className='ml-4' onClick={handleQuestionIncrement}>Go</Button>
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
    </div>
  );
}

export default App
