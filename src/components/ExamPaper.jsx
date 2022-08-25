import { useContext, useState } from "react";
import { QnsData } from "../components/Home";
import "../assets/examPaper.css";
import Results from "./Results";
import { createContext } from "react";

//created a context
const ResultData = createContext();

function ExamPaper() {
  //To use question data in this component the Consumer is useContext
  const allQns = useContext(QnsData);
  let questionArr = allQns.data.questions;

  //Set the initial value
  let [initialValue, setInitialValue] = useState({
    index: 0,
    answer: { name: "", value: "" },
    validation: false,
    showValidation: false,
  });
  //to store answer array
  let [ansArr, setAnsArr] = useState([]);
  //to store chebox multiple value
  let [checkboxValue, setCheckBoxValue] = useState([]);
  //to show next page (used as a flag)
  let [nextPage, setNextPage] = useState(false);
  //to store answer as json string
  let [allAnsObj, setAllAnsObj] = useState("");
  //for back button to get the data
  let [prevData, setPrevData] = useState({});
  let length = questionArr.length;
  let options = questionArr[initialValue.index].questionoption;
  const qnNo = "qn" + initialValue.index;

  //to show the next question
  function nextQn(index) {
    if (initialValue.validation === true) {
      let tempVar = checkboxValue.length > 0 ? index + 2 : index + 1;
      let name = "qn" + tempVar;
      if (prevData) {
        ansArr.splice(index, 1);
        ansArr.splice(index, 0, initialValue.answer);
        setAnsArr((arr) => [...arr]);
      } else {
        setAnsArr((arr) => [...arr, initialValue.answer]);
      }

      setInitialValue({
        index: index + 1,
        answer:
          checkboxValue.length > 0
            ? { name, value: checkboxValue }
            : { name: "", value: "" },
        showValidation: false,
      });
    } else {
      setInitialValue({
        index: index,
        answer: { name: "", value: "" },
        validation: false,
        showValidation: true,
      });
    }
  }

  //to go back
  function previousQn(index) {
    const prevAns = ansArr[index - 1];
    setInitialValue({
      index: index - 1,
      answer: { name: prevAns.name, value: prevAns.value },
      validation: true,
      showValidation: false,
    });
    setPrevData((previousState) => {
      return { ...previousState, prevAns };
    });
  }

  //to set the value of radio and textarea
  function setTheValue(e, index) {
    const { currentTarget: input } = e;
    let tempVar = index + 1;
    let name = "qn" + tempVar;
    let newObj = {
      name,
      value: input.value,
    };
    setInitialValue({ index: index, answer: newObj, validation: true });
  }

  //to set the value of date
  function setDate(e, index) {
    let tempVar = index + 1;
    let name = "qn" + tempVar;
    let newObj = {
      name,
      value: e.target.value,
    };
    setInitialValue({ index: index, answer: newObj, validation: true });
  }

  //to set the value of checkbox
  function setCheckBox(e, index) {
    const { currentTarget: input } = e;
    let tempVar = index + 1;
    let name = "qn" + tempVar;
    let findValue = checkboxValue.find((v) => {
      return v === input.value;
    });
    let findIndexVal = checkboxValue.findIndex((v) => {
      return v === input.value;
    });
    if (!findValue) {
      checkboxValue.push(input.value);
      let newObj = {
        name,
        value: checkboxValue,
      };
      setInitialValue({ index: index, answer: newObj, validation: true });
    } else {
      checkboxValue.splice(findIndexVal, 1);
      let newObj = {
        name,
        value: checkboxValue,
      };
      setInitialValue({ index: index, answer: newObj, validation: true });
    }
  }

  //to submit all the questions answer and nextpage
  function submit(index) {
    if (checkboxValue.length > 0) {
      ansArr.push(initialValue.answer);
      setAnsArr((arr) => [...arr]);
      const newObj = JSON.stringify(ansArr);
      setAllAnsObj(newObj);
      setNextPage({ nextPage: true });
    } else if (initialValue.validation === true) {
      ansArr.push(initialValue.answer);
      setAnsArr((arr) => [...arr]);
      const newObj = JSON.stringify(ansArr);
      setAllAnsObj(newObj);
      setNextPage({ nextPage: true });
    } else {
      setInitialValue({
        index: index,
        answer: { name: "", value: "" },
        showValidation: true,
      });
    }
  }

  //to show the prefill checkbox
  function checkCheckedValue(value) {
    let findValue = checkboxValue.find((v) => {
      return v === value;
    });
    if (findValue) return true;
    else return false;
  }

  return (
    <>
      {nextPage === false ? (
        <div className="container">
          <div className="back-next-button-layout" id="back-btn-layout">
            {initialValue.index > 0 ? (
              <button
                className="back-btn"
                onClick={() => previousQn(initialValue.index)}
              >
                <svg
                  id="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M512 256C512 273.7 497.7 288 480 288H160.1l0 72c0 9.547-5.66 18.19-14.42 22c-8.754 3.812-18.95 2.077-25.94-4.407l-112.1-104c-10.24-9.5-10.24-25.69 0-35.19l112.1-104c6.992-6.484 17.18-8.218 25.94-4.406C154.4 133.8 160.1 142.5 160.1 151.1L160.1 224H480C497.7 224 512 238.3 512 256z" />
                </svg>
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="qn-layout">
            <p>{questionArr[initialValue.index].question}</p>
            <div className="options-layout">
              {initialValue.showValidation === true ? (
                <p className="err-msg">Please select below answer</p>
              ) : (
                ""
              )}
              {options.map((op, index) => {
                return (
                  <div key={index}>
                    {questionArr[initialValue.index].questiontype ===
                    "Radio" ? (
                      <div className="qn-option">
                        <span>
                          <input
                            type={questionArr[initialValue.index].questiontype}
                            value={op.optionvalue}
                            name={
                              initialValue.answer.name === undefined
                                ? qnNo
                                : initialValue.answer.name
                            }
                            onChange={(e) => setTheValue(e, initialValue.index)}
                            checked={
                              initialValue.answer.value === undefined
                                ? false
                                : initialValue.answer.value === op.optionvalue
                                ? true
                                : false
                            }
                          />
                          {op.optionvalue}
                        </span>
                        <br></br>
                      </div>
                    ) : questionArr[initialValue.index].questiontype ===
                      "Checkbox" ? (
                      <div className="qn-option">
                        <span>
                          <input
                            type={questionArr[initialValue.index].questiontype}
                            value={op.optionvalue}
                            name={
                              initialValue.answer.name === undefined
                                ? qnNo
                                : initialValue.answer.name
                            }
                            onChange={(e) => setCheckBox(e, initialValue.index)}
                            checked={checkCheckedValue(op.optionvalue)}
                          />
                          {op.optionvalue}
                        </span>
                        <br></br>
                      </div>
                    ) : questionArr[initialValue.index].questiontype ===
                        "Date" || "Textarea" ? (
                      <div className="qn-option">
                        <span>
                          <input
                            type={questionArr[initialValue.index].questiontype}
                            value={initialValue.answer.value}
                            name={
                              initialValue.answer.name === undefined
                                ? qnNo
                                : initialValue.answer.name
                            }
                            onChange={(e) => setDate(e, initialValue.index)}
                          />
                          {op.optionvalue}
                        </span>
                        <br></br>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="back-next-button-layout" id="nxt-btn">
            {initialValue.index === length - 1 ? (
              <button
                className="btn-submit"
                onClick={() => submit(initialValue.index)}
              >
                Submit
              </button>
            ) : (
              <button
                className="btn-next"
                onClick={() => nextQn(initialValue.index)}
                disabled={initialValue.showValidation}
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        //Provider used to pass the data(AnsOBJ)
        <ResultData.Provider value={allAnsObj}>
          <Results />
        </ResultData.Provider>
      )}
    </>
  );
}

export default ExamPaper;
//exported the context
export { ResultData };
