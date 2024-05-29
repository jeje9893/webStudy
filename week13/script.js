function typeWriter(element, lines, delay = 10, lineDelay = 50) {
    let lineIndex = 0;
    let charIndex = 0;

    function addLetter() {
        if (lineIndex < lines.length) {
            if (charIndex < lines[lineIndex].length) {
                element.innerHTML += lines[lineIndex].charAt(charIndex);
                charIndex++;
                setTimeout(addLetter, delay);
            } else {
                element.innerHTML += '\n';
                charIndex = 0;
                lineIndex++;
                setTimeout(addLetter, lineDelay);
            }
        }
    }
    addLetter();
}

function convertToBinary() {
    const decimalInput = document.getElementById('decimal-input').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (decimalInput === '') {
        typeWriter(resultDiv, ['Please enter a decimal number.']);
        return;
    }

    const decimalNumber = parseInt(decimalInput, 10);
    let binaryNumber = '';
    let number = decimalNumber;
    const steps = [];

    while (number > 0) {
        const remainder = number % 2;
        steps.push(`${number} ÷ 2 = ${Math.floor(number / 2)} ... ${remainder}`);
        binaryNumber = remainder + binaryNumber;
        number = Math.floor(number / 2);
    }

    if (binaryNumber === '') {
        binaryNumber = '0';
    }

    const resultText = [
        `Decimal: ${decimalNumber}`,
        `Binary: ${binaryNumber}`,
        `Steps:`,
        ...steps
    ];

    typeWriter(resultDiv, resultText, 50, 500);
}

function toBinary () {
    let d1 = document.getElementById('deci1');
    let d2 = document.getElementById('deci2');

    d1 = DecToBi(d1);
    d2 = DecToBi(d2);
}
function DecToBi (deci) {
    const num = deci;
    let binNum;
    while(num > 0){
        const remain = num % 2;
        binNum.push(remain);
        num = Math.floor(num/2);
    }
    return binNum;
}