var paper = document.getElementById('show');
//createStack(5);
//createArray(7);


/***************************Variable function*************************************
createVariable("Test","int"); //하나만 생성하기
createVariable("Hello","bool"); //하나만 생성하기
createVariable("TestTwo", "bool", "false"); //하나만 생성하기
createVariable("TestThree", "int", "121"); //하나만 생성하기


//사용되고 있는 변수 붉은 글씨로 나타내기
hereVariable("Test");
hereVariable("TestTwo");
hereVariable("TestThree");

//변수 안의 텍스트 변경하기
modifyVariable("Test", "100");
modifyVariable("Hello", "false");

//변수 타입 바꾸기
typeVariable("TestThree", "string")

//변수 삭제하기
deleteVariable("TestTwo")

//타입 리턴하기
returnType("Hello");
returnType("TestThree");

//값 리턴하기
returnValue("Hello");

************************************************************************************/


/***************************Stack function*****************************************/
//스택 생성하기
createStack(10);

//스택 추가하기
addStack(2);

//스택 삭제하기
deleteStack(2);

//스택 값 변경하기
putStack(2000,"stack3");
putStack(125000);

//현재 스택 위치 옮기기
moveStack("stack3");

//현재 접근하고 있는 곳 표시
hereAddress();

//high->low
gotoHigh();

//low->high
gotoLow();

//값 리턴하기
hereValue();

//스택 탑 표시하기
topStack();
/* ************************************************************************************/