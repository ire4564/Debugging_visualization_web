var index = 0;

//변수 하나씩 생성 시에
function createVariable (type, value) {
        eval("var variable" + index + "=" + "document.createElement('div');");
        eval("$(variable" + index + ").addClass('variables');");
        eval("variable" + index + ".innerHTML = '<br/>" + type +"'");

        if(index == 0){
            //첫번째 배열이면
            eval("variable" + index + ".style.marginTop = '10%';")
           
        } 
        else {
            eval("variable" + index + ".style.marginTop = '10%';")
            eval("variable" + index + ".style.marginLeft = '2%';")
        }
      
        //오버로딩 역할
        if(arguments.length == 2){
            //인자를 두 개 받으면
            //특정 값 넣어서 생성하기
            var number = document.createElement('p');
            number.innerHTML = value;
            eval("variable" + index + ".append(number)");
        }
        else if(arguments.length == 1){
            //하나 받으면 빈 변수를 생성하기
            var number = document.createElement('p');
            if(type == 'int') {
                number.innerHTML = 0;
            }
            else if(type == 'bool') {
                number.innerHTML = "true";
            }
            else if(type == 'float') {
                number.innerHTML = "0.0f";
            }
            else if(type == 'byte') {
                number.innerHTML = 0;
            }
            else if(type == 'char') {
                number.innerHTML = "null";
            }
            else {
                number.innerHTML = "fail";
            }
           
            eval("variable" + index + ".append(number)");
        }

        //변수 상자 아이디 설정해주기
        eval("$(variable" + index + ").attr('id','variable"+ index +"')");  
        eval("paper.appendChild(variable" + index + ");"); //화면에 추가해주기

        index++;
}
//현재 사용하는 변수
function hereVariable(id){
    $('#'+id).children("p").css('color','red');
}

//String 변수일 경우 크기를 조금 크게 만들기 String 변수
function stringVariable(){
    //보류
}

//변수 타입 바꾸기
function typeVariable(id, type){
    var original = $('#'+id).children("p").html();
    $('#'+id).html("<br>" + type + "<p>" + original + "</p>");
}

//변수 값 바꾸기
function modifyVariable(id, value){
    $('#'+id).children("").text(value);
}

//변수 삭제
function deleteVariable(id){
    $('#'+id).remove();
}



