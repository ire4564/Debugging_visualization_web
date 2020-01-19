//array 생성 처리
//배열 최대치 24개
var index = 0; //배열이 현재 몇개 생성되었는지
var thisArray = []; //현재 사용하고 있는 배열 아이디
var alerts = 0; //알람을 한번만 설정하기 위해서
var colorCode = ['#819FF7', '#D8CEF6', '#F5BCA9']; //랜덤 색깔(배열 구분)

var showExist = document.createElement('div');
showExist.style.marginTop = "20px";
showExist.style.marginBottom = "-20px";
//showExist.innerHTML = "test";
document.getElementById('show').append(showExist);

//창크기 변화 감지
$( window ).resize(function() {
    var windowSize = $(window).width();
    console.log(windowSize);
    //화면 사이즈가 1595 까지 배열이 깨지지 않음
    //이 이상이 되면 9까지 배열을 늘려서 표현해도 될 것 같다.
    
    //화면이 너무 작아지면 경고창 띄우기
    if(windowSize <= 1350) {
        if(alerts == 0) {
            alert("화면이 너무 작게 되면 화면이 보기 불편할 수 있습니다!")
            alerts = 1;
        }
    }
    if(windowSize <= 1595) {
        $("#" + thisArray + String(8)).css('marginTop', "5%");
        $("#" + thisArray + String(8)).css('marginLeft', "5%");
    }
    else if(windowSize > 1680) {
        //필요하면 처리하기
    }
    else {

        $("#" + thisArray + String(9)).css('marginTop', "10%");
        $("#" + thisArray + String(9)).css('marginLeft', "-0.5%");
        $("#" + thisArray + String(10)).css('marginTop', "10%");
        $("#" + thisArray + String(10)).css('marginLeft', "-0.5%");

        $("#" + thisArray + String(8)).css('marginTop', "10%");
        $("#" + thisArray + String(8)).css('marginLeft', "-0.5%");
        $("#" + thisArray + String(16)).css('marginLeft', "-0.5%");
        $("#" + thisArray + String(11)).css('marginLeft', "5%");
        $("#" + thisArray + String(11)).css('marginTop', "5%");

        $("#" + thisArray + String(21)).css('marginLeft', "-0.5%");
        $("#" + thisArray + String(22)).css('marginTop', "5%");
        $("#" + thisArray + String(22)).css('marginLeft', "5%");

    }
 });

//변수명, 타입, 개수 인자로 입력
function createArray(id, type, num) {
    var windowSize = $(window).width();
    var showNewArray = document.createElement('div');
   // showNewArray.style.float = "center";

    //변수명
    var showID = document.createElement('h2');
    showID.innerHTML = id;
    //타입
    var showType = document.createElement('h2');
    var newType = "";
    switch(type) {
        case 0 :
            //int(long)
            newType = "int";
            break;
        case 1 :
            //double(float)
            newType = "double";
            break;
        case 2 :
            //boolean
            newType = "bool";
            break;
        case 3 :
            //char
            newType = "char";
            break;
    }
    showType.innerHTML = "[" + newType + "]";

    /*따로 빼서 추가하기*/
    showExist.append(showID);
    showExist.append(showType);
    var enter = document.createElement('br');
    showExist.append(enter);

    var arrayColor = 0;
    //이미 만들어진 배열이 존재한다면
    if(thisArray[0] != null) {
        if(thisArray[1] != null) {
            arrayColor = colorCode[2];
        }
        else {
            arrayColor = colorCode[1];
        }
        //임시방편으로 보편화 x (위치 조정 필요)
        var compare = 16; //원래 있어야 하는 것의 인덱스 
        var howmuch = compare - index; //몇 개가 없는지

        for(var k=0; k<howmuch; k++) {
            var addEmpty = document.createElement('div');
            $(addEmpty).addClass('emptyArray');
            showNewArray.append(addEmpty);
        }

        thisArray.push(String(id));
        console.log(thisArray)
        index = 0;
    }
    else {
        arrayColor = colorCode[0];
        //처음 만드는 배열이라면
        thisArray.push(String(id));
    }

    showID.style.color = arrayColor;
    showType.style.color = arrayColor;
    
        for(var i=0; i<num; i++){
            eval("var array" + index + "=" + "document.createElement('div');");
            eval("$(array" + index + ").addClass('arrays');");

        //인덱스 나타낼 태그 넣기(인덱스 표현)
        var innerId = document.createElement('h1');
        innerId.innerHTML = "[" + index + "]"; 
        eval("array" + index + ".append(innerId)");

            //화면 크기에 따라서 다름
            if(windowSize <= 1595) {
                if(i == 0){
                    //첫번째 배열이면
                    eval("array" + index + ".style.marginTop = '5%';")
                } 
                else if(index == 8 || index == 16 || index == 24) {
                    //8개가 넘어갈 경우에 줄바꿈
                    eval("array" + index + ".style.marginTop = '5%';")
                }
                else if((9 <= index && index <= 16) || 17 <= index && index <= 24) {
                    eval("array" + index + ".style.marginTop = '5%';");
                    eval("array" + index + ".style.marginLeft = '-0.5%';");
                }
                else {
                    eval("array" + index + ".style.marginTop = '5%';")
                    eval("array" + index + ".style.marginLeft = '-0.5%';")
                }
            }
            else if(windowSize > 1680) {
                if(i == 0){
                    //첫번째 배열이면
                    eval("array" + index + ".style.marginTop = '5%';")
                } 
                else if(index == 11 || index == 22) {
                    //8개가 넘어갈 경우에 줄바꿈
                    //eval("array" + index + ".style.display = 'block';");
                    eval("array" + index + ".style.marginTop = '5%';");
                }
                else if((12 <= index && index <= 19) || 20 <= index && index <= 24) {
                    eval("array" + index + ".style.marginTop = '5%';");
                    eval("array" + index + ".style.marginLeft = '-0.5%';");
                }
                else {
                    eval("array" + index + ".style.marginTop = '5%';")
                    eval("array" + index + ".style.marginLeft = '-0.5%';")
                } 
            }
            else {
                if(i == 0){
                    //첫번째 배열이면
                    eval("array" + index + ".style.marginTop = '5%';")
                } 
                else if(index == 9 || index == 18) {
                    //8개가 넘어갈 경우에 줄바꿈
                    eval("array" + index + ".style.display = 'block';");
                    eval("array" + index + ".style.marginTop = '5%';");
                }
                else if((9 <= index && index <= 10) || 11 <= index && index <= 24) {
                    eval("array" + index + ".style.marginTop = '5%';");
                    eval("array" + index + ".style.marginLeft = '-0.5%';");
                }
                else {
                    eval("array" + index + ".style.marginTop = '10%';")
                    eval("array" + index + ".style.marginLeft = '-0.5%';")
                } 
            }
        
            //배열의 아이디
            var arrayid = id + String(index);

            console.log(arrayColor)
        
            eval("$(array" + index + ").attr('id', arrayid)");  
            eval("array" + index + ".style.backgroundColor = arrayColor;")
            eval("showNewArray.appendChild(array" + index + ");");

            index++;
        }
    
        paper.append(showNewArray);
}

//2차원 배열 따로 만들기
//row: 행(가로) col: 열(세로)
function createDoubleArray(row, col) {

}

//현재 접근하고 있는 곳 표시
function hereArray(){

}

//값 변경
function setArrray(){

}

//이중배열 값 변경
function setDoubleArrray(){

}

//값 삭제
function deleteArray(){

}

//String 배열 따로 만들기
function stringArray() {

}

//리사이즈
function resizeArray() {

}

//배열의 값을 리턴 (배열명, 인덱스)
function returnValue(id, num) {

}

//타입 번호 리턴
function returnType(id) {

}