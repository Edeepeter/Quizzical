import React from 'react'
import { useState, useEffect} from 'react'
import Axios from "axios"
import "../Styles/Home.css"
import Questions from './Questions'
import Pink from "../Image/pinkblob.png"
import Blue from "../Image/blueblob.png"

function Home() {
    const [quiz, setQuiz] = useState(true)
    const [quizQuestions,setQuizQuestions] = useState([])
    function handleClick(){
      setQuiz(prevQuiz => !prevQuiz)
  
      }
//       function getApi (){
//   fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
//    .then((res) => res.json())
//    .then((data)=>{
//     setQuizQuestions(data)
//      console.log(data)
//    })
// }

  return (
    <div className='hero'>
      { quiz &&(
          <>
          <img className='top' src={Pink} alt='top' />
          <img className='bottom' src={Blue} alt='top' />
          <h1 className='hero-text'>Quizzical</h1>
          <p className='hero-subtext'>The ultimate trivia game!</p>
         <button onClick={handleClick} >Start quiz</button>
          </>
      ) || <Questions/>}
        
      {/* {quizQuestions && <Questions/>} */}
      {/* {quizQuestions && <h1>hello world</h1>} */}
    </div>
    
  )
}


export default Home