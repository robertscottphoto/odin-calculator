//VARIABLES
const powerBtn = document.getElementById("power")
const powerSvg = document.getElementById("SVGRepo_iconCarrier").firstElementChild
const bgDisplay = document.getElementById("display-background")
const tempDisplay = document.getElementById("temp-display")
const mainDisplay = document.getElementById("main-display")
const titleBar = document.getElementById("title")
const calculator = document.querySelector(".calculator")
let runningState = false
const state = {
    isPowerOn: false,
    currentOperand: '0',
    operator: null,
    nextOperand: '',
};
//FUNCTIONS
function lightUp(){
    
    powerBtn.classList.toggle('pwr-on');
    powerSvg.classList.toggle('pwr-btn-on')
    bgDisplay.classList.toggle('display-output-on')
    bgDisplay.classList.toggle('display-output-off')
    tempDisplay.classList.toggle('display-output-on')
    titleBar.classList.toggle('title-on')  
}
function setMainDisplay(){
    
    if(powerBtn.classList.contains('pwr-on')){
      mainDisplay.textContent = state.currentOperand
      tempDisplay.textContent = "enter sum"
      state.isPowerOn = true
      return state.isPowerOn
    }
    else{
      mainDisplay.textContent = ""
      tempDisplay.textContent = ""
      state.isPowerOn = false
      clear()
      collection = []
      return runningState
    }
}

function clear(){
    tempDisplay.textContent = ""
    state.currentOperand = '0'
}

function logState(){
    console.log(`isPowerOn: ${state.isPowerOn}
currentOperand: ${state.currentOperand}
operator: ${state.operator}
nextOperand: ${state.nextOperand}`)
}

//EVENT LISTENERS
powerBtn.addEventListener('click', function () { 
    clear()
    lightUp()
    setMainDisplay() // returns True/False depending on calculator power On/Off
});

//We're experiencing troubleshooting with this. Trying to obtain the content of any button within the calculator and it's not working
calculator.addEventListener('click', (event) => {
    
    //If calculator isn't powered on, don't allow any input to be captured
    if(!state.isPowerOn) return
    //ignore trailing zeroes when the current value is zero
    if(state.currentOperand === '0' && event.target.dataset.value === "0") return;

    if (event.target.matches('button')) {
    //const inputChoice = event.target.textContent
    const inputChoice = event.target.dataset.value

    //remove initially displayed zero when capturing operand input
    if(state.currentOperand == '0'){
        state.currentOperand = event.target.dataset.value
    }
    else{
        state.currentOperand += event.target.dataset.value
    }


    
    console.log(`Input Choice:${inputChoice}`)
    console.log(`Current Operand Update: ${state.currentOperand}`)
    logState()
    }

});






