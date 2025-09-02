import Button from "../Button";

export default function Question({ questionObj }) {
  return (
    <div className="question-answer-container">
      <h2> {questionObj.question} </h2>
      <div className="answers">
        {questionObj.options.map((answer, index) => (
            <Button key={index} className='answer'>
                {answer}
            </Button>
        ))}
      </div>
    </div>
  );
}
