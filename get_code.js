//입력받은 코드를 창에 나타내주는 js
var lastBlockNumber = 0;
var lastBlock = "codefield";

function addCode(blockNumber, codeNumber, type, data){
    if(blockNumber==0&&codeNumber==1){
        //특수처리. 첫번째 줄에도 block이 증가하는 경우를 위해 생성
        var newBlock = document.createElement("div");
        newBlock.id = "Block_"+blockNumber;
        $("#"+lastBlock).append(newBlock);
        lastBlock = newBlock.id;
        lastBlockNumber = blockNumber;
    }
    else if(codeNumber==0){
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
    $("#Block_"+blockNumber).append(code);
    if(lastBlockNumber!=blockNumber){
        lastBlock = "Block_"+blockNumber;
        lastBlockNumber = blockNumber;
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