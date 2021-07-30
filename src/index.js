function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  if(expr.match(/\/0|\/ 0/)) throw new Error("TypeError: Division by zero.")

  const eprArray = expr.match(/\d+|\+|\-|\*|\/|\(|\)/g);

  const RPN = createRPN(eprArray);

  class Stack {
    constructor() {
      this.stack = [];
      this.operators = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
        "^": (a, b) => a ** b
      };
    }
    add(operand) {
      this.stack.push(operand);
    }
    calculate(operator) {
      const res = this.operators[operator](
        this.stack[this.stack.length - 2],
        this.stack[this.stack.length - 1]
      );
      this.stack.splice(-2, 2, res);
    }
    getResult() {
      return this.stack[0];
    }
  }

  const c = new Stack();

  RPN.forEach((itm) => {
    if (Number.isInteger(+itm)) c.add(+itm);
    else c.calculate(itm);
  });

  
  return c.getResult();

  function createRPN(arr) {
    const output = [];
    const operators = [];

    arr.forEach((itm) => {
      if (Number.isInteger(+itm)) {
        output.push(itm);
      } else if (itm === "(") {
        operators.push(itm);
      } else if (itm === ")" && operators.includes('(')) {
        for (let i = operators.length - 1; ; i--) {
          if (operators[i] === "(") {
            operators.pop();
            break;
          } else {
            const op = operators.pop();
            output.push(op);
          }
        }
      } else if(itm == '+' || itm == '-' || itm == '*' || itm == '/'){
        while(true){
          if (priority(operators[operators.length - 1], itm)) {
            const op = operators.pop();
            output.push(op);
          } else {
            operators.push(itm);
            break;
          }
        }
      }else{
        throw new Error('ExpressionError: Brackets must be paired')
      }
    });
    if(operators.includes('(')) throw new Error('ExpressionError: Brackets must be paired')
    return output.concat(operators.reverse());
  }

  function priority(curOperator, newOperator) {
    const priorCode = {
      "*": 2,
      "/": 2,
      "+": 1,
      "-": 1
    };
    return priorCode[curOperator] >= priorCode[newOperator];
  }
}

module.exports = {
    expressionCalculator
}
