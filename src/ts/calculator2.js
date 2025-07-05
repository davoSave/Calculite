"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Calculator_result, _Calculator_num1, _Calculator_num2, _Calculator_operator, _Calculator_acceptedOperators, _Calculator_num1Complete, _Calculator_num2Complete, _Calculator_currentNumberHasComma, _Calculator_currentNumberCountDecimals, _Calculator_decimalHasBeenAdded, _Calculator_zeroCountDecimal, _Calculator_counterAddedDigitsToNum, _Calculator_calculatorStatus;
// document.getelementbyid('') as HTMLElement.textContent = string(value)
class Calculator {
    constructor() {
        _Calculator_result.set(this, void 0); //(no necsario)
        _Calculator_num1.set(this, void 0);
        _Calculator_num2.set(this, void 0);
        _Calculator_operator.set(this, void 0);
        _Calculator_acceptedOperators.set(this, void 0);
        _Calculator_num1Complete.set(this, void 0);
        _Calculator_num2Complete.set(this, void 0);
        _Calculator_currentNumberHasComma.set(this, void 0);
        _Calculator_currentNumberCountDecimals.set(this, void 0);
        _Calculator_decimalHasBeenAdded.set(this, void 0);
        _Calculator_zeroCountDecimal.set(this, void 0);
        _Calculator_counterAddedDigitsToNum.set(this, void 0);
        _Calculator_calculatorStatus.set(this, void 0);
        __classPrivateFieldSet(this, _Calculator_result, 0, "f");
        __classPrivateFieldSet(this, _Calculator_num1, 0, "f");
        __classPrivateFieldSet(this, _Calculator_num2, 0, "f");
        __classPrivateFieldSet(this, _Calculator_operator, '', "f");
        __classPrivateFieldSet(this, _Calculator_acceptedOperators, ['+', '-', '/', 'x'], "f");
        __classPrivateFieldSet(this, _Calculator_num1Complete, false, "f");
        __classPrivateFieldSet(this, _Calculator_num2Complete, false, "f");
        __classPrivateFieldSet(this, _Calculator_currentNumberHasComma, false, "f");
        __classPrivateFieldSet(this, _Calculator_currentNumberCountDecimals, 0, "f");
        __classPrivateFieldSet(this, _Calculator_decimalHasBeenAdded, false, "f");
        __classPrivateFieldSet(this, _Calculator_zeroCountDecimal, 0, "f");
        __classPrivateFieldSet(this, _Calculator_counterAddedDigitsToNum, 0, "f");
        __classPrivateFieldSet(this, _Calculator_calculatorStatus, new Map([
            ['activatedOperators', false],
            ['activatedNumeric', true],
            ['activatedPlusMinus', true],
            ['activatedDecimal', true],
            ['activatedEqual', false]
        ]), "f");
    }
    getCalculatorStatus() {
        return __classPrivateFieldGet(this, _Calculator_calculatorStatus, "f");
    }
    getResult() {
        if (this.checkCurrentNumberOK()) {
            __classPrivateFieldSet(this, _Calculator_num2Complete, true, "f");
            switch (__classPrivateFieldGet(this, _Calculator_operator, "f")) {
                case '+':
                    __classPrivateFieldSet(this, _Calculator_result, this.plus(), "f");
                    break;
                case '-':
                    __classPrivateFieldSet(this, _Calculator_result, this.minus(), "f");
                    break;
                case '/':
                    __classPrivateFieldSet(this, _Calculator_result, this.divide(), "f");
                    break;
                case 'x':
                    __classPrivateFieldSet(this, _Calculator_result, this.multiply(), "f");
                    break;
            }
            __classPrivateFieldSet(this, _Calculator_num1, __classPrivateFieldGet(this, _Calculator_result, "f"), "f");
            return __classPrivateFieldGet(this, _Calculator_result, "f");
        }
    }
    addValueToCurrentNumber(newValueClick) {
        var _a;
        __classPrivateFieldSet(this, _Calculator_counterAddedDigitsToNum, (_a = __classPrivateFieldGet(this, _Calculator_counterAddedDigitsToNum, "f"), _a++, _a), "f");
        if (newValueClick !== '.') {
            const newValueClicktoFloat = parseFloat(newValueClick);
            if (__classPrivateFieldGet(this, _Calculator_currentNumberHasComma, "f")) {
                this.addDecimalToCurrentNumber(newValueClicktoFloat);
            }
            else {
                this.addDigitToCurrentNumber(newValueClicktoFloat);
            }
            __classPrivateFieldGet(this, _Calculator_calculatorStatus, "f").set('activatedOperators', true);
        }
        else {
            __classPrivateFieldSet(this, _Calculator_currentNumberHasComma, true, "f");
            __classPrivateFieldGet(this, _Calculator_calculatorStatus, "f").set('activatedOperators', false);
            __classPrivateFieldGet(this, _Calculator_calculatorStatus, "f").set('activatedDecimal', false);
        }
    }
    addDigitToCurrentNumber(unit) {
        if (!__classPrivateFieldGet(this, _Calculator_num1Complete, "f")) {
            if (__classPrivateFieldGet(this, _Calculator_num1, "f") < 0) {
                unit = -unit;
            }
            __classPrivateFieldSet(this, _Calculator_num1, __classPrivateFieldGet(this, _Calculator_num1, "f") * 10 + unit, "f"); // se ha eliminado parseFloat(unit) ya que al tipar "unit" se obliga a q sea number y no es necesario
        }
        else {
            if (__classPrivateFieldGet(this, _Calculator_num2, "f") < 0) {
                unit = -unit;
            }
            __classPrivateFieldSet(this, _Calculator_num2, __classPrivateFieldGet(this, _Calculator_num2, "f") * 10 + unit, "f");
        }
    }
    addDecimalToCurrentNumber(unit) {
        var _a;
        __classPrivateFieldSet(this, _Calculator_currentNumberCountDecimals, __classPrivateFieldGet(this, _Calculator_currentNumberCountDecimals, "f") + 1, "f");
        let exponencial;
        exponencial = Math.pow(10, __classPrivateFieldGet(this, _Calculator_currentNumberCountDecimals, "f"));
        let decimal;
        decimal = unit / exponencial;
        if (!__classPrivateFieldGet(this, _Calculator_num1Complete, "f")) {
            if (__classPrivateFieldGet(this, _Calculator_num1, "f") < 0) {
                decimal = -decimal;
            }
            __classPrivateFieldSet(this, _Calculator_num1, Math.round((__classPrivateFieldGet(this, _Calculator_num1, "f") + decimal) * exponencial) / exponencial, "f");
        }
        else {
            if (__classPrivateFieldGet(this, _Calculator_num2, "f") < 0) {
                decimal = -decimal;
            }
            __classPrivateFieldSet(this, _Calculator_num2, Math.round((__classPrivateFieldGet(this, _Calculator_num2, "f") + decimal) * exponencial) / exponencial, "f");
        }
        if (unit === 0) {
            __classPrivateFieldSet(this, _Calculator_zeroCountDecimal, (_a = __classPrivateFieldGet(this, _Calculator_zeroCountDecimal, "f"), _a++, _a), "f");
        }
        else {
            __classPrivateFieldSet(this, _Calculator_zeroCountDecimal, 0, "f");
            __classPrivateFieldSet(this, _Calculator_decimalHasBeenAdded, true, "f");
        }
        __classPrivateFieldGet(this, _Calculator_calculatorStatus, "f").set('activatedDecimal', false);
    }
    setOperator(operator) {
        if (__classPrivateFieldGet(this, _Calculator_acceptedOperators, "f").includes(operator) && this.checkCurrentNumberOK()) {
            this.resetNumberStatus();
            __classPrivateFieldSet(this, _Calculator_operator, operator, "f");
            __classPrivateFieldSet(this, _Calculator_num1Complete, true, "f");
        }
    }
    resetNumberStatus() {
        __classPrivateFieldGet(this, _Calculator_calculatorStatus, "f").set('activatedDecimal', true);
        __classPrivateFieldSet(this, _Calculator_currentNumberCountDecimals, 0, "f");
        __classPrivateFieldSet(this, _Calculator_decimalHasBeenAdded, false, "f");
        __classPrivateFieldSet(this, _Calculator_currentNumberHasComma, false, "f");
        __classPrivateFieldSet(this, _Calculator_counterAddedDigitsToNum, 0, "f");
    }
    checkCurrentNumberOK() {
        let currentNumberOK = false;
        if (__classPrivateFieldGet(this, _Calculator_decimalHasBeenAdded, "f") || !__classPrivateFieldGet(this, _Calculator_currentNumberHasComma, "f")) {
            currentNumberOK = true;
        }
        return currentNumberOK;
    }
    getCurrentNumber() {
        let currentNumber = __classPrivateFieldGet(this, _Calculator_num1, "f").toString();
        if (!__classPrivateFieldGet(this, _Calculator_num2Complete, "f")) {
            if (__classPrivateFieldGet(this, _Calculator_num1Complete, "f")) {
                currentNumber = __classPrivateFieldGet(this, _Calculator_num2, "f").toString();
            }
            if (__classPrivateFieldGet(this, _Calculator_currentNumberHasComma, "f") && !__classPrivateFieldGet(this, _Calculator_decimalHasBeenAdded, "f")) {
                currentNumber += '.';
            }
            if (__classPrivateFieldGet(this, _Calculator_zeroCountDecimal, "f") > 0) {
                for (let i = 0; i < __classPrivateFieldGet(this, _Calculator_zeroCountDecimal, "f"); i++) {
                    currentNumber += '0';
                }
            }
        }
        else {
            currentNumber = __classPrivateFieldGet(this, _Calculator_result, "f").toString();
        }
        return currentNumber;
    }
    setPlusMinus() {
        if (!__classPrivateFieldGet(this, _Calculator_num1Complete, "f")) {
            __classPrivateFieldSet(this, _Calculator_num1, __classPrivateFieldGet(this, _Calculator_num1, "f") * (-1), "f");
        }
        else {
            __classPrivateFieldSet(this, _Calculator_num2, __classPrivateFieldGet(this, _Calculator_num2, "f") * (-1), "f");
        }
    }
    plus() {
        return (__classPrivateFieldGet(this, _Calculator_num1, "f")) + (__classPrivateFieldGet(this, _Calculator_num2, "f"));
    }
    minus() {
        return (__classPrivateFieldGet(this, _Calculator_num1, "f")) - (__classPrivateFieldGet(this, _Calculator_num2, "f"));
    }
    divide() {
        return (__classPrivateFieldGet(this, _Calculator_num1, "f")) / (__classPrivateFieldGet(this, _Calculator_num2, "f"));
    }
    multiply() {
        return (__classPrivateFieldGet(this, _Calculator_num1, "f")) * (__classPrivateFieldGet(this, _Calculator_num2, "f"));
    }
    resetCalculator() {
        __classPrivateFieldSet(this, _Calculator_result, 0, "f");
        __classPrivateFieldSet(this, _Calculator_num1, 0, "f");
        __classPrivateFieldSet(this, _Calculator_num2, 0, "f");
        __classPrivateFieldSet(this, _Calculator_operator, '', "f");
        __classPrivateFieldSet(this, _Calculator_num1Complete, false, "f");
        __classPrivateFieldSet(this, _Calculator_num2Complete, false, "f");
        __classPrivateFieldSet(this, _Calculator_currentNumberHasComma, false, "f");
        __classPrivateFieldSet(this, _Calculator_currentNumberCountDecimals, 0, "f");
        __classPrivateFieldSet(this, _Calculator_decimalHasBeenAdded, false, "f");
        __classPrivateFieldSet(this, _Calculator_zeroCountDecimal, 0, "f");
        __classPrivateFieldSet(this, _Calculator_counterAddedDigitsToNum, 0, "f");
        __classPrivateFieldSet(this, _Calculator_calculatorStatus, new Map([
            ['activatedOperators', false],
            ['activatedNumeric', true],
            ['activatedPlusMinus', true],
            ['activatedDecimal', true],
            ['activatedEqual', false]
        ]), "f");
    }
}
_Calculator_result = new WeakMap(), _Calculator_num1 = new WeakMap(), _Calculator_num2 = new WeakMap(), _Calculator_operator = new WeakMap(), _Calculator_acceptedOperators = new WeakMap(), _Calculator_num1Complete = new WeakMap(), _Calculator_num2Complete = new WeakMap(), _Calculator_currentNumberHasComma = new WeakMap(), _Calculator_currentNumberCountDecimals = new WeakMap(), _Calculator_decimalHasBeenAdded = new WeakMap(), _Calculator_zeroCountDecimal = new WeakMap(), _Calculator_counterAddedDigitsToNum = new WeakMap(), _Calculator_calculatorStatus = new WeakMap();
//# sourceMappingURL=calculator2.js.map