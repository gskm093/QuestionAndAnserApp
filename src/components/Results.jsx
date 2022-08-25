import { useContext } from "react";
import { ResultData } from "../components/ExamPaper";
import "../assets/result.css";
function Results() {
  //to get the all the ans
  const allAns = useContext(ResultData);
  //converted to array
  let ansData = JSON.parse(allAns);
  return (
    <div className="ans-layout">
      <h1>All The Selected Items</h1>
      <ul>
        {ansData.map((ans,index) => {
          return (
            <li key={index}>
              <span className="qn">{ans.name}</span>-
              <span className="ans">{ans.value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Results;
