function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '');
    return parseByAddition(expr);
}

function splitByParenthesisAndOperator (expression, operator) {
    let processedExpression = [];
    let exprInParenthesis = "";
    let parenthesis = 0;
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === '(') {
            parenthesis++;
        } else if (expression[i] === ')') {
            parenthesis--;
        }

        if (parenthesis === 0 && expression[i] === operator ) {
            processedExpression.push(exprInParenthesis);
            exprInParenthesis = "";
        } else {
            exprInParenthesis += expression[i];
        }
    }

    if (exprInParenthesis !== "") {
        processedExpression.push(exprInParenthesis);
    }
    if (parenthesis != 0) throw ("ExpressionError: Brackets must be paired");
    return processedExpression;
}

function parseByDivision(expression) {
    let bufferArray = splitByParenthesisAndOperator(expression, "/");
    for (let i = 0; i < bufferArray.length; i++) {
        bufferArray[i] = parseByMultiplication(bufferArray[i]);
    }
    let divisionValue = bufferArray.reduce(function (a, b) {
        if (b == 0) throw ("TypeError: Division by zero.");
        else
         return a / b; });
    return divisionValue;
}

function parseByMultiplication (expression) {
    let bufferArray = splitByParenthesisAndOperator(expression, "*");
    for (let i = 0; i < bufferArray.length; i++) {
        let bufferString = bufferArray[i];
        if (bufferString.indexOf("(") === 0) {
            let newExpression = bufferString.substr(1, bufferString.length - 2);
            let str =  parseByAddition(newExpression);
            bufferArray[i] = Number(str);
        }
        bufferArray[i] = Number(bufferArray[i]);
    }
    let multiplicationValue = bufferArray.reduce((a, b) =>  a * b);
    return multiplicationValue;
}

function parseByAddition (expression) {
    let bufferArray = splitByParenthesisAndOperator(expression, "+");
    for (let i = 0; i < bufferArray.length; i++) {
        let str = parseBySubtraction(bufferArray[i]);
        bufferArray[i] = +str;
    }
    let additionValue = bufferArray.reduce(function (a, b) { return a + b; });
    return additionValue;
}

function parseBySubtraction (expression) {
    let bufferArray = splitByParenthesisAndOperator(expression, "-");
    for (let i = 0; i < bufferArray.length; i++) {
        let str = bufferArray[i];
        bufferArray[i] = parseByDivision(bufferArray[i]);
    }
    return bufferArray.reduce(function (a, b) { return a - b; });
}

module.exports = {
    expressionCalculator
}
