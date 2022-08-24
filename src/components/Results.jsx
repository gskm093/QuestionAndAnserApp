import {ResultData} from '../components/ExamPaper';
function Results() {
    const allAns = useContext(ResultData);
    console.log(allAns);
    return ( <>
    <ul>
      {allAns.map((ans)=>{
        return <li>{ans.name}-{ans.value}</li>
      })}
    </ul>
    </> );
}

export default Results;