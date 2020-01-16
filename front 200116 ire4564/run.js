var paper = document.getElementById('show');
//createStack(5);
//createArray(7);
createVariable("int"); //하나만 생성하기
createVariable("bool"); //하나만 생성하기
createVariable("bool", "false"); //하나만 생성하기
createVariable("float", 0); //하나만 생성하기
createVariable("float"); //하나만 생성하기
createVariable("char", "a"); //하나만 생성하기

//사용되고 있는 변수 붉은 글씨로 나타내기
hereVariable("variable0");
hereVariable("variable2");
hereVariable("variable4");

//변수 안의 텍스트 변경하기
modifyVariable("variable4", "100");
modifyVariable("variable1", "false");

//변수 타입 바꾸기
typeVariable("variable0", "string")

//변수 삭제하기
deleteVariable("variable0")
//deleteVariable("variable5")
//deleteVariable("variable2")