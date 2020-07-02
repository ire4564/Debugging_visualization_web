function readCode(blockNumber, codeNumber) {
    //코드 타입 확인
    var type = $("#codeNumber" + blockNumber + "_" + codeNumber).find("input")[0].value;
    if (type == 0) {
        var code = $("#codeNumber" + blockNumber + "_" + codeNumber).find("span")[0].innerText;
        var haveEqual = code.split("=");
        if (haveEqual.length != 1) {    //등호가 있는 경우

        } else {  //등호가 없는 경우
            var token = code.split(" ");
            if (token.length > 1) {    //처음 선언하는 경우(앞에 타입이 있음)
                var type = -1;  //타입에 대한 정보
                var typeString = "";    //타입의 문자열
                //여기서부터 타입 확인하는 부분
                if (token[0].includes("int")) {
                    type = 0;
                    typeString += "int";
                } else if (token[0].includes("long")) {
                    type = 0;
                    typeString += "long";
                } else if (token[0].includes("float")) {
                    type = 1;
                    typeString += "float";
                } else if (token[0].includes("double")) {
                    type = 1;
                    typeString += "double";
                } else if (token[0].includes("bool")) {
                    type = 2;
                    typeString += "bool";
                } else if (token[0].includes("boolean")) {
                    type = 2;
                    typeString += "boolean";
                } else if (token[0].includes("char")) {
                    type = 3;
                    typeString += "char";
                }
                if (type >= 0) {	//타입 판단 성공 시
                    code.replaceAll(" ", "");	//공백 제거
                    code.replace(typeString, "");	//타입 문자열 제거
                    while (code.charAt("[") != -1) {
                        type += 10;
                        var temp = code.cha=rAt("[");
                        var front = code.subString(0, temp);
                        var last = code.subString(temp + 2);
                        code = front + last;
                    }
                    createVariable(code.replace(";", ""), type);	//id, type 순으로 기입
                }

            }
            //자료형이 나와있지 않은 경우(이미 선언되어있거나 메소드 호출)
            if(token[0]=='new'){
				document.write("error");
			}
			else{
				code = code.replaceAll(" ",""); // 공백 제거
				var dot = code.split(".");
				if(dot.length>1){
					for(var i=1; i<dot.length; i++){
						if(dot[i].indexOf("(")>=0){
							document.write("메소드 처리");
						}
						else{
							document.write("필드");
						}
					}
				}
				if(code.indexOf("[")>=0){
					// 배열임에 주의할 것
				}
				else{
					var charF = code.charAt(0);
					var charL = code.charAt(code.length-2);
					// 문자열 앞 뒤 문자 임시 저장
					code = code.replaceAll("+","");
					code = code.replaceAll("-","");
					// 두 가지 연산자에 대해서 코드 줄에서 모두 제거
					var _name = code.replace(";","");
					// 변수 이름 _name
					createVariable(); // 변수 생성
					if(charF == "+" || charL == "+"){
						// _name.setValue(_name.returnValue() +1); 값을 갖고와서 1을 증가시켜 새로 설정. _name은 변수의 이름
					}
					else if(charF == "-" || charL == "-"){
						// _name.setValue(_name.returnValue() -1); 값을 갖고와서 1을 감소시켜 새로 설정. _name은 변수의 이름
					}
 
				}
 
						
						
 
 
 
 
			}

        }
    }
}