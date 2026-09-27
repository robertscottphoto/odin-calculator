//FUNCTIONS
function lightUp(){
    powerBtn.classList.toggle('pwr-on');
    setMainDisplay()
    powerSvg.classList.toggle('pwr-btn-on')
    bgDisplay.classList.toggle('display-output-on')
    bgDisplay.classList.toggle('display-output-off')
    tempDisplay.classList.toggle('display-output-on')
    titleBar.classList.toggle('title-on')
}
function setMainDisplay(){
    if(powerBtn.classList.contains('pwr-on')){
      mainDisplay.textContent = "0"
    }
    else{
      mainDisplay.textContent = ""
    }
}


//VARIABLES
const powerBtn = document.getElementById("power")
const powerSvg = document.getElementById("SVGRepo_iconCarrier").firstElementChild
const bgDisplay = document.getElementById("display-background")
const tempDisplay = document.getElementById("temp-display")
const mainDisplay = document.getElementById("main-display")
const titleBar = document.getElementById("title")
const calculator = document.querySelector(".calculator")


//EVENT LISTENERS
powerBtn.addEventListener('click', function () {
    lightUp()
});








