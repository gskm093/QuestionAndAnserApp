import { createContext } from 'react';
//imported json data file
import data from '../data/qnsAndAns';
//To use ExamPaper we imported it
import ExamPaper from './ExamPaper';
import '../assets/home.css'

//created a context
const QnsData = createContext();

function Home() {
    return (
        //Provider used to pass the data(Question)
    <QnsData.Provider value={data}>
        <div className='home-container'>
        <ExamPaper></ExamPaper>
        </div>
    </QnsData.Provider>
     );
}

export default Home;
//exported the context 
export {QnsData};