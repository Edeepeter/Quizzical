import React, { useEffect, useState } from 'react'
import "../Styles/Questions.css"
import Pink from "../Image/pinkblob.png"
import Blue from "../Image/blueblob.png"
import axios from 'axios'

function Questions() {

// make answers
function make(answers,correctAnswers){
  let arrayOfAnswers = [...answers,correctAnswers]
  function random(arrAns){
let arrayAns = arrAns
    let newArr = []
    while(arrayAns.length>=1){
   
      let randomIndex = (Math.floor(Math.random()*arrAns.length)+1)
    if(arrayAns.length==1){
      newArr.push(arrayAns[0])
    arrayAns=[]

    }
   if(arrayAns.length>1) {
     newArr.push(arrayAns[randomIndex])
let answer = arrayAns[randomIndex]
arrayAns = arrayAns.filter((a)=>a!==answer)
    }
  
  }
  return newArr.filter((an)=>an!==undefined)
  }
  return random(arrayOfAnswers)

}


  const [questionsState,setQuestionsState] = useState([])
  const [color,setColor] = useState("") 
  // calling databse 
  async function quizQuestions (){
     let res = await axios
     .get("https://opentdb.com/api.php?amount=5&difficulty=easy")
     const {results} = res.data
   const questions =  results.filter((qs)=>{
    console.log(qs.incorrect_answers)
    return qs.incorrect_answers.length===3}).map((result)=>{
      const  {question,incorrect_answers,correct_answer} = result
      console.log(make(incorrect_answers,correct_answer))
      return({question,answers:make(incorrect_answers,correct_answer),correct_answer})
     })
     setQuestionsState(questions)
     console.log(questions)
   
   }
 useEffect (()=>{
 quizQuestions()
 }, [])
 const handleClickAnswer=(choice,question)=>{
  choice===question.correct_answer?setColor("green"):setColor("red")
console.log(color) 
}
  return (
    <div className='main'>
      <div className='questions'>

          <img className='top' src={Pink} alt='top' />
          <img className='bottom' src={Blue} alt='top' />
        
        {(questionsState && questionsState.map((q)=>{   
        
        return (<div key={q.correct_answer}><h1 className='question'> {q.question}</h1>
        <div className='button-container'>
            
            <button className='btn' onClick={()=>handleClickAnswer(q.answers[0],q)}>{q.answers[0]}</button>
            <button className='btn' onClick={()=>handleClickAnswer(q.answers[1],q)}>{q.answers[1]}</button>
            <button className='btn' onClick={()=>handleClickAnswer(q.answers[2],q)}>{q.answers[2]}</button>
            <button className='btn' onClick={()=>handleClickAnswer(q.answers[3],q)}>{q.answers[3]}</button>
        </div>
            <hr className='line'/>
        </div>)})
        
        )}
      <button className='submit'>Check answers</button>
       </div>
    </div>
  )
}

export default Questions
