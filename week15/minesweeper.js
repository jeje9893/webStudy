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

function reset(){
    isStarted = false;
    isGameEnd = false;

    remainBombs=99;
    document.getElementById('time').innerHTML = '000';
    curTime = 0;

    leftMB = false;
    rightMB = false;
    bothMB = false;
    savedID = 16*30+1;

    cells.fill(0);
    checked.fill(0);
    clearInterval(myInterval);

    for(let i=0; i<height; i++){
        for(let j=0; j<width; j++){
            id = i*width+j;
            document.getElementById(String(id)).className='cellClosed';
            document.getElementById(String(id)).innerHTML = "";
            document.getElementById(String(id)).style.backgroundColor = 'lightgray';
        }
    }
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
    isGameEnd = true;
    clearInterval(myInterval);

    for(let i =0; i<height; i++){
        for(let j=0; j<width; j++){
            id=i*width+j;
            if(cells[id]==1){
                document.getElementById(String(id)).style.backgroundColor = 'lightgray';
                openCell(parseInt(id/width),id%width);
                document.getElementById(String(id)).innerHTML="<span class='bomb'>💣</span>";
            }
            if(cells[id] == 0 && checked[id]==1){
                document.getElementById(String(id)).style.backgroundColor = 'orange';
                document.getElementById(String(id)).innerHTML = "<span class='bomb cnt7'>🚩</span>";
            }
            if(cells[id] == 1 && checked[id]==1){
                document.getElementById(String(id)).style.backgroundColor = 'green';
                document.getElementById(String(id)).innerHTML = "<span class='bomb cnt7'>🚩</span>";
            }
        }
    }
}

function rightClick(element, id) {
    // console.log("right mouse button clicked");
    // alert("right mouse button clicked");
    if(isGameEnd==true) return;
    if(remainBombs==0 && checked[id]==0)return;
    if(cells[id]==2)return;
    const i = parseInt(id/width);
    const j= id%width;
    if(checked[id]==1){
        checked[id]=0;
        remainBombs++;
        document.getElementById(String(i*width+j)).style.backgroundColor = 'lightgray';
        document.getElementById(String(id)).innerHTML = "<span class='bomb cnt7'></span>";
    }
    else{
        checked[id]=1;
        remainBombs--;
        // document.getElementById(String(i*width+j)).style.backgroundColor = 'orange';
        // document.getElementById(String(i*width+j)).style.top = 0px;
        document.getElementById(String(id)).innerHTML = "<span class='bomb cnt7' top = 0px>🚩</span>";
    }
    document.getElementById('bomb').innerHTML = leadingZeros(remainBombs, 3);
}

function bothDown(element, id) {
    // console.log("both mouse button down");
    // alert("both mouse button down");
}

function bothUp(element, id) {
    // console.log("both mouse button up");
    // alert("both mouse button up");
}