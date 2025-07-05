// document.getelementbyid('') as HTMLElement.textContent = string(value)
class Calculator {
  #result : number //(no necsario)
  #num1 : number
  #num2 : number
  #operator : string
  #acceptedOperators
  #num1Complete : boolean
  #num2Complete : boolean
  #currentNumberHasComma : boolean
  #currentNumberCountDecimals : number
  #decimalHasBeenAdded : boolean
  #zeroCountDecimal : number
  #counterAddedDigitsToNum : number
  #calculatorStatus : Map<string, boolean>

  constructor () {
    this.#result = 0
    this.#num1 = 0
    this.#num2 = 0
    this.#operator = ''
    this.#acceptedOperators = ['+', '-', '/', 'x']
    this.#num1Complete = false
    this.#num2Complete = false
    this.#currentNumberHasComma = false
    this.#currentNumberCountDecimals = 0
    this.#decimalHasBeenAdded = false
    this.#zeroCountDecimal = 0
    this.#counterAddedDigitsToNum = 0
    this.#calculatorStatus = new Map([
      ['activatedOperators', false],
      ['activatedNumeric', true],
      ['activatedPlusMinus', true],
      ['activatedDecimal', true],
      ['activatedEqual', false]
    ])
  }

  getCalculatorStatus () : Map<string, boolean> {
    return this.#calculatorStatus
  }

  getResult () : number | undefined {
    if (this.checkCurrentNumberOK()) {
      this.#num2Complete = true
      switch (this.#operator) {
        case '+':
          this.#result = this.plus()
          break
        case '-':
          this.#result = this.minus()
          break
        case '/':
          this.#result = this.divide()
          break
        case 'x':
          this.#result = this.multiply()
          break
      }
      this.#num1 = this.#result
      return this.#result
    }
  }

  addValueToCurrentNumber (newValueClick : string) : void {
    this.#counterAddedDigitsToNum++
    if (newValueClick !== '.') {
      const newValueClicktoFloat : number = parseFloat(newValueClick)
      if (this.#currentNumberHasComma) {
        this.addDecimalToCurrentNumber(newValueClicktoFloat)
      } else {
        this.addDigitToCurrentNumber(newValueClicktoFloat)
      }
      this.#calculatorStatus.set('activatedOperators', true)
    } else {
      this.#currentNumberHasComma = true
      this.#calculatorStatus.set('activatedOperators', false)
      this.#calculatorStatus.set('activatedDecimal', false)
    }
  }

  addDigitToCurrentNumber (unit : number) : void {
    if (!this.#num1Complete) {
      if (this.#num1 < 0) {
        unit = -unit
      }
      this.#num1 = this.#num1 * 10 + unit // se ha eliminado parseFloat(unit) ya que al tipar "unit" se obliga a q sea number y no es necesario
    } else {
      if (this.#num2 < 0) {
        unit = -unit
      }
      this.#num2 = this.#num2 * 10 + unit
    }
  }

  addDecimalToCurrentNumber (unit : number) : void {
    this.#currentNumberCountDecimals += 1
    let exponencial : number
    exponencial = Math.pow(10, this.#currentNumberCountDecimals)
    let decimal : number
    decimal = unit / exponencial
    if (!this.#num1Complete) {
      if (this.#num1 < 0) {
        decimal = -decimal
      }
      this.#num1 = Math.round((this.#num1 + decimal) * exponencial) / exponencial
    } else {
      if (this.#num2 < 0) {
        decimal = -decimal
      }
      this.#num2 = Math.round((this.#num2 + decimal) * exponencial) / exponencial
    }

    if (unit === 0) {
      this.#zeroCountDecimal++
    } else {
      this.#zeroCountDecimal = 0
      this.#decimalHasBeenAdded = true
    }
    this.#calculatorStatus.set('activatedDecimal', false)
  }

  setOperator (operator : string) : void {
    if (this.#acceptedOperators.includes(operator) && this.checkCurrentNumberOK()) {
      this.resetNumberStatus()
      this.#operator = operator
      this.#num1Complete = true
    }
  }

  resetNumberStatus () : void {
    this.#calculatorStatus.set('activatedDecimal', true)
    this.#currentNumberCountDecimals = 0
    this.#decimalHasBeenAdded = false
    this.#currentNumberHasComma = false
    this.#counterAddedDigitsToNum = 0
  }

  checkCurrentNumberOK () : boolean {
    let currentNumberOK : boolean = false
    if (this.#decimalHasBeenAdded || !this.#currentNumberHasComma) {
      currentNumberOK = true
    }
    return currentNumberOK
  }

  getCurrentNumber () {
    let currentNumber : string = this.#num1.toString()
    if (!this.#num2Complete) {
      if (this.#num1Complete) {
        currentNumber = this.#num2.toString()
      }
      if (this.#currentNumberHasComma && !this.#decimalHasBeenAdded) {
        currentNumber += '.'
      }
      if (this.#zeroCountDecimal > 0) {
        for (let i = 0; i < this.#zeroCountDecimal; i++) {
          currentNumber += '0'
        }
      }
    } else {
      currentNumber = this.#result.toString()
    }
    return currentNumber
  }

  setPlusMinus () : void {
    if (!this.#num1Complete) {
      this.#num1 = this.#num1 * (-1)
    } else {
      this.#num2 = this.#num2 * (-1)
    }
  }

  plus () : number {
    return (this.#num1) + (this.#num2)
  }

  minus () : number {
    return (this.#num1) - (this.#num2)
  }

  divide () : number {
    return (this.#num1) / (this.#num2)
  }

  multiply () : number {
    return (this.#num1) * (this.#num2)
  }

  resetCalculator () : void {
    this.#result = 0
    this.#num1 = 0
    this.#num2 = 0
    this.#operator = ''
    this.#num1Complete = false
    this.#num2Complete = false
    this.#currentNumberHasComma = false
    this.#currentNumberCountDecimals = 0
    this.#decimalHasBeenAdded = false
    this.#zeroCountDecimal = 0
    this.#counterAddedDigitsToNum = 0
    this.#calculatorStatus = new Map([
      ['activatedOperators', false],
      ['activatedNumeric', true],
      ['activatedPlusMinus', true],
      ['activatedDecimal', true],
      ['activatedEqual', false]
    ])
  }
}
