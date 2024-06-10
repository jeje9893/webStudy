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
    const d1 = document.getElementById('deci1');
    const d2 = document.getElementById('deci2');

    const d1value = d1.value;
    const d2value = d2.value;

    const bivalue = DecToBi(d1value);

    d1.value=bivalue;

}

function DecToBi(deci) {
    let num = deci;
    let binNum = '';
    
    if (num === 0) {
        return '0';
    }

    while (num > 0) {
        const remain = num % 2;
        binNum = remain + binNum;
        num = Math.floor(num / 2);
    }
    return binNum;
}

const numberOfTags = 10;
        
// 태그를 추가할 부모 요소
// 반복문을 사용하여 태그 생성
for(let j=1; j<=3; j++){
    const container = document.getElementById(`di${j}`);
    for (let i = numberOfTags; i >= 0; i--) {
        // 새 div 요소 생성
        const newDiv = document.createElement('input');
        
        // div 내용 설정
        newDiv.innerHTML = `1`;
    
        newDiv.id=`a${i}`;
        newDiv.className=`di`;
        
        // div 요소를 부모 요소에 추가
        container.appendChild(newDiv);
    }
}
