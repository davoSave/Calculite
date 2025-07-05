class Display {
  #content
  #maxLength
  #displayDOM
  #operatorButtons
  #numbersButtons
  #plusMinusButton
  #decimalButton
  #equalButton
  #currentOperator

  constructor (
    maxLength,
    operatorsButtons,
    numbersButtons,
    plusMinusButton,
    decimalButton,
    equalButton,
    currentOperator
  ) {
    this.#content = ''
    this.#maxLength = maxLength
    this.#displayDOM = document.getElementById('display')
    this.#operatorButtons = operatorsButtons
    this.#numbersButtons = numbersButtons
    this.#plusMinusButton = plusMinusButton
    this.#decimalButton = decimalButton
    this.#equalButton = equalButton
    this.#currentOperator = currentOperator
  }

  setContent (newContent) {
    if (newContent.toString().length > this.#maxLength) {
      newContent = newContent.toString()
      if (newContent.includes('.')) {
        newContent = newContent.substring(0, (this.#maxLength))
        this.#content = newContent
      } else {
        this.#content = 'ERROR'
      }
    } else if (
      newContent === Infinity ||
      newContent === -Infinity ||
      Number.isNaN(newContent) ||
      newContent === undefined ||
      newContent == null
    ) {
      this.#content = 'ERROR'
    } else {
      newContent = newContent.toString()
      this.#content = newContent
    }
    this.#displayDOM.textContent = this.#content
    this.checkDisplayStatusFromContent()
    if (this.#currentOperator !== '') {
      this.checkOperatorStatusFromCurrentOperator()
    }
  }

  checkDisplayStatusFromContent () {
    if (this.#content === '0') {
      this.updateStatusButtons(this.#numbersButtons, true)
      this.updateStatusButtons([this.#decimalButton], true) // we force an array so that all the buttons are treated the same
      this.updateStatusButtons(this.#operatorButtons, true)
      this.updateStatusButtons([this.#equalButton], true)
      this.updateStatusButtons([this.#plusMinusButton], true)
    } else if (this.#content.includes('.')) {
      this.updateStatusButtons([this.#decimalButton], false)
      if (this.#content.indexOf('.') === this.#content.length - 1) { // Punto en la útima posición
        this.updateStatusButtons([this.#equalButton], false)
        this.updateStatusButtons(this.#operatorButtons, false)
        this.updateStatusButtons([this.#plusMinusButton], false)
        if (this.#content.length === this.#maxLength) { // Punto novena posición
          this.updateStatusButtons(this.#numbersButtons, false)
        } else { // No ocupa 9 posiciones
          this.updateStatusButtons(this.#numbersButtons, true)
        }
      } else { // no esta en la última posición
        this.updateStatusButtons(this.#operatorButtons, true)
        this.updateStatusButtons([this.#equalButton], true)

        if (this.#content.length === this.#maxLength) { // Ocupa los 9 dígitos
          this.updateStatusButtons(this.#numbersButtons, false)
          this.updateStatusButtons([this.#plusMinusButton], false)
          this.updateStatusButtons([this.#decimalButton], false)
        } else { // No ocupa los 9 dígitos
          this.updateStatusButtons(this.#numbersButtons, true)
          this.updateStatusButtons([this.#plusMinusButton], true)
        }
      }
    } else if (this.#content.length === this.#maxLength) {
      this.updateStatusButtons(this.#numbersButtons, false)
      this.updateStatusButtons([this.#decimalButton], false) // we force an array so that all the buttons are treated the same
      this.updateStatusButtons(this.#operatorButtons, true)
      this.updateStatusButtons([this.#equalButton], true)
      this.updateStatusButtons([this.#plusMinusButton], false)
    } else if (this.#content === 'ERROR') {
      this.updateStatusButtons(this.#numbersButtons, false)
      this.updateStatusButtons([this.#decimalButton], false) // we force an array so that all the buttons are treated the same
      this.updateStatusButtons(this.#operatorButtons, false)
      this.updateStatusButtons([this.#equalButton], false)
      this.updateStatusButtons([this.#plusMinusButton], false)
    }
  }

  setOperator (newOperator) {
    this.#currentOperator = newOperator
  }

  checkOperatorsStatusWhenPressed () {
    this.updateStatusButtons([this.#decimalButton], false) // we force an array so that all the buttons are treated the same
    this.updateStatusButtons([this.#equalButton], false)
    this.updateStatusButtons([this.#plusMinusButton], false)
  }

  checkOperatorStatusFromCurrentOperator () {
    this.updateStatusButtons(this.#operatorButtons, true)
    for (let i = 0; i < this.#operatorButtons.length; i++) {
      if (this.#operatorButtons[i].getAttribute('value') === this.#currentOperator) {
        this.updateStatusButtons([this.#operatorButtons[i]], false)
        this.updateStatusButtons([this.#equalButton], false)
        this.updateStatusButtons([this.#plusMinusButton], false)
      }
      if (this.#currentOperator !== '' && this.#content != '0') {
        this.updateStatusButtons([this.#equalButton], true)
        this.updateStatusButtons([this.#plusMinusButton], true)
      }
    }
  }

  resetDisplay () {
    this.updateStatusButtons(this.#numbersButtons, true)
    this.updateStatusButtons([this.#decimalButton], true) // we force an array so that all the buttons are treated the same
    this.updateStatusButtons(this.#operatorButtons, true)
    this.updateStatusButtons([this.#equalButton], true)
    this.updateStatusButtons([this.#plusMinusButton], true)
    this.#currentOperator = ''
  }

  updateStatusButtons (buttons, state) {
    for (let i = 0; i < buttons.length; i++) {
      if (state) {
        buttons[i].classList.remove('disabled')
        buttons[i].disabled = false
      } else {
        buttons[i].classList.add('disabled')
        buttons[i].disabled = true
      }
    }
  }
}
