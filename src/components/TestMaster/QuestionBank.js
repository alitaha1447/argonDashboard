import React, { useState } from "react";
import { CardBody } from "reactstrap";
import { ToastContainer } from "react-toastify";
import QuestionBankHeader from "./QuestionBankHeader";
import QuestionBankBody from "./QuestionBankBody";
// DATA
import { questionType } from "DummyData";

const QuestionBank = () => {
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);

  return (
    <>
      <QuestionBankHeader
        questionType={questionType}
        selectedQuestionType={selectedQuestionType}
        handleQuestionTypeChange={(selected) =>
          setSelectedQuestionType(selected)
        }
      />
      <CardBody>
        <QuestionBankBody selectedQuestionType={selectedQuestionType} />
      </CardBody>
      <ToastContainer />
    </>
  );
};

export default QuestionBank;
