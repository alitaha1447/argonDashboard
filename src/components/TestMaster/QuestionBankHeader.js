import React from "react";
import { CardHeader } from "reactstrap";
import Select from "react-select";

const QuestionBankHeader = ({
  questionType,
  selectedQuestionType,
  handleQuestionTypeChange,
}) => {
  return (
    <CardHeader className="bg-white">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center w-100 pb-2 gap-2">
        <h1 className="mb-2 mb-md-0">Question Bank</h1>
        <div style={{ width: "200px" }}>
          <Select
            placeholder="Question Type..."
            options={questionType}
            value={selectedQuestionType}
            onChange={handleQuestionTypeChange}
            isClearable
          />
        </div>
      </div>
    </CardHeader>
  );
};

export default QuestionBankHeader;
