
//textfield 접근
var textfield = document.getElementById("putText");
//textfield에 엔터 처리하기
function Enter() {
var BR = document.createElement('br');
//textfield.appendChild(BR);
textfield.value += /(\n|\r\n)/g 
var result = text.value.replace(/(\n|\r\n)/g, '<br>');
}

//코드 제출 버튼 접근
var submit = document.getElementById('submit');
//코드 제출 시 할 동작(기본 동작, 페이지 넘어가기)
/*
submit.onclick=function() {
    //location.href="run.html";
    location.href="run.php";
}
*/