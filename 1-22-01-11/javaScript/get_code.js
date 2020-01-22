//입력받은 코드를 창에 나타내주는 js
var lastBlockNumber = -1;
var lastBlock = "codefield";
var currentBlockNumber = 0;
var currentCodeNumber = 1;
var blockAmount = 0;
var loopStack = [];
var blockVariable = [[], []];

function addCode(blockNumber, codeNumber, type, data){
    if(blockNumber>lastBlockNumber){
        var newBlock = document.createElement("div");
        newBlock.id = "Block_"+blockNumber;
        $("#"+lastBlock).append(newBlock);
        lastBlock = newBlock.id;
        lastBlockNumber = blockNumber;
    }
    var code = document.createElement("div");
    var codeString = document.createElement("span");    //코드
    var codeType = document.createElement("input");     //코드 타입
    codeType.value = type;
    codeType.style.display = "none";
    code.id = "codeNumber"+blockNumber+"_"+codeNumber;
    codeString.innerHTML = escapeHtml(data);
    //코드에 내용 삽입
    code.append(codeString);
    code.append(codeType);
    //완성된 코드 block에 삽입
    $("#codeNumber"+blockNumber+"_"+codeNumber).click(clickCode(blockNumber, codeNumber));
    $("#Block_"+blockNumber).append(code);
    if(lastBlockNumber!=blockNumber){
        lastBlock = "Block_"+blockNumber;
        lastBlockNumber = blockNumber;
    }
}
function clickCode(blockNumber, codeNumber){
    var temp = draw(blockNumber, codeNumber);
    while(temp==1){
        temp = draw(blockNumber, codeNumber);
    }
}
function draw(blockNumber, codeNumber){
    if(codeNumber==currentCodeNumber) return 0;
    if(codeNumber<currentCodeNumber) resetDraw();
    var tempCode = $("#codeNumber"+currentBlockNumber+"_"+currentCodeNumber);
    if(tempCode[0]==undefined){     //존재하지 않는 경우
        currentCodeNumber++;
    }
    var codeType = tempCode.find("input")[0].value;
    if(codeType == 0) {
        if(tempCode.find("span")[0].innerText==="}"){
            currentBlockNumber = blockVariable[blockAmount][0];
            if($("#codeNumber"+currentBlcokNumber+"_"+loopStack[loopStack.length-1])[0]!==undefined){
                currentCodeNumber = loopStack.pop();
            }
            resetVariable(currentBlockNumber);
            return 1;
        }
        var id = readCode(currentBlockNumber, currentCodeNumber++);
        addVariable(id);
        return 1;
    }
    else if(codeType == 1){    //반복 조건문 등
        var code = tempCode.find("span")[0].innerText;
        var result = ifLoop(currentBlockNumber, currentCodeNumber);
        if(result){
            var token = code.split("(");
            token[0] = token[0].trim();
            if(token[0]==="for" || token[0]==="while"){
                if(code.subString(code.length-1)=="{"){
                    loopStack.push(currentCodeNumber);
                    blockVariable[blockAmount++][0] = currentBlockNumber;
                    currentBlockNumber = currentCodeNumber++;
                }else{
                    //괄호로 묶지 않은 상태로 n중 반복문은 판단 불가능.
                    readCode(currentBlockNumber, currentCodeNumber+1);
                }
            }else{
                if(code.subString(code.length-1)=="{"){
                    blockVariable[blockAmount++][0] = currentBlockNumber;
                    currentBlockNumber = currentCodeNumber++;
                }else{
                    readCode(currentBlockNumber, currentCodeNumber+1);
                }
            }

        }else{
            if(code.subString(code.length-1)!="{"){
                currentCodeNumber++;
            }
            currentCodeNumber++;
            return 1;
        }
    }

}
function resetDraw(){
    blockVariable = [[], []];
    blockAmount = 0;
    currentBlockNumber = 0;
    currentCodeNumber = 1;
}
function resetVariable(index){
    var tempAmount = blockAmount;
    for(var i = 0; i<blockAmount; i++){
        if(blockVariable[i][0]<index) continue;
        for(var j = 1; j<blockVariable[i].length; j++){
            //id에 해당하는 변수 삭제 메소드 호출
        }
        blockVariable[i] = [];
        tempAmount--;
    }
    blockAmount = tempAmount;
}
function addVariable(id){
    for(var i = 0; i<blockAmount; i++){
        if(currentBlockNumber==blockVariable[i][0]){
            for(var j = 0; j<blockVariable[i].length; j++){
                if(blockVariable[i][j]==id) return null;    //새로운 것이 아님. 이미 존재
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