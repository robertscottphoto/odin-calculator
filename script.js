// VARIABLES
const powerBtn = document.getElementById("power")
const powerSvg = document.getElementById("SVGRepo_iconCarrier").firstElementChild
const bgDisplay = document.getElementById("display-background")
const tempDisplay = document.getElementById("temp-display")
const mainDisplay = document.getElementById("main-display")
const titleBar = document.getElementById("title")
const calculator = document.querySelector(".calculator")
const keyMap = {
  '0': { type: 'number', value: '0' },
  '1': { type: 'number', value: '1' },
  '2': { type: 'number', value: '2' },
  '3': { type: 'number', value: '3' },
  '4': { type: 'number', value: '4' },
  '5': { type: 'number', value: '5' },
  '6': { type: 'number', value: '6' },
  '7': { type: 'number', value: '7' },
  '8': { type: 'number', value: '8' },
  '9': { type: 'number', value: '9' },
  '.': { type: 'decimal', value: '.' },
  '+': { type: 'operator', value: 'add' },
  '-': { type: 'operator', value: 'subtract' },
  '*': { type: 'operator', value: 'multiply' },
  '/': { type: 'operator', value: 'divide' },
  '%': { type: 'operator', value: 'percentage' },
  'Enter': { type: 'action', value: 'equals' },
  '=': { type: 'action', value: 'equals' },
  'Escape': { type: 'action', value: 'allClear' },
  'c': { type: 'action', value: 'allClear' },
  'C': { type: 'action', value: 'allClear' }
};

let runningState = false
let tempArray = []

// STATE OBJECT
const state = {
    isPowerOn: false,
    previousOperand: '0',
    operator: '',
    nextOperand: '',
};

// FUNCTIONS
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
      mainDisplay.textContent = state.previousOperand
      tempDisplay.textContent = "enter sum"
      state.isPowerOn = true
      return state.isPowerOn
    }
    else{
      mainDisplay.textContent = ""
      tempDisplay.textContent = ""
      state.isPowerOn = false
      clear()
      return state.isPowerOn
    }
}
function clear(){
    mainDisplay.textContent = ""
    tempDisplay.textContent = ""
    state.previousOperand = ''
    state.nextOperand = ''
    state.operator = ''
    tempArray = []
}
function calculate(first, operator, second) {
      const a = parseFloat(first)
      const b = parseFloat(second)
      if (operator === 'add') return (a + b).toString()
        else if (operator === 'multiply') return (a * b).toString()
        else if (operator === 'subtract') return (a - b).toString()
        else if (operator === 'percentage' && isNaN(b)) return (a / 100).toString()
        else if (operator === 'percentage') return (a % b).toString()
        else if (operator === 'divide' && (a === 0 || b === 0)) return 'NO!'
        else if (operator === 'divide'){
        const result = a / b
        if(result.toString().length > 3){
            return result.toFixed(3).toString()
        }
        else{
            return result.toString()
        }

      }
      return second;
    }
function toggleSign(value) {
    if (!value || value === '0') return '-';
    return value.startsWith('-') ? value.slice(1) : '-' + value;
}

function logState(){
    console.log(tempArray)
    console.log(`isPowerOn: ${state.isPowerOn}
previousOperand: ${state.previousOperand}
operator: ${state.operator}
nextOperand: ${state.nextOperand}`)
}

// EVENT LISTENERS

//Power-Up Listener
powerBtn.addEventListener('click', function () { 
    clear()
    lightUp()
    setMainDisplay() 
});

// MOUSE LISTENER
calculator.addEventListener('click', (event) => {
    
    //If calculator isn't powered on, don't allow any input to be captured
    if(!state.isPowerOn) return

    if(event.target.dataset.value === "allClear"){
        clear()
    }
    //ignore trailing zeroes when the current value is zero
    if(state.previousOperand === '0' && event.target.dataset.value === "0") return;

    const inputChoice = event.target.dataset.value
    console.log(typeof(inputChoice))
    //Handle Operand
    if((event.target.dataset.type === "number" || event.target.dataset.type === "decimal") && state.operator === ''){
        if(state.previousOperand.length > 7) return
        
        if(inputChoice === "." && state.previousOperand.includes(".")) return
        //Remove initially displayed zero when capturing operand input

        if(state.previousOperand == '0'){
            state.previousOperand = event.target.dataset.value
        }
        else{
            state.previousOperand += event.target.dataset.value
        }
        mainDisplay.textContent = state.previousOperand
        tempArray[0] = state.previousOperand
    }
    
    //Handle Operators 
    ////Listen for the plusMinus button which should flip the pos/neg sign. 
    else if(event.target.dataset.value === "plusMinus"){ 
        if (state.operator.length > 0) {
            state.nextOperand = toggleSign(state.nextOperand);
            mainDisplay.textContent = state.nextOperand || '0';
            tempArray[2] = state.nextOperand;
        } 
        else {
            state.previousOperand = toggleSign(state.previousOperand);
            mainDisplay.textContent = state.previousOperand || '0';
            tempArray[0] = state.previousOperand;
        }
    }

    //Handle any negative numbers
    else if(event.target.dataset.value === "subtract" && (state.previousOperand === '' || state.previousOperand === '0')){
        state.previousOperand = '-';
        mainDisplay.textContent = '-';
        tempArray[0] = '-';
    }
    else if(event.target.dataset.value === "subtract" && state.operator !== '' && state.nextOperand === ''){
        state.nextOperand = '-';
        mainDisplay.textContent = '-';
        tempArray[2] = '-';
    }

    ////Set the operator
    else if(event.target.dataset.type === "operator"){
        state.operator = inputChoice
        tempArray[1] = event.target.textContent
    }
    //Handle Follow Up Operand
    else if((event.target.dataset.type === "number" || event.target.dataset.type === "decimal") && state.operator.length > 0) {
        if(state.nextOperand.length > 7) return 

        if(inputChoice === "." && state.nextOperand.includes(".")) return
        ////Remove initially displayed zero when capturing operand input
        if(state.nextOperand == '0'){
            state.nextOperand = event.target.dataset.value
        }
        else{
            state.nextOperand += event.target.dataset.value
        }
        mainDisplay.textContent = state.nextOperand
        tempArray[2] = state.nextOperand
    }
    //Handle the full calculation.
    else if(event.target.dataset.value === "equals"){
        let result = calculate(state.previousOperand, state.operator, state.nextOperand)
        tempArray[0] = result
        tempArray[1] = ''
        tempArray[2] = ''
        mainDisplay.textContent = result
        state.previousOperand = result
        state.operator = ''
        state.nextOperand = ''
    }

    //Amend the temporary, running display
    tempDisplay.textContent = tempArray.join('')
     //Console Logs
    logState()
});

// KEYBOARD LISTENER
window.addEventListener('keydown', (event) => {
  if (!state.isPowerOn) return;
  const mappedKey = keyMap[event.key];
  if (!mappedKey) return; // Ignore unmapped keys (like spacebar, letters, etc.)
  event.preventDefault();

  const button = calculator.querySelector(`button[data-value="${mappedKey.value}"]`);

  if (button) {
    button.click();
    button.classList.add('active-key');
    setTimeout(() => button.classList.remove('active-key'), 100);
  }
});






