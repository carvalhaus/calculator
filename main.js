const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const resultsDisplayTextElement = document.querySelector('[data-results]');
const calcsDisplayTextElement = document.querySelector('[data-calcs]');

class Calculator {
    constructor(calcsDisplayTextElement, resultsDisplayTextElement) {
        this.calcsDisplayTextElement = calcsDisplayTextElement;
        this.resultsDisplayTextElement = resultsDisplayTextElement;
        this.clear();
    }

    formatDisplayNumber(number) {
        const stringNumber = number.toString();

        const intergerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let intergerDisplay;

        if(isNaN(intergerDigits)) {
            intergerDisplay = '';
        } else {
            intergerDisplay = intergerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }

        if(decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`;
        } else {
            return intergerDisplay;
        }
    }

    delete() {
        this.resultsDisplay = this.resultsDisplay.toString().slice(0, -1);
    }

    calculate() {
        let result;

        const _calcsDisplay = parseFloat(this.calcsDisplay);
        const _resultsDisplay = parseFloat(this.resultsDisplay);

        if(isNaN(_calcsDisplay) || isNaN(_resultsDisplay)) return;

        switch (this.operation) {
            case '+':
                result = _calcsDisplay + _resultsDisplay;
                break;
            case '-':
                result = _calcsDisplay - _resultsDisplay;
                break;
            case '*':
                result = _calcsDisplay * _resultsDisplay;
                break;
            case '÷':
                result = _calcsDisplay / _resultsDisplay;
                break;
            default:
                return;
        }

        this.resultsDisplay = result;
        this.operation = undefined;
        this.calcsDisplay = '';
    }

    chooseOperation(operation) {
        if(this.resultsDisplay === '') return;

        if(this.calcsDisplay !== '') {
            this.calculate();
        }

        this.operation = operation;

        this.calcsDisplay = this.resultsDisplay;
        this.resultsDisplay = '';
    }

    appendNumber(number) {
        if(this.resultsDisplay.includes('.') && number === '.') return;
        this.resultsDisplay = `${this.resultsDisplay}${number.toString()}`;
    }

    clear() {
        this.calcsDisplay = "";
        this.resultsDisplay = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.calcsDisplayTextElement.innerText = `${this.formatDisplayNumber(this.calcsDisplay)} ${this.operation || ""}`;
        this.resultsDisplayTextElement.innerText = this.formatDisplayNumber(this.resultsDisplay);
    }
}

const calculator = new Calculator(
    calcsDisplayTextElement,
    resultsDisplayTextElement
);

for (const numberButton of numberButtons) {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    })
}

for (const operationButton of operationButtons) {
    operationButton.addEventListener('click', () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    })
    
}

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})