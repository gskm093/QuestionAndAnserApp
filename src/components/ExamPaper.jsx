import { useContext, useState } from "react";
import { QnsData } from "../components/Home";
import "../assets/examPaper.css";
import Results from "./Results";
import { createContext } from 'react';

function ExamPaper() {
  //To use question data in this component the Consumer is useContext
  const allQns = useContext(QnsData);
  let questionArr = allQns.data.questions;
    //created a context
    const ResultData = createContext();
  let [initialValue, setInitialValue] = useState({
    index: 0,
    answer: { name: "", value: "" },
    storgeOfAns: {},
  });
  let [ansArr, setAnsArr] = useState([]);
  let [checkboxValue, setCheckBoxValue] = useState([]);
  let [nextPage,setNextPage] = useState(false);
  let[newObj,setNewObj] = useState({});
  let length = questionArr.length;
  let options = questionArr[initialValue.index].questionoption;
  const qnNo = "qn" + initialValue.index;

  function nextQn(index) {
    setAnsArr((arr) => [...arr, initialValue.answer]);
    setInitialValue({ index: index + 1, answer: { name: "", value: "" } });
  }
  function previousQn(index) {
    setInitialValue({ index: index - 1 });
  }

  function setTheValue(e, index) {
    const { currentTarget: input } = e;
    let name = "qn" + index;
    let newObj = {
      name,
      value: input.value,
    };
    setInitialValue({ index: index, answer: newObj });
  }

  function setDate(e, index, type) {
    let name = "qn" + index;
    let newObj = {
      name,
      value: e.target.value,
    };
    setInitialValue({ index: index, answer: newObj });
  }

  function setCheckBox(e, index) {
    const { currentTarget: input } = e;
    let name = "qn" + index;
    setCheckBoxValue((arr) => [...arr, input.value]);
    let newObj = {
      name,
      value: checkboxValue,
    };
    setInitialValue({ index: index, answer: newObj });
  }

  function submit() {
    setAnsArr((arr) => [...arr, initialValue.answer]);
    const newObj = JSON.stringify(ansArr);
    setNewObj({ansStore:newObj})
    console.log("Json", newObj);
    setNextPage({ nextPage: true });
  }

  return (
    <>
      {nextPage === false ? (
        <div className="container">
          {console.log("Ans Storage", ansArr)}
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
              {options.map((op) => {
                return (
                  <>
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
                            onChange={(e) =>
                              setDate(
                                e,
                                initialValue.index,
                                questionArr[initialValue.index].questiontype
                              )
                            }
                          />
                          {op.optionvalue}
                        </span>
                        <br></br>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </div>
          </div>
          <div className="back-next-button-layout" id="nxt-btn">
            {initialValue.index === length - 1 ? (
              <button className="btn-submit" onClick={() => submit()}>
                Submit
              </button>
            ) : (
              <button
                className="btn-next"
                onClick={() => nextQn(initialValue.index)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (

        <ResultData.Provider value={newObj}>
            <Results />
        </ResultData.Provider>
      )}
    </>
  );
}

export default ExamPaper;
export {ResultData};