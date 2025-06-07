import Die from "./Die"
import { useState, useRef, useEffect } from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
function App() {

  const [dice, setDice] = useState(() => generateAllNewDice())
  const buttonRef = useRef(null)
  const isGameWon = dice.every(die => die.isHeld) &&
  dice.every(die => die.value === dice[0].value)

  useEffect(() =>{
    if(isGameWon){
      buttonRef.current.focus();
    }
  }, [isGameWon])
  function generateAllNewDice(){
    return new Array(10)
              .fill(0)
              .map(() => ({
                value : Math.floor(Math.random()*6) + 1, 
                isHeld : false,
                id: nanoid()
              }))
  }

  function hold(id){
    setDice(oldDice =>  oldDice.map(die =>
         die.id === id ? 
        {...die, isHeld: !die.isHeld} : die
      ))
  }
  function rollDice(){
    if(!isGameWon){
      setDice(oldDice => oldDice.map(die =>
        die.isHeld ? die :
        {...die, value : Math.floor(Math.random()*6) + 1}
      ))
    }
    else{
      setDice(generateAllNewDice())
    }
  
  }
  const diceelement = dice.map(dieObj => <Die key = {dieObj.id} value={dieObj.value} isHeld = {dieObj.isHeld} hold = {hold} id = {dieObj.id} />)
  return (
    <main>
      {isGameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll untill all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceelement}
      </div>
      <button ref={buttonRef} onClick={rollDice} className="roll-dice">
        {isGameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App
