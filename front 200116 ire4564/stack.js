//stack 생성 처리
function createStack(num) {
    for(var i=1; i<=num; i++){
        eval("var stack" + i + "=" + "document.createElement('div');");
        eval("$(stack" + i + ").addClass('stacks');");
        eval("stack" + i + ".innerHTML = 'stack" + i + "'");
        if(i == 1){
            //첫번째 스택이면
            eval("stack" + i + ".style.marginTop = '5%';")
        } 
        else {
            eval("stack" + i + ".style.marginTop = '-0.5%';")
        }

        eval("$(stack" + i + ").attr('id','stack"+ i +"')");   
        eval("paper.appendChild(stack" + i + ");");
    }
}

function hereStack() {
    
}
//현재 접근하고 있는 곳 표시
function addStack() {

}
//스택 추가하기
function modifyStack() {

}
//스택 값 변경
function deleteStack() {

}
//스택 삭제하기
function topStack() {

}
//스택 탑 표시

