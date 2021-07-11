function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  if(checkValidBrackets(expr)) throw new Error("ExpressionError: Brackets must be paired")
  if(divisionByZero(expr)) throw new Error("TypeError: Division by zero.")

  const parceExpr = expr.trim().replace(/\s|\(|\)/g, '').split(/([0-9]+\/[0-9]*)|([0-9]+\*[0-9]*)|(\+|\-)/g).filter(Boolean).map(itm => {
    return Number.isInteger(+itm) || (itm == '+' || itm == '-' || itm == '/' || itm == '*') ? itm : itm.match(/\*|\/|\d*/g).filter(Boolean)
  })

  return action(createArrChanc(parceExpr))


  function createArrChanc(arr) {
    if(arr.length === 3) {
      return arr
    }else {
      return createArrChanc([arr.splice(0,3), ...arr])
      }
    }

    function action([operand_1, operator, operand_2]) {
      const operatorTable = {
        "/": +operand_1 / +operand_2,
        "*": +operand_1 * +operand_2,
        "+": +operand_1 + +operand_2,
        "-": +operand_1 - +operand_2,
      }
      if(Array.isArray(operand_1) && Array.isArray(operand_2)){
        return action([action(operand_1), operator, action(operand_2)])
      }else if(Array.isArray(operand_1)) {
         return action([action(operand_1), operator, operand_2])
       }else if(Array.isArray(operand_2)) {
        return action([operand_1, operator, action(operand_2)])
       }else {
        return operatorTable[operator]
       }
    }
    
    //VALIDATION
    function checkValidBrackets(str) {
      
      return ~str.search(/\(/) && ~str.search(/\)/) ? str.match(/\(/g).length === str.match(/\)/g).length : ~str.search(/\)|\(/)
    }
    function divisionByZero(str) {
      return str.match(/\/0|\/ 0/)
    }
}

module.exports = {
    expressionCalculator
}
