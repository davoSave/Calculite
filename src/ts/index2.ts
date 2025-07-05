// BUTTONS
let operatorsButtons = document.getElementsByClassName('operator') as HTMLCollectionOf<HTMLElement> 
var numbersButtons = document.getElementsByClassName('number') as HTMLCollectionOf<HTMLElement> // : NodelistOf <HTMLButtonElement>
let decimalButton = document.getElementById('decimal') as HTMLButtonElement
let equalButton = document.getElementById('equal') as HTMLButtonElement
let plusminusButton = document.getElementById('plusminus') as HTMLButtonElement

addEventListeners()

const CALCULATOR = new Calculator()
const MAX_LENGTH_DISPLAY : number = 9
const DISPLAY = new Display(MAX_LENGTH_DISPLAY, operatorsButtons, numbersButtons, plusminusButton, decimalButton, equalButton)

resetCalculatorStatus()

function addEventListeners () {
  addNumericButtonEventListeners()
  addOperatorButtonEventListeners()
  addDecimalButtonEventListeners()
  addClearButtonEventListeners()
  addEqualButtonEventListeners()
  addPlusMinusEventListeners()
}

function addNumericButtonEventListeners () : void {
  for (const numberButton of numbersButtons) {
    console.log(numberButton)
    numberButton.addEventListener('click', (event) => {
      CALCULATOR.addValueToCurrentNumber((event.target as HTMLElement).getAttribute('value')!)
      updateDOM()
    })
  }
}

function addOperatorButtonEventListeners () : void {
  for (const operatorButton of operatorsButtons) {
    operatorButton.addEventListener('click', (event) => {
      CALCULATOR.setOperator((event.target as HTMLElement).getAttribute('value')!)
      DISPLAY.setOperator((event.target as HTMLElement).getAttribute('value')!)
      DISPLAY.checkOperatorsStatusWhenPressed()
      updateDOM()
    })
  }
}

function addDecimalButtonEventListeners () : void {
  decimalButton!.addEventListener('click', (event) => {
    CALCULATOR.addValueToCurrentNumber((event.target as HTMLElement).getAttribute('value')!)
    updateDOM()
  })
}

function addClearButtonEventListeners () : void {
  const deleteButton = document.getElementById('AC')
  deleteButton!.addEventListener('click', resetCalculatorStatus)
}

function addEqualButtonEventListeners () : void {
  equalButton!.addEventListener('click', (event) => {
    CALCULATOR.getResult()
    DISPLAY.setOperator((event.target as HTMLElement).getAttribute('value')!)
    updateDOM()
  })
}

function addPlusMinusEventListeners () : void {
  plusminusButton!.addEventListener('click', () => {
    CALCULATOR.setPlusMinus()
    updateDOM()
  })
}

function updateDOM () : void {
  DISPLAY.setContent(CALCULATOR.getCurrentNumber())
}

function resetCalculatorStatus () : void {
  CALCULATOR.resetCalculator()
  DISPLAY.resetDisplay()
  updateDOM()
}
