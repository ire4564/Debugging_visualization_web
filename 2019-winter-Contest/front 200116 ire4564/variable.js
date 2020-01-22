/*
 * id: 변수명
 * type: 변수타입
 * value: 변수값
 */

var body = document.body;
var index = 0;    

/*************수정사항****************/
/*
 * 2020.01.18
 * 
 * 변수 3개, 2개 받는 방식으로 바꿨음.
 * 2개는 변수명, 타입 3개는 변수명, 타입, 값
 * 3개가 되었던 두 개가 되었던 만들어진 변수 객체에 대한 아이디는 return 된다.
 * 만들어진 변수 객체의 아이디는 변수명이다.
 * 
 * returnValue() returnType() 추가됨
 * 
 */

//변수 하나씩 생성 시에(변수명, 타입, 값)
/*
 * 기본 자료형
 * int,long : 0 -> 대표는 int로 취급
 * float, double : 1 -> 대표는 double로 취급
 * boolean : 2 
 * char : 3
 *
 */
function createVariable (id, type, value) {

        //타입 리턴을 하가 위해서
        var hiddenType = document.createElement("p");
        hiddenType.innerHTML = type;
        $(hiddenType).attr('id', id + "T");
        hiddenType.style.visibility = "hidden";
        body.append(hiddenType);

        eval("var variable" + index + "=" + "document.createElement('div');");
        eval("$(variable" + index + ").addClass('variables');");
        
        //타입은 h5 태그로 표현
        var innerType = document.createElement('h5');
        var whatType = '';
        //각 번호별로 타입 만들기
        switch(type) {
            case 0 :
                //int(long)
                whatType = "int";
                break;
            case 1 :
                //double(float)
                whatType = "double";
                break;
            case 2 :
                //boolean
                whatType = "bool";
                break;
            case 3 :
                //char
                whatType = "char";
                break;
            default :
                whatType = "unknown";
                break;
        }

        innerType.innerHTML = "<br/>" + whatType;

        //변수명은 h4 태그로 표현
        var innerId = document.createElement('h4');
        innerId.innerHTML = id;

        eval("variable" + index + ".append(innerType)");
        eval("variable" + index + ".append(innerId)");

        if(index == 0){
            //첫번째 배열이면
            eval("variable" + index + ".style.marginTop = '1%';")
           
        } 
        else {
            eval("variable" + index + ".style.marginTop = '1%';")
            eval("variable" + index + ".style.marginLeft = '2%';")
        }
      
        //오버로딩 역할
        if(arguments.length == 3){
            //인자를 세 개 받으면(변수명, 타입, 값)
            //특정 값 넣어서 생성하기
            var number = document.createElement('p');
            number.innerHTML = value;
            eval("variable" + index + ".append(number)");
        }
        else if(arguments.length == 2){
            //인자를 두 개 받으면 (변수명, 타입)
            //특정 값 넣어서 생성하기
            var number = document.createElement('p');
        
            //빈 변수를 생성하기
            var number = document.createElement('p');
            if(type == 0) {
                number.innerHTML = 0;
            }
            else if(type == 1) {
                number.innerHTML = "0.0f";
            }
            else if(type == 2) {
                number.innerHTML = "true";
            }
            else if(type == 3) {
                number.innerHTML = "null";
            }
            else {
                number.innerHTML = "fail";
            }
           
            eval("variable" + index + ".append(number)");
        }

        //변수 상자 아이디 설정해주기
        //eval("$(variable" + index + ").attr('id','V +"+ id +"')");  //변수명으로 아이디 설정해주기
        eval("$(variable" + index + ").attr('id','"+ id +"')");  //변수명으로 아이디 설정해주기
        eval("paper.appendChild(variable" + index + ");"); //화면에 추가해주기

        index++;


        //console.log("type 은? : " + $("#" + id + "T").text());
        console.log("id는? : "  + id);

        return id;
    }
//현재 사용하는 변수
function hereVariable(id){
    $('#'+id).children("p").css('color','red');
}

//String 변수일 경우 크기를 조금 크게 만들기 String 변수
function stringVariable(){
    //보류
}

//변수 타입 바꾸기(변수명, 타입 번호)
function typeVariable(id, type){
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
    $('#'+id).children("h5").html("<br/>" + newType);
}

//변수 값 바꾸기
function setVariable(id, value){
    var types =  $("#" + id + "T").text();
    if(types==0) value = parseInt(value);
    if(types==3) value = String.fromCharCode(value);
    $('#'+id).children("p").text(value);
}

//변수 삭제
function deleteVariable(id){
    $('#'+id).remove();
}

//타입 리턴
function returnType(id) {
    var types =  $("#" + id + "T").text();
    console.log("타입 리턴 통합 " + types);
    return types;
}

//값 리턴
function V_returnValue(id) {
    var Value = $('#'+id).children("p").text();
    console.log("값 리턴 :" + Value);
    return Value;
}
