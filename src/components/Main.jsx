import { useState } from "react";
import Button from "./Button";
import Quiz from "./quiz/Quiz";

export default function Main() {
  const [hasStarted, setHasStarted] = useState(true);
  function handleQuizStart() {
    setHasStarted(true);
  }
  return (
    <main>
      {!hasStarted ? (
        <div className="intro">
          <h2>Welcome to the React Quiz</h2>
          <p>15 questions to test your React mastery</p>
          <Button onClick={handleQuizStart}>Let's start!</Button>
        </div>
      ) : (
        <Quiz />
      )}
    </main>
  );
}
