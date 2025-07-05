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
var _Display_content, _Display_maxLength, _Display_displayDOM, _Display_operatorButtons, _Display_numbersButtons, _Display_plusMinusButton, _Display_decimalButton, _Display_equalButton, _Display_currentOperator;
class Display {
    constructor(maxLength, operatorsButtons, numbersButtons, plusMinusButton, decimalButton, equalButton) {
        _Display_content.set(this, void 0);
        _Display_maxLength.set(this, void 0);
        _Display_displayDOM.set(this, void 0);
        _Display_operatorButtons.set(this, void 0);
        _Display_numbersButtons.set(this, void 0);
        _Display_plusMinusButton.set(this, void 0);
        _Display_decimalButton.set(this, void 0);
        _Display_equalButton.set(this, void 0);
        _Display_currentOperator.set(this, void 0);
        __classPrivateFieldSet(this, _Display_content, '', "f");
        __classPrivateFieldSet(this, _Display_maxLength, maxLength, "f");
        __classPrivateFieldSet(this, _Display_displayDOM, document.getElementById('display'), "f");
        __classPrivateFieldSet(this, _Display_operatorButtons, operatorsButtons, "f");
        __classPrivateFieldSet(this, _Display_numbersButtons, numbersButtons, "f");
        __classPrivateFieldSet(this, _Display_plusMinusButton, plusMinusButton, "f");
        __classPrivateFieldSet(this, _Display_decimalButton, decimalButton, "f");
        __classPrivateFieldSet(this, _Display_equalButton, equalButton, "f");
        __classPrivateFieldSet(this, _Display_currentOperator, "", "f");
    }
    setContent(newContent) {
        if (newContent.length > __classPrivateFieldGet(this, _Display_maxLength, "f")) {
            newContent = newContent;
            if (newContent.includes('.')) {
                newContent = newContent.substring(0, (__classPrivateFieldGet(this, _Display_maxLength, "f")));
                __classPrivateFieldSet(this, _Display_content, newContent, "f");
            }
            else {
                __classPrivateFieldSet(this, _Display_content, 'ERROR', "f");
            }
        }
        else if (newContent === 'Infinity' || //como obligamos a "newCotent" a ser string cambiamos el "Infinity" a string
            newContent === '-Infinity' ||
            newContent === 'NaN' ||
            newContent === 'undefined' ||
            newContent == 'null') {
            __classPrivateFieldSet(this, _Display_content, 'ERROR', "f");
        }
        else {
            newContent = newContent;
            __classPrivateFieldSet(this, _Display_content, newContent, "f");
        }
        __classPrivateFieldGet(this, _Display_displayDOM, "f").textContent = __classPrivateFieldGet(this, _Display_content, "f");
        this.checkDisplayStatusFromContent();
        if (__classPrivateFieldGet(this, _Display_currentOperator, "f") !== '') {
            this.checkOperatorStatusFromCurrentOperator();
        }
    }
    checkDisplayStatusFromContent() {
        if (__classPrivateFieldGet(this, _Display_content, "f") === '0') {
            this.updateStatusButtons(__classPrivateFieldGet(this, _Display_numbersButtons, "f"), true);
            this.updateStatusButtons([__classPrivateFieldGet(this, _Display_decimalButton, "f")], true); // we force an array so that all the buttons are treated the same
            this.updateStatusButtons(__classPrivateFieldGet(this, _Display_operatorButtons, "f"), true);
            this.updateStatusButtons([__classPrivateFieldGet(this, _Display_equalButton, "f")], true);
            this.updateStatusButtons([__classPrivateFieldGet(this, _Display_plusMinusButton, "f")], true);
        }
        else if (__classPrivateFieldGet(this, _Display_content, "f").includes('.')) {
            this.updateStatusButtons([__classPrivateFieldGet(this, _Display_decimalButton, "f")], false);
            if (__classPrivateFieldGet(this, _Display_content, "f").indexOf('.') === __classPrivateFieldGet(this, _Display_content, "f").length - 1) { // Punto en la útima posición
                this.updateStatusButtons([__classPrivateFieldGet(this, _Display_equalButton, "f")], false);
                this.updateStatusButtons(__classPrivateFieldGet(this, _Display_operatorButtons, "f"), false);
                this.updateStatusButtons([__classPrivateFieldGet(this, _Display_plusMinusButton, "f")], false);
                if (__classPrivateFieldGet(this, _Display_content, "f").length === __classPrivateFieldGet(this, _Display_maxLength, "f")) { // Punto novena posición
                    this.updateStatusButtons(__classPrivateFieldGet(this, _Display_numbersButtons, "f"), false);
                }
                else { // No ocupa 9 posiciones
                    this.updateStatusButtons(__classPrivateFieldGet(this, _Display_numbersButtons, "f"), true);
                }
            }
            else { // no esta en la última posición
                this.updateStatusButtons(__classPrivateFieldGet(this, _Display_operatorButtons, "f"), true);
                this.updateStatusButtons([__classPrivateFieldGet(this, _Display_equalButton, "f")], true);
                if (__classPrivateFieldGet(this, _Display_content, "f").length === __classPrivateFieldGet(this, _Display_maxLength, "f")) { // Ocupa los 9 dígitos
                    this.updateStatusButtons(__classPrivateFieldGet(this, _Display_numbersButtons, "f"), false);
                    this.updateStatusButtons([__classPrivateFieldGet(this, _Display_plusMinusButton, "f")], false);
                    this.updateStatusButtons([__classPrivateFieldGet(this, _Display_decimalButton, "f")], false);
                }
                else { // No ocupa los 9 dígitos
                    this.updateStatusButtons(__classPrivateFieldGet(this, _Display_numbersButtons, "f"), true);
                    this.updateStatusButtons([__classPrivateFieldGet(this, _Display_plusMinusButton, "f")], true);
                }
            }
        }
        else if (__classPrivateFieldGet(this, _Display_content, "f").length === __classPrivateFieldGet(this, _Display_maxLength, "f")) {
            this.updateStatusButtons(__classPrivateFieldGet(this, _Display_numbersButtons, "f"), false);
            this.updateStatusButtons([__classPrivateFieldGet(this, _Display_decimalButton, "f")], false); // we force an array so that all the buttons are treated the same
            this.updateStatusButtons(__classPrivateFieldGet(this, _Display_operatorButtons, "f"), true);
            this.updateStatusButtons([__classPrivateFieldGet(this, _Display_equalButton, "f")], true);
            this.updateStatusButtons([__classPrivateFieldGet(this, _Display_plusMinusButton, "f")], false);
        }
        else if (__classPrivateFieldGet(this, _Display_content, "f") === 'ERROR') {
            this.updateStatusButtons(__classPrivateFieldGet(this, _Display_numbersButtons, "f"), false);
            this.updateStatusButtons([__classPrivateFieldGet(this, _Display_decimalButton, "f")], false); // we force an array so that all the buttons are treated the same
            this.updateStatusButtons(__classPrivateFieldGet(this, _Display_operatorButtons, "f"), false);
            this.updateStatusButtons([__classPrivateFieldGet(this, _Display_equalButton, "f")], false);
            this.updateStatusButtons([__classPrivateFieldGet(this, _Display_plusMinusButton, "f")], false);
        }
    }
    setOperator(newOperator) {
        __classPrivateFieldSet(this, _Display_currentOperator, newOperator, "f");
    }
    checkOperatorsStatusWhenPressed() {
        this.updateStatusButtons([__classPrivateFieldGet(this, _Display_decimalButton, "f")], false); // we force an array so that all the buttons are treated the same
        this.updateStatusButtons([__classPrivateFieldGet(this, _Display_equalButton, "f")], false);
        this.updateStatusButtons([__classPrivateFieldGet(this, _Display_plusMinusButton, "f")], false);
    }
    checkOperatorStatusFromCurrentOperator() {
        this.updateStatusButtons(__classPrivateFieldGet(this, _Display_operatorButtons, "f"), true);
        for (let i = 0; i < __classPrivateFieldGet(this, _Display_operatorButtons, "f").length; i++) {
            if (__classPrivateFieldGet(this, _Display_operatorButtons, "f")[i].getAttribute('value') === __classPrivateFieldGet(this, _Display_currentOperator, "f")) {
                this.updateStatusButtons([__classPrivateFieldGet(this, _Display_operatorButtons, "f")[i]], false);
                this.updateStatusButtons([__classPrivateFieldGet(this, _Display_equalButton, "f")], false);
                this.updateStatusButtons([__classPrivateFieldGet(this, _Display_plusMinusButton, "f")], false);
            }
            if (__classPrivateFieldGet(this, _Display_currentOperator, "f") !== '' && __classPrivateFieldGet(this, _Display_content, "f") != '0') {
                this.updateStatusButtons([__classPrivateFieldGet(this, _Display_equalButton, "f")], true);
                this.updateStatusButtons([__classPrivateFieldGet(this, _Display_plusMinusButton, "f")], true);
            }
        }
    }
    resetDisplay() {
        this.updateStatusButtons(__classPrivateFieldGet(this, _Display_numbersButtons, "f"), true);
        this.updateStatusButtons([__classPrivateFieldGet(this, _Display_decimalButton, "f")], true); // we force an array so that all the buttons are treated the same
        this.updateStatusButtons(__classPrivateFieldGet(this, _Display_operatorButtons, "f"), true);
        this.updateStatusButtons([__classPrivateFieldGet(this, _Display_equalButton, "f")], true);
        this.updateStatusButtons([__classPrivateFieldGet(this, _Display_plusMinusButton, "f")], true);
        __classPrivateFieldSet(this, _Display_currentOperator, '', "f");
    }
    updateStatusButtons(buttons /*HTMLCollectionOf<Element> | HTMLElement | object*/, state) {
        for (let i = 0; i < buttons.length; i++) {
            if (state) {
                buttons[i].classList.remove('disabled');
                buttons[i].disabled = false;
            }
            else {
                buttons[i].classList.add('disabled');
                buttons[i].disabled = true;
            }
        }
    }
}
_Display_content = new WeakMap(), _Display_maxLength = new WeakMap(), _Display_displayDOM = new WeakMap(), _Display_operatorButtons = new WeakMap(), _Display_numbersButtons = new WeakMap(), _Display_plusMinusButton = new WeakMap(), _Display_decimalButton = new WeakMap(), _Display_equalButton = new WeakMap(), _Display_currentOperator = new WeakMap();
//# sourceMappingURL=display2.js.map