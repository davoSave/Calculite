// BUTTONS
let operatorsButtons = document.getElementsByClassName('operator')
let numbersButtons = document.getElementsByClassName('number')
let decimalButton = document.getElementById('decimal')
let equalButton = document.getElementById('equal')
let plusminusButton = document.getElementById('plusminus')

addEventListeners()

const CALCULATOR = new Calculator()
const MAX_LENGTH_DISPLAY = 9
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

function addNumericButtonEventListeners () {
  for (const numberButton of numbersButtons) {
    numberButton.addEventListener('click', (event) => {
      CALCULATOR.addValueToCurrentNumber(event.target.getAttribute('value'))
      updateDOM()
    })
  }
}

function addOperatorButtonEventListeners () {
  for (const operatorButton of operatorsButtons) {
    operatorButton.addEventListener('click', (event) => {
      CALCULATOR.setOperator(event.target.getAttribute('value'))
      DISPLAY.setOperator(event.target.getAttribute('value'))
      DISPLAY.checkOperatorsStatusWhenPressed()
      updateDOM()
    })
  }
}

function addDecimalButtonEventListeners () {
  decimalButton.addEventListener('click', (event) => {
    CALCULATOR.addValueToCurrentNumber(event.target.getAttribute('value'))
    updateDOM()
  })
}

function addClearButtonEventListeners () {
  const deleteButton = document.getElementById('AC')
  deleteButton.addEventListener('click', resetCalculatorStatus)
}

function addEqualButtonEventListeners () {
  equalButton.addEventListener('click', (event) => {
    CALCULATOR.getResult()
    DISPLAY.setOperator(event.target.getAttribute('value'))
    updateDOM()
  })
}

function addPlusMinusEventListeners () {
  plusminusButton.addEventListener('click', () => {
    CALCULATOR.setPlusMinus()
    updateDOM()
  })
}

function updateDOM () {
  DISPLAY.setContent(CALCULATOR.getCurrentNumber())
}

function resetCalculatorStatus () {
  CALCULATOR.resetCalculator()
  DISPLAY.resetDisplay()
  updateDOM()
}
