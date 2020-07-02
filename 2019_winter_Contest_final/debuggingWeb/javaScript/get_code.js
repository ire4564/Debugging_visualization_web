//입력받은 코드를 창에 나타내주는 js
var lastBlockNumber = -1;
var lastBlock = "codefield";
var currentBlockNumber = 0;
var currentCodeNumber = 1;
var blockAmount = 0;
var loopStack = [];
var blockVariable = [];

function addCode(blockNumber, codeNumber, type, data) {
    if (blockNumber > lastBlockNumber) {
        var newBlock = document.createElement("div");
        newBlock.id = "Block_" + blockNumber;
        $("#" + lastBlock).append(newBlock);
        lastBlock = newBlock.id;
        lastBlockNumber = blockNumber;
    }
    var code = document.createElement("div");
    var codeString = document.createElement("span");    //코드
    var codeType = document.createElement("input");     //코드 타입
    codeType.value = type;
    codeType.style.display = "none";
    code.id = "codeNumber" + blockNumber + "_" + codeNumber;
    codeString.innerHTML = escapeHtml(data);
    //코드에 내용 삽입
    code.append(codeString);
    code.append(codeType);
    //완성된 코드 block에 삽입
    
    codeString.onclick =function (){
        codeCSS(blockNumber, codeNumber);
        var temp = draw(blockNumber, codeNumber);
        while (temp == 1) {
            temp = draw(blockNumber, codeNumber);
        }
    };
    /*
    $(document).ready(function(){
        $(document).on('onclick', '#codeNumber'+blockNumber+"_"+codeNumber,
        function(blockNumber, codeNumber) {
        codeCSS(blockNumber, codeNumber);
        var temp = draw(blockNumber, codeNumber);
        while (temp == 1) {
            temp = draw(blockNumber, codeNumber);
        }
        });
    });
    */
    $("#Block_" + blockNumber).append(code);
    if (lastBlockNumber != blockNumber) {
        lastBlock = "Block_" + blockNumber;
        lastBlockNumber = blockNumber;
    }
}
function codeCSS(blockNumber, codeNumber){
    var allCode = $("#codefield").find("span");
    for(var i=0; i<allCode.length; i++){
        allCode[i].style.backgroundColor="white";
    }
    $("#codeNumber"+blockNumber+"_"+codeNumber).find("span")[0].style.backgroundColor="yellow";
}

function draw(blockNumber, codeNumber) {
    console.log(currentBlockNumber+", "+currentCodeNumber);
    if (codeNumber+1 == currentCodeNumber) return 0;
    if (codeNumber < currentCodeNumber) resetDraw();
    var tempCode = $("#codeNumber" + currentBlockNumber + "_" + currentCodeNumber);
    if (tempCode.length==0) {     //존재하지 않는 경우
        currentCodeNumber++;
        return 1;
    }
    var codeType = tempCode.find("input")[0].value;
    if (codeType == 0) {
        console.log("일반문장 만남!");
        if (tempCode.find("span")[0].innerText === "}") {
            console.log("블록 종료!");
            currentBlockNumber = blockVariable[blockAmount-1];
            if ($("#codeNumber" + currentBlockNumber + "_" + loopStack[loopStack.length - 1])[0] !== undefined) {
                currentCodeNumber = loopStack.pop();
            }
            resetVariable(currentBlockNumber);
            return 1;
        }
        var id = readMainCode(currentBlockNumber, currentCodeNumber++);
        addVariable(id);
        return 1;
    }
    else if (codeType == 1) {    //반복 조건문 등
        console.log("반복문 만남!");
        var code = tempCode.find("span")[0].innerText;
        var result = ifLoop(currentBlockNumber, currentCodeNumber);
        if (result) {
            var token = code.split("(");
            token[0] = token[0].trim();
            if (token[0] === "for" || token[0] === "while") {   //반복문
                if (code.charAt(code.length - 1) === "{") {
                    loopStack.push(currentCodeNumber);
                    blockVariable[blockAmount++] = [currentBlockNumber];
                    currentBlockNumber = currentCodeNumber++;
                } else {
                    //괄호로 묶지 않은 상태로 n중 반복문은 판단 불가능.
                    readMainCode(currentBlockNumber, currentCodeNumber + 1);
                }
            } else {                                            //조건문
                if (code.charAt(code.length - 1) === "{") {
                    blockVariable[blockAmount++] = [currentBlockNumber];
                    currentBlockNumber = currentCodeNumber++;
                } else {
                    readMainCode(currentBlockNumber, currentCodeNumber + 1);
                }
            }

        } else {
            if (code.charAt(code.length - 1) !== "{") {
                currentCodeNumber++;
            }
            currentCodeNumber++;
            return 1;
        }
        return 1;
    }

}
function resetDraw() {
    blockVariable = [];
    blockAmount = 0;
    currentBlockNumber = 0;
    currentCodeNumber = 1;
}
function resetVariable(index) {
    var tempAmount = blockAmount;
    for (var i = 0; i < blockAmount; i++) {
        if (blockVariable[i][0] < index) continue;
        for (var j = 1; j < blockVariable[i].length; j++) {
            //id에 해당하는 변수 삭제 메소드 호출
            var type = returnType(blockVariable[i][j]);
            if(type<10) deleteVariable(blockVariable[i][j]);
            else if(type<20) deleteArray(blockVariable[i][j]);
            else if(type<30) ;
            else if(type<110) deleteStack(blockVariable[i][j]); 
        }
        blockVariable.pop();
        tempAmount--;
    }
    blockAmount = tempAmount;
}
function addVariable(id) {
    for (var i = 0; i < blockAmount; i++) {
        if (currentBlockNumber == blockVariable[i][0]) {
            for (var j = 0; j < blockVariable[i].length; j++) {
                if (blockVariable[i][j] == id) return null;    //새로운 것이 아님. 이미 존재
            }
            blockVariable[i].append(id);
            return id;
        }
    }
}
function escapeHtml(str) {  //validation 재변환 메소드
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&#039;/g, "'");
    return str;
}