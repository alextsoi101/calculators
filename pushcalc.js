// PUSH-BUTTON CALCULATOR
const expression = document.querySelector('.num-expression');
const mainresult = document.querySelector('.main-result');

const numberbtn = document.querySelectorAll('.numberbtn');
const operationbtn = document.querySelectorAll('.operator');
const clearbtn = document.querySelector('#btn-ac');
const deletebtn = document.querySelector('#btn-ce');
const percentbtn = document.querySelector('#btn-percent');
const equalbtn = document.querySelector('.equal');


class Calculator {
  constructor(expression, mainresult) {
    this.expression = expression;
    this.mainresult = mainresult;
    this.clearAll();
  }

  clearAll() {
    this.currentOperand = ''
    this.previousExpression = ''
    this.operation = undefined
  }

  deleteOne() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousExpression !== '') {
      this.calc()
    }
    this.operation = operation
    this.previousExpression = this.currentOperand
    this.currentOperand = ''
  }

  percent() {
    this.currentOperand = this.currentOperand / 100
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  calc() {
    let computation;
    const prev = parseFloat(this.previousExpression)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousExpression = ''
  }


  updateDisplay() {
    this.mainresult.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.expression.innerText =
        `${this.getDisplayNumber(this.previousExpression)} ${this.operation}`
    } else {
      this.expression.innerText = ''
    }
  }
}


const calculator = new Calculator(expression, mainresult);

numberbtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
});

operationbtn.forEach(oper => {
  oper.addEventListener('click', () => {
    calculator.chooseOperation(oper.innerText)
    calculator.updateDisplay()
  })
});

percentbtn.addEventListener('click', () => {
  calculator.percent()
  calculator.updateDisplay()
})

clearbtn.addEventListener('click', () => {
  calculator.clearAll()
  calculator.updateDisplay()
});

deletebtn.addEventListener('click', () => {
  calculator.deleteOne()
  calculator.updateDisplay()
});

equalbtn.addEventListener('click', () => {
  calculator.calc()
  calculator.updateDisplay()
});


// CHANGE THEME

const pushcalctheme = document.querySelector('.pushcalc-theme');

let i = 0;
pushcalctheme.addEventListener('click', () => {
  if (i === 0) {
    document.querySelector('.puschcalc-mode-change').setAttribute('href', '../styles/pushcalcdark.css')
    pushcalctheme.innerText = "light_mode"
    i++
  } else {
    document.querySelector('.puschcalc-mode-change').setAttribute('href', '../styles/pushcalclight.css')
    pushcalctheme.innerText = "dark_mode"
    i--
  }
})