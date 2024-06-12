function mouseDown(e, element, id) {
    console.log("down" + e.button + " " + leftMB + " " + rightMB);
    if (e.button == 0) {
        leftMB = true;
        if (rightMB == true) bothDown(element, id);
    } else if (e.button == 2) {
        if (leftMB == true) bothDown(element, id);
        rightMB = true;
    }
}

function mouseUp(e, element, id) {
    console.log("up" + e.button + " " + leftMB + " " + rightMB);
    if (bothMB) {
        leftMB = false;
        rightMB = false;
        bothMB = false;
        return;
    }
    if (e.button == 0) {
        if (rightMB == false) leftClick(element, id);
        else {
            bothMB = true;
            bothUp(element, id);
        }
        leftMB = false;
    }
    else if (e.button == 2) {
        if (leftMB == false) rightClick(element, id);
        else {
            bothMB = true;
            bothUp(element, id);
        }
        rightMB = false;
    }
}

function doNothing(e) {
    // console.log("context menu clicked");
    //alert("context menu clicked");
    e.preventDefault();
}

function leftClick(element, id) {
    // console.log("left mouse button clicked");
    // alert("left mouse button clicked");
    if(isGameEnd==true)return;
    if(cells[id]==1){
        document.getElementById(String(id)).style.backgroundColor = 'red';
        gameOver();
        return;
    }

    const i = parseInt(id/width);
    const j = id%width;
    let ii, jj;
    if(isStarted == false){
        for(k=0; k<remainBombs; k++){
            ii = i; jj = j;
            while ( ( (ii-i)*(ii-i) < 2 && (jj-j)*(jj-j) < 2) || cells[ii*width+jj==1]){
                ii = Math.floor((Math.random() * height));
                jj = Math.floor((Math.random() * width));
            }
            document.getElementById(String(ii*width+jj)).style.backgroundColor = 'black';
            cells[ii*width+jj]=1;
        }
        isStarted = true;
        myInterval = setInterval(timeCount, 1000);
        }
        openCell(i,j);
}

function openCell(i,j){
    let id = i*width+j;
    cells[id] = 2;
    bombs = bombCount(i,j);
    extBombCount = "<span class='count cnt" + bombs + "'>" + (bombs?bombs:"") + "</span>";

    document.getElementById(String(id)).className = 'cellOpen';
    document.getElementById(String(id)).innerHTML = extBombCount;

    let won = true;
    for(let i = 0; i<height; i++){
        for( let j = 0; j<width; j++){
            id = i*width+j;
            if(cells[id]==0){
                won = false;
                break;
            }
        }
    }
    if(won) gameOver();
}

function bombCount(i,j){
    let bombs = 0;
    let ii;
    let jj;
    for(let k=0;k<8;k++){
        ii=i+neighbor[k][0];
        jj=j+neighbor[k][1];
        if(ii<0||height<=ii)continue;
        if(jj<0||width<=jj)continue;
        if(cells[ii*width+jj]==1)bombs++;
    }
    return bombs;
}

function checkCount(i,j){
    let checks=0;
    let ii;
    let jj;
    for(let k=0; k<8; k++){
        ii=i+neighbor[k][0];
        jj=j+neighbor[k][1];
        if(ii<0||height<=ii)continue;
        if(jj<0||width<=jj)continue;
        if(checked[ii*width+jj]==1)checks++;
    }
    return checks;
}

function timeCount() {
    curTime++;
    document.getElementById('time').innerHTML = leadingZeros(curTime, 3);
    if(curTime==999){
        gameOver();
    }
}

function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();
    if(n.length < digits) {
        for(var i = 0; i< digits - n.length; i++){
            zero += '0';
        }
        return zero + n;
    }
}

function gameOver(){
    alert("game over");
}

function rightClick(element, id) {
    // console.log("right mouse button clicked");
    // alert("right mouse button clicked");
}

function bothDown(element, id) {
    // console.log("both mouse button down");
    // alert("both mouse button down");
}

function bothUp(element, id) {
    // console.log("both mouse button up");
    // alert("both mouse button up");
}