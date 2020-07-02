//stack 생성 처리
/*
 * 스택을 생성할 때 입력 정보, 몇 칸을 할당받을 것인지 인자를 받는다.
 * 각각의 스택은 위에서부터 id가 stack0, stack1, stack2, stack3... 로 진행된다.
 *   
 * hereid -> 현재 스택이 머무르고 있는 곳
 * num -> 스택을 몇 개를 할당 받아야 할지 넣기
 */

var existStack = []; //현재 할당된 스택들 표시
var stackNum = 0; //스택 수를 갱신하기 위해서 계속 갱신하기 위해 전역변수 사용
var index = 0; //스택 아이디 할당을 위한 변수
var here = ''; //스택이 현재 위치하고 있는 곳 (스택 포인터)
var lastID = ''; //스택의 마지막 위치

var low = document.createElement('h3');
low.innerHTML = 'low address';

var high = document.createElement('h3');
high.innerHTML = 'high address';


//처음 스택 할당 시에 사용
function createStack(id, num) {
    
    //타입 리턴을 하가 위해서
    var hiddenType = document.createElement("p");
    hiddenType.innerHTML = "101"; //스택은 타입 통합
    $(hiddenType).attr('id', id + "T");
    hiddenType.style.visibility = "hidden";
    body.append(hiddenType);

    stackNum = num; //스택 수 책정
    for(var i=1; i<=num; i++){
        eval("var stack" + index + "=" + "document.createElement('div');");
        eval("$(stack" + index + ").addClass('stacks');");
        existStack.push(id + String(index));

        if(i == 1){
            //첫번째 스택이면
            eval("stack" + index + ".style.marginTop = '2%';")
            eval("stack" + index + ".append(high)");
        } 
        else {
            if(i == num) {
                //마지막번째 스택이면
                eval("stack" + index + ".append(low)");
            }
            eval("stack" + index + ".style.marginTop = '-1%';")
        }

        eval("$(stack" + index + ").attr('id', id + String(index))");   
        eval("paper.appendChild(stack" + index + ");");

        index++;
    }
    hereStack("stack0"); //초기 시작 위치 정해주기
    here = "stack0";
    
    //마지막 스택의 아이디 반환
    lastID = "stack" + (stackNum-1);

    return lastID;
}

var test = document.createElement('div')
test.style.backgroundColor

//현재 접근하고 있는 곳 표시
function hereStack(hereid) {
    $("#" + hereid).css('backgroundColor', '#AAE381');
    return hereid;
}

//스택 추가하기
function addStack(num) {
    //원래 있던 low address 지워주고
    
    $("#stack" + (stackNum-1)).html("");

    stackNum += num; //스택 수 갱신하고

    for(var i=0; i<num; i++) {
        eval("var stack" + index + "=" + "document.createElement('div');");
        eval("$(stack" + index + ").addClass('stacks');");

        if(i == num-1) {
            //마지막번째 스택이면
            eval("stack" + index + ".innerHTML = 'low address'");
        }
        eval("stack" + index + ".style.marginTop = '-1%';")

        eval("$(stack" + index + ").attr('id','S"+ index +"')");   
        eval("paper.appendChild(stack" + index + ");");

        index++;
    }

     //마지막 스택의 아이디 반환
    lastID = "stack" + (stackNum-1);
    
    console.log("현재 스택 포인터 위치 : " + here);
    console.log("마지막 스택 아이디 : " + lastID);
    return lastID;
}

//스택 값 변경(넣기)
//어느 칸에, 무슨 값으로 바꿀 것인지 인자로 입력
//인자를 하나만 입력했을 시에는 현재 스택 포인터가 가리키고 있는 값 바꾸기
/**여기서 주의! 인자 넣는 순서가 값, 아이디 순서이다!!****/
function setStack(value, id) {
    //값을 넣을 태그를 생성한다
    var putThis = document.createElement('p');
    $(putThis).addClass('stackValue');
    putThis.innerHTML = value;

    if(arguments.length === 2) {
        //입력한 곳에 값을 넣는다
        var isExist = $("#"+id).children("p").length;
        if(isExist != 0) {
            //이미 다른 값이 존재하는 것이므로
            $("#"+id).children("p").remove(); //기존 것 remove          
        }
        //값 추가하기
        $("#"+id).append(putThis);
        console.log("추가된 곳 아이디 : " + id + " 추가된 값 : " + value);
        return id;
    }
    else if(arguments.length === 1) {
        //현재 위치한 곳에 값을 넣는다
        console.log("인자 하나! Value는? : " + value);
        $('#' + here).append(putThis);
        console.log("추가된 곳 아이디 : " + here + " 추가된 값 : " + value);
        return here;
    }
}

//스택 삭제하기
//몇 개를 삭제할 것인지 인자로 입력
function deleteStack(num) {
    var lastNum = ''; //현재 몇 번째 아이디를 가진 스택인지 알기 위해
    if(lastID.length == 7) {
        //스택이 10개가 넘어갈 때 (두자리수까지만 처리)
        var ten = lastID[5];
        var one = lastID[6]; 

        //console.log("두자리수 처리 : "  + ten + " " + one);
    
        lastNum = String(ten) + String(one);
    }
    else {
        lastNum = lastID[5];
    }

    //console.log("stack 넘버 : " + lastNum);

    for(var i=0; i<num; i++) {
    //배열에서 존재하는 스택을 남기고 지우기
        var where = existStack.indexOf("stack" + lastNum);
        if(where > -1) existStack.splice(where, 1);

        $("#stack" + lastNum).remove();
        lastNum--;
        console.log(lastNum)
    }
    lastID = "stack" + lastNum; //이 부분 문제
    $("#" + lastID).append(low);

    console.log(existStack);
    return lastID; //마지막 스택 아이디 리턴
}

//스택 탑 표시
function topStack() {
    $("#" + here).css('backgroundColor', 'white'); //원래 가리키고 있던 곳 돌려놓기
    here = "stack0";
    hereStack("stack0"); //탑으로 초기화
}

//현재 위치(객체의 아이디) 리턴하기
function hereAddress() {
    console.log("현재 접근 위치 : " + here);
    return here;
}

//현재 주소의 값 리턴
function hereValue() {
    var value = $("#" + here).children("p").text();
    console.log("현재 스택 포인터가 가리키는 값 : " + value);
    return value;
}
//현재 스택 위치 옮기기 (옮기기 원하는 스택의 위치 입력)
function moveStack(id) {
    $("#" + here).css('backgroundColor', 'white'); //원래 가리키고 있던 곳 돌려놓기
    here = id;
    hereStack(id);
}

//스택 위치 순차적으로 옮기기 (high -> low)
function gotoLow() {
    var lastNum = ''; //현재 몇 번째 아이디를 가진 스택인지 알기 위해
    if(here.length == 7) {
        //스택이 10개가 넘어갈 때 (두자리수까지만 처리)
        var ten = here[5];
        var one = here[6]; 
        lastNum = String(ten) + String(one);
    }
    else {
        lastNum = here[5];
    }
    //원래 있던 곳 삭제
    $("#"+here).css("backgroundColor", "white");
    lastNum++;
    here = "stack" + lastNum;
    hereStack("stack"+lastNum);
}

//스택 위치 순차적으로 옮기기 (high -> low)
function gotoHigh() {
    var lastNum = ''; //현재 몇 번째 아이디를 가진 스택인지 알기 위해
    if(here.length == 7) {
        //스택이 10개가 넘어갈 때 (두자리수까지만 처리)
        var ten = here[5];
        var one = here[6]; 
        lastNum = String(ten) + String(one);
    }
    else {
        lastNum = here[5];
    }
    //원래 있던 곳 삭제
    $("#"+here).css("backgroundColor", "white");
    lastNum--;
    here = "stack" + lastNum;
    hereStack("stack"+lastNum);
}
