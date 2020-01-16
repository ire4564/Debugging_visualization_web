//array 생성 처리
function createArray(num) {
    for(var i=0; i<=num; i++){
        eval("var array" + i + "=" + "document.createElement('div');");
        eval("$(array" + i + ").addClass('arrays');");
        eval("array" + i + ".innerHTML = 'index [" + i + "]'");
        if(i == 0){
            //첫번째 배열이면
            eval("array" + i + ".style.marginTop = '25%';")
           
        } 
        else {
            eval("array" + i + ".style.marginTop = '25%';")
            eval("array" + i + ".style.marginLeft = '-0.5%';")
        }
       
        eval("$(array" + i + ").attr('id','array"+ i +"')");   
        eval("paper.appendChild(array" + i + ");");
    }
}
function hereArray(){

}
//현재 접근하고 있는 곳 표시
function modifyArrray(){

}
//값 변경
function deleteArray(){

}
//값 삭제
function doubleArray() {

}
//2차원 배열 따로 만들기
function stringArray() {

}
//String 배열 따로 만들기
function resizeArray() {

}
//리사이즈
