const problemElement =  document.querySelector(".problem")
const ourForm = document.querySelector(".our-form")
const input = document.querySelector(".field-set")
const score = document.querySelector(".score")
const mistakes = document.querySelector(".mistakes")
const display = document.querySelector(".display")
const progress = document.querySelector(".progress-inner")
const endMessage = document.querySelector(".end-message")
const startOver = document.querySelector(".start-over")

let state  = {
    score:0,
    wrongAnswers:0
}

function updateProblem(){
    state.currentProblem = generateProblem()
    problemElement.textContent = `${state.currentProblem.firstNumber}${state.currentProblem.operator}${state.currentProblem.secondNumber}`
    input.value = ""
    input.focus()
    mistakes.textContent = 2-state.wrongAnswers
    score.textContent = 10 - state.score
    display.textContent = ""
}

updateProblem()

function generateNumber(max){
    return Math.floor(Math.random()*(max+1))
};

function generateProblem(){
    return {
        firstNumber : generateNumber(10),
        secondNumber : generateNumber(10),
       operator : ["+","-","x"][generateNumber(2)]
    }
};

ourForm.addEventListener("submit",handleSubmit)

function handleSubmit(e){
    e.preventDefault();
    let  correctAnswer = 0;
    let p = state.currentProblem
    if(p.operator === "+") correctAnswer = p.firstNumber + p.secondNumber
    if(p.operator === "-") correctAnswer = p.firstNumber - p.secondNumber
    if(p.operator === "x") correctAnswer = p.firstNumber * p.secondNumber

    if(parseInt(input.value,10)===correctAnswer){
    display.textContent = `${correctAnswer} Is Correct`
    display.style.transform = "scale(1.4)"
    state.score += 1;
    score.textContent = 10-state.score
    setTimeout(function(){
        if(state.score<10)updateProblem()
    display.style.transform = "scale(0)"
    progress.style.transform = `scaleX(${state.score/10})`
    },1000)
}

else{
    problemElement.classList.add("wrong-answer")
    state.wrongAnswers += 1
    mistakes.textContent =  2 - state.wrongAnswers
    display.style.transform="scale(1.4)"
    display.textContent = `The Right Answer is ${correctAnswer}`
    setTimeout(function (){
       if(state.wrongAnswers<3) updateProblem()
      display.style.transform = "scale(0)"
      problemElement.classList.remove("wrong-answer")
    },2000)
}
setTimeout(checkLogic,2001)
}

function checkLogic(){
    if(state.score === 10){
        endMessage.textContent = `Congrats You Won!!!`
        document.body.classList.add("over-lay-is-open")
        setTimeout(()=>startOver.focus(),331)

    }
    if(state.wrongAnswers === 3){
        endMessage.textContent = `Sorry,You Lost`
        document.body.classList.add("over-lay-is-open")
        setTimeout(()=> startOver.focus(),331)
    }
}

startOver.addEventListener("click",reSetGame)

function reSetGame(){
  state.score = 0
  state.wrongAnswers = 0
  mistakes.textContent = 2
  score.textContent = 10 
  progress.style.transform = `scaleX(${0})` 
  updateProblem()
  document.body.classList.remove("over-lay-is-open")
}
