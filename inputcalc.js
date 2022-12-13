const inputEqual = document.querySelector('#btn-input-equal');
const mainResultField = document.querySelector('.input-main-result');

const lastresult1 = document.querySelector('#lastres1');
const lastresult2 = document.querySelector('#lastres2');
const lastresult3 = document.querySelector('#lastres3');
const lastresult4 = document.querySelector('#lastres4');

const deleteLastResult = document.querySelector('.btn-del-last-res');

class Inputcalculator {

  constructor(mainResultField, lastresult1, lastresult2, lastresult3, lastresult4) {
    this.mainResultField = mainResultField
    this.lastresult1 = lastresult1
    this.lastresult2 = lastresult2
    this.lastresult3 = lastresult3
    this.lastresult4 = lastresult4
    this.lastResultArray = []
  }

  getInput() {
    this.inputField = document.querySelector('.inputcalc-input').value
  }

  checkWrongInput() {
    this.wrongCheck = null

    let checkText = this.inputField.replace(/\s+/g, '').split('')
    let withoutOperators = checkText.filter(n => n !== '+' && n !== '-' && n !== '*' && n !== '/' && n !== '.')

    if (checkText.at(-1) === '+' || checkText.at(-1) === '-' ||
      checkText.at(-1) === '*' || checkText.at(-1) === '/') {
      this.mainResultField.innerText = ""
      this.wrongCheck = 1
    }

    if (checkText[0] === '*' || checkText[0] === '/') {
      this.mainResultField.innerText = ""
      this.wrongCheck = 1
    }

    if (checkText[0] === '+' || checkText[0] === '-') {
      checkText.shift() // <--- for test
    }

    if (!checkText.includes('+') && !checkText.includes('-') &&
      !checkText.includes('*') && !checkText.includes('/')) {
      this.mainResultField.innerText = ""
      this.wrongCheck = 1
    }

    if (withoutOperators.find(nanitem => isNaN(nanitem))) {
      alert("Input can only contain values . + - * / and digits")
      this.wrongCheck = 1
    }
  }

  updateInputDisplay() {
    if (this.wrongCheck === 1) return
    this.mainResultField.innerText = this.currentResult.toString()
  }

  updateResultArray() {
    if (this.wrongCheck === 1) return

    if (this.lastResultArray.length > 4) {
      this.lastResultArray.shift()
    }

    this.inputField.replace(/\s+/g, '').length > 15 ?
      this.lastResultArray.push(`${this.inputField.replace(/\s+/g, '').slice(0, 15) + '...'} = ${this.currentResult}`) :
      this.lastResultArray.push(`${this.inputField.replace(/\s+/g, '').slice(0, 15)} = ${this.currentResult}`)
  }

  updateLastResults() {
    if (this.wrongCheck === 1) return

    if (this.lastResultArray[this.lastResultArray.length - 1] === undefined) {
      this.lastresult1.innerText = ''
    } else {
      this.lastresult1.innerText = this.lastResultArray[this.lastResultArray.length - 1]
    }

    if (this.lastResultArray[this.lastResultArray.length - 2] === undefined) {
      this.lastresult2.innerText = ''
    } else {
      this.lastresult2.innerText = this.lastResultArray[this.lastResultArray.length - 2]
    }

    if (this.lastResultArray[this.lastResultArray.length - 3] === undefined) {
      this.lastresult3.innerText = ''
    } else {
      this.lastresult3.innerText = this.lastResultArray[this.lastResultArray.length - 3]
    }

    if (this.lastResultArray[this.lastResultArray.length - 4] === undefined) {
      this.lastresult4.innerText = ''
    } else {
      this.lastresult4.innerText = this.lastResultArray[this.lastResultArray.length - 4]
    }
  }

  clearLastResult() {
    this.lastResultArray.shift();
  }

  inputCalculate() {
    if (this.wrongCheck === 1) return
    let arr = this.inputField.replace(/\s+/g, '').split('')
    let arr2 = [0];
    for (let z = 0; z < arr.length; z++) {
      if (arr[z] === '+' || arr[z] === '-' || arr[z] === '*' || arr[z] === '/') {
        arr2.push(' ', arr[z], ' ')
        z++
      }
      arr2.push(arr[z]);
    }

    let filtertext = arr2.join('').split(' ');

    let y = 0;
    filtertext.push("end");
    while (filtertext[y] !== "end") {
      if (filtertext[y] === "*" || filtertext[y] === "/") {
        this.inputCompute(filtertext[y], filtertext[y - 1], filtertext[y + 1])
        filtertext.splice(y - 1, 3);
        filtertext.splice(y - 1, 0, this.currentResult);
        y = 0;
      } else {
        y++
      }
    }
    filtertext.pop() // <--- delete last array item "end"

    let j = 0;
    while (filtertext.length > 1) {
      if (filtertext[j] === "+" || filtertext[j] === "-") {
        this.inputCompute(filtertext[j], filtertext[j - 1], filtertext[j + 1])
        filtertext.splice(j - 1, 3)
        filtertext.unshift(this.currentResult)
        j = 0;
      } else {
        j++
      }
    }
  }

  inputCompute(operation, prev, current) {
    let result;
    switch (operation) {
      case '+':
        result = parseFloat(prev) + parseFloat(current)
        break
      case '-':
        result = parseFloat(prev) - parseFloat(current)
        break
      case '*':
        result = parseFloat(prev) * parseFloat(current)
        break
      case '/':
        result = parseFloat(prev) / parseFloat(current)
        break
      default:
        return
    }
    this.currentResult = result
  }
}

const inputcalc = new Inputcalculator(mainResultField, lastresult1, lastresult2, lastresult3, lastresult4);

inputEqual.addEventListener('click', () => {
  inputcalc.getInput()
  inputcalc.checkWrongInput()
  inputcalc.inputCalculate()
  inputcalc.updateInputDisplay()
  inputcalc.updateResultArray()
  inputcalc.updateLastResults()
})

deleteLastResult.addEventListener('click', () => {
  inputcalc.clearLastResult()
  inputcalc.updateLastResults()
})


// CHANGE THEME

const inputcalctheme = document.querySelector('.inputcalc-theme');

let k = 0;
inputcalctheme.addEventListener('click', () => {
  if (k === 0) {
    document.querySelector('.inputcalc-mode-change').setAttribute('href', '../styles/inputcalcdark.css')
    inputcalctheme.innerText = "light_mode"
    k++
  } else {
    document.querySelector('.inputcalc-mode-change').setAttribute('href', '../styles/inputcalclight.css')
    inputcalctheme.innerText = "dark_mode"
    k--
  }
})