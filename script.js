//VARIABLES
const powerBtn = document.getElementById("power")
const powerSvg = document.getElementById("SVGRepo_iconCarrier").firstElementChild
const bgDisplay = document.getElementById("display-background")
const tempDisplay = document.getElementById("temp-display")
const mainDisplay = document.getElementById("main-display")
const titleBar = document.getElementById("title")
const calculator = document.querySelector(".calculator")
let collection = []

//FUNCTIONS
function lightUp(){
    let runningState = ""
    powerBtn.classList.toggle('pwr-on');
    powerSvg.classList.toggle('pwr-btn-on')
    bgDisplay.classList.toggle('display-output-on')
    bgDisplay.classList.toggle('display-output-off')
    tempDisplay.classList.toggle('display-output-on')
    titleBar.classList.toggle('title-on')  
}
function setMainDisplay(){
    
    if(powerBtn.classList.contains('pwr-on')){
      mainDisplay.textContent = "0"
      tempDisplay.textContent = "enter sum"
      runningState = true
      return runningState
    }
    else{
      mainDisplay.textContent = ""
      tempDisplay.textContent = ""
      runningState = false
      clear()
      collection = []
      return runningState
    }
}

function evaluate(collection){
    strCollection = collection.join("")
    if(collection.length > 0){
        tempDisplay.textContent = strCollection
    }
}

function clear(){
    tempDisplay.textContent = ""
}


//EVENT LISTENERS
powerBtn.addEventListener('click', function () { 
    lightUp()
    setMainDisplay() // returns True/False depending on calculator power On/Off
});

//We're experiencing troubleshooting with this. Trying to obtain the content of any button within the calculator and it's not working
calculator.addEventListener('click', (event) => {
    inputChoice = event.target.textContent
    if (event.target.matches('button')) {
        console.log(inputChoice)
        collection.push(inputChoice)
        evaluate(collection)
    }
});






