var paper = document.getElementById('show');
//createStack(5);
//createArray(7);


/***************************Variable function*************************************
createVariable("Test",1); //하나만 생성하기
createVariable("Hello",2); //하나만 생성하기
createVariable("TestTwo", 0, "false"); //하나만 생성하기
createVariable("TestThree", 0, "121"); //하나만 생성하기


//사용되고 있는 변수 붉은 글씨로 나타내기
hereVariable("Test");
hereVariable("TestTwo");
hereVariable("TestThree");

//변수 안의 텍스트 변경하기
setVariable("Test", "100");
setVariable("Hello", "false");

//변수 타입 바꾸기
typeVariable("TestThree", "string")

//변수 삭제하기
deleteVariable("TestTwo")

//타입 리턴하기
returnType("Hello");
returnType("TestThree");

//값 리턴하기
returnValue("Hello");

***********************************************************************************/


/***************************Stack function*****************************************
//스택 생성하기
createStack(10);

//스택 추가하기
addStack(2);

//스택 삭제하기
deleteStack(2);

//스택 값 변경하기
setStack(2000,"stack3");
setStack(125000);

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
 ************************************************************************************/


 /***************************Array function*****************************************
 //일반 배열 생성
 createArray("this", 10, 7);
 createArray("test", 13, 5);


//일반 배열 값 변경 및 삽입
setArray("test", 0, 5);
setArray("test", 1, 3);

//사용되고 있는 곳 나타내기
hereArray("this", 1)
//hereArray("test", 0)
hereArray("test", 1)

for(var i=0; i<4; i++) {
    setArray("this", i, 3.5);
}

//값을 삭제하기
deleteArray("this", 1);
deleteArray("test", 0);

//일반 배열 값 리턴
returnValue("this", 0)
returnValue("test", 1)

//일반 배열 타입 리턴
returnType("this");
returnType("test");

//변수랑 같이 쓰는 거 테스트 하려고 예시
createVariable("Test", 0); //하나만 생성하기
createVariable("Two", 2); //하나만 생성하기
 
//변수를 하나의 아이디로 모두 지우기
//allRemove("test");

//변수 리사이즈
//resizeArray("this", 5);

**********************************************************************************/

 //이차원 배열 추가
 //createDoubleArray("Doubles", 20, 4, 5);
 //createDoubleArray("Test", 20, 2, 3);

 //이차원 배열 값 변경
/*
 for(var k=0; k<4; k++){
     for(var j=0; j<5; j++){
        setDoubleArrray("Doubles", k, j, "0");
     }
 }

 setDoubleArrray("Doubles", 3, 1, "10");
 setDoubleArrray("Doubles", 1, 2, "바뀜");

returnDoubleValue("Doubles", 3, 1);

returnType("Doubles");
*/