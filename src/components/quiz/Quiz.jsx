import questionList from "../../assets/data/questions.json";
import { useState } from "react";
import Question from "./Question";
import Button from "../Button";

const questions = questionList.questions;
export default function Quiz() {
  const [num, setNum] = useState(1);
  const [userPoints, setUserPoints] = useState(0);

  return (
    <div className="quiz">
      <div className="progress-bar">
        <progress value={num} max={15}>
          {" "}
        </progress>
        <p>
          <span>
            Question <strong>{num}</strong> / {questions.length}
          </span>
          <span>
            <strong>{userPoints}</strong> / {questions.reduce((acc, qObj) => acc + qObj.points, 0)} points
          </span>
        </p>
      </div>
      <Question questionObj={questions[3]} />
      <div className="timer-next-container">
        <p>
            17:30
        </p>
        <Button>
            Next
        </Button>
      </div>
    </div>
  );
}
