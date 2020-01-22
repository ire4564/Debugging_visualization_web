//html을 통해 기본 코드를 해석하는 메소드
function readCode(blockNumber, codeNumber) {
    //코드 타입 확인
    var type = $("#codeNumber" + blockNumber + "_" + codeNumber).find("input")[0].value;    //코드를 불러온다

    var code = $("#codeNumber" + blockNumber + "_" + codeNumber).find("span")[0].innerText;
    var haveEqual = code.split("=");
    if (haveEqual.length != 1) {    //등호가 있는 경우
        var slice = code.indexOf("=");
        var temp = code.substring(0, slice);
        var temp_value = readCode(code.substring(slice)); //메소드를 이용하여 뒤의 값들 연산
        temp = temp.trim(); //좌우 공백제거
        var lastChar = temp.substring(temp.length - 1);   //가장 오른쪽 문자를 임시로 가져옴
        if (lastChar == "+" || lastChar == "-" || lastChar == "*" || lastChar == "/" || lastChar == "%") {    //연산자 유무 확인
            temp = temp.replace(lastChar, "");  //왼쪽 항에서 연산자를 삭제
            temp = temp.temp.trim();
            temp_value = readCode(temp + lastChar + temp_value);  //다시 계산을 수행하여 임시 저장소에 덮어쓰기
        }
        var token = code.split(" ");
        if (token.length > 1) {
            code = makeVariable(code);
            if (code == null) return null;   //특수한 경우로, 아직 미완성처리이거나 오류
        }
        setVariable(code, temp_value);
        return code;
    } else {  //등호가 없는 경우
        var token = code.split(" ");
        if (token.length > 1) {    //처음 선언하는 경우(앞에 타입이 있음)
            return makeVariable(code);
        } else {
            code = code.replaceAll(" ", ""); // 공백 제거
            var dot = code.split(".");
            if (dot.length > 1) {
                for (var i = 1; i < dot.length; i++) {
                    if (dot[i].indexOf("(") >= 0) {
                        document.write("메소드 처리");
                    }
                    else {
                        document.write("필드");
                    }
                }
                return null;        //필드나 메소드의 리턴값을 반환해야하나, 아직 미구현
            }
            if (code.indexOf("[") >= 0) {
                var brac_count = 0;
                var brac_index = 0;
                var arr_index2 = -1; // -1이 아닌 경우에는 2차원 배열이라는 뜻.
                var ex_name = code.substring(0, code.indexOf("["));
                ex_name = ex_name.replaceAll("+", "");
                ex_name = ex_name.replaceAll("-", "");
                // 배열의 이름 임시 저장.

                for (var i = 0; i < code.length; i++) {
                    if (code.charAt(i) == "[") {
                        brac_count++;
                    }
                    else if (code.charAt(i) == "]") {
                        brac_count--;
                    }
                    if (brac_count == 0) { // 1-21 오타 수정
                        brac_index = i;
                        // ]의 인덱스 찾기
                    }
                }

                var arr_index = code.substring(code.indexOf("[") + 1, brac_index);
                // []안에 있는 값 arr_index 변수에 저장
                code = code.replace(arr_index, "");
                code = code.replace("[", "");
                code = code.replace("]", "");
                // [N] 형태 제거하여 code에 저장
                arr_index = readCode(arr_index); // 함수로 다시보내 처리하도록 함.
                if ((returnType(ex_name) / 10) > 1) {
                    // 2차원 배열이라는 뜻.
                    // [] 안의 값을 한 번 더 얻어와 연산을 수행.
                    for (var i = 0; i < code.length; i++) {
                        if (code.charAt(i) == "[") {
                            brac_count++;
                        }
                        else if (code.charAt(i) == "]") {
                            brac_count--;
                        }
                        if (brac_count == 0) { // 1-21 수정
                            brac_index = i;
                            // ]의 인덱스 찾기
                        }
                    }

                    var arr_index2 = code.substring(code.indexOf("[") + 1, brac_index);
                    // []안에 있는 값 arr_index2 변수에 저장
                    code = code.replace(arr_index, "");
                    code = code.replace("[", "");
                    code = code.replace("]", "");
                    // [N] 형태 또 제거하여 code에 저장
                    arr_index2 = readCode(arr_index2); // 함수로 다시보내 처리하도록 함.
                }

                var charF = code.charAt(0);
                var charL = code.charAt(code.length - 2);
                code = code.replaceAll("+", "");
                code = code.replaceAll("-", "");

                var _name = code.replace(";", "");

                if (charF == "+" || charL == "+") {
                    if (arr_index2 > 0) {
                        // 2차원 배열이라는 뜻
                        setDoubleArray(_name, arr_index, arr_index2, returnDoubleArray(_name, arr_index, arr_index2) + 1);
                        return _name;
                    }
                    setArray(_name, arr_index, returnArray(_name, arr_index) + 1);
                }
                else if (charF == "-" || charL == "-") {
                    if (arr_index2 > 0) {
                        // 2차원 배열이라는 뜻
                        setDoubleArray(_name, arr_index, arr_index2, returnDoubleArray(_name, arr_index, arr_index2) - 1);
                        return _name;
                    }
                    setArray(_name, arr_index, returnArray(_name, arr_index) - 1);
                }
                return _name;
            }
            else {
                var charF = code.charAt(0);
                var charL = code.charAt(code.length - 2);
                // 문자열 앞 뒤 문자 임시 저장
                code = code.replaceAll("+", "");
                code = code.replaceAll("-", "");
                // 두 가지 연산자에 대해서 코드 줄에서 모두 제거
                var _name = code.replace(";", "");
                // 변수 이름 _name
                if (charF == "+" || charL == "+") {
                    setValue(_name, returnValue(_name) + 1); // 값을 갖고와서 1을 증가시켜 새로 설정. _name은 변수의 이름
                }
                else if (charF == "-" || charL == "-") {
                    setValue(_name, returnValue(_name) - 1); // 값을 갖고와서 1을 감소시켜 새로 설정. _name은 변수의 이름
                }
                return _name;

            }
        }
    }
}

//문자열을 통해 코드 해석하는 메소드
function readCode(code) {
    var haveEqual = code.split("=");
    if (haveEqual.length != 1) {    //등호가 있는 경우
        var slice = code.indexOf("=");
        var temp = code.substring(0, slice);

        if (code.indexOf(slice + 1) == "=" || code.indexOf(slice - 1) == ">"
            || code.indexOf(slice - 1) == "<" || code.indexOf(slice - 1) == "!") { //비교연산자인 경우 처리 안함
        } else {
            var temp_value = readCode(code.substring(slice)); //메소드를 이용하여 뒤의 값들 연산
            temp = temp.trim(); //좌우 공백제거
            var lastChar = temp.substring(temp.length - 1);   //가장 오른쪽 문자를 임시로 가져옴
            if (lastChar == "+" || lastChar == "-" || lastChar == "*" || lastChar == "/" || lastChar == "%") {    //연산자 유무 확인
                temp = temp.replace(lastChar, "");  //왼쪽 항에서 연산자를 삭제
                temp = temp.temp.trim();
                temp_value = readCode(temp + lastChar + temp_value);  //다시 계산을 수행하여 임시 저장소에 덮어쓰기
            }
            var token = code.split(" ");
            if (token.length > 1) {
                code = makeVariable(code);
                if (code == null) return null;   //특수한 경우로, 아직 미완성처리이거나 오류
            }
            setVariable(code, temp_value);
            return temp_value;
        }
    } else {  //등호가 없는 경우
        //page2 시작
        var jsTempStringArray = [];
        var tempStringNumber = 0;

        while (true) {            //따옴표가 있는가?
            if (code.includes('"')) { //문자열
                var start = code.indexOf('"');
                var temp_code = code.substring(start + 1);
                var end = temp_code.indexOf('"');
                jsTempStringArray.push(code.substring(start + 1, start + 1 + end));
                //임시 저장 후 해당 위치에 값 대체
                var front = code.substring(0, start);
                var tail = temp_code.substring(end + 1);
                code = front + "jsTempStringArray_" + tempStringNumber + tail;
                tempStringNumber++;
            } else if (code.includes("'")) {   //문자(char)
                var start = code.indexOf("'");
                var temp_code = code.substring(start + 1);
                var end = temp_code.indexOf("'");
                var tempChar = code.substring(start + 1, start + 1 + end);
                //숫자로 변환하여 값 대체
                var front = code.substring(0, start);
                var tail = temp_code.substring(end + 1);
                code = front + parseInt(tempChar) + tail;
            } else {
                break;
            }
        }
        code.replaceAll(" ", "");
        while (true) {
            if (code.includes("(")) {         //괄호가 존재하는가?
                var start = code.indexOf("(");
                var temp_code = code.substring(start + 1);
                var end = temp_code.indexOf(")");
                var innerText = code.substring(start + 1, start + 1 + end);
                //괄호의 내용물이 타입인 경우 알아서 변환되므로 그냥 삭제
                if (innerText === "int" || innerText === "long" || innerText === "float" || innerText === "double"
                    || innerText === "bool" || innerText == "boolean" || innerText == "char") {
                    var front = code.substring(0, start);
                    var tail = temp_code.substring(end + 1);
                    code = front + tail;
                } else {
                    var result = readCode(innerText);   //괄호 안을 하나의 코드로 간주하여 연산을 우선 수행
                    var front = code.substring(0, start);
                    var tail = temp_code.substring(end + 1);
                    code = front + result + tail;
                }
            } else {
                break;
            }
        }
        if (code.includes("&&")) {    //and 연산
            var and = code.indexOf("&&");
            var first = readCode(code.substring(0, and));
            if (!first) return false;
            var second = readCode(code.substring(and + 2));
            if (!second) return false;
            return true;
        }
        if (code.includes("||")) {  //or 연산
            var or = code.indexOf("||");
            var first = readCode(code.substring(0, or));
            if (first) return true;
            var second = readCode(code.substring(or + 2));
            if (second) return true;
            return false;
        }
        if (code.includes(">")) {
            var bigger = code.indexOf(">");
            var first = readCode(code.substring(0, bigger));
            if (code.includes("=")) {
                var second = readCode(code.substring(bigger + 2));
                return first >= second;
            }
            var second = readCode(code.substring(bigger + 1));
            return first > second;
        } else if (code.includes("<")) {
            var smaller = code.indexOf("<");
            var first = readCode(code.substring(0, smaller));
            if (code.includes("=")) {
                var second = readCode(code.substring(smaller + 2));
                return first <= second;
            }
            var second = readCode(code.substring(smaller + 1));
            return first < second;
        } else if (code.includes("==")) {
            var equal = code.indexOf("==");
            var first = code.substring(0, equal);
            var second = code.substring(equal + 2);
            return first == second;
        }
        if (code === "true") return true;
        if (code === "false") return false;

        //page3 시작
        while (true) {
            if (code.includes("+") || code.includes("-") || code.includes("*") || code.includes("/") || code.includes("%")) {
                // 연산자가 존재하는가?
                var left_operator;
                var right_operator;
                var operator_index = -1;
                for (var i = 0; i < code.length; i++) {
                    // 가장 왼쪽 연산자 찾기
                    left_operator = code.charAt(i);
                    if (left_operator == '+' || left_operator == '-' || left_operator == '/' || left_operator == '*' || left_operator == '%') {
                        operator_index = i;
                        break;
                    }
                }
                var left_operand = code.substring(0, operator_index);
                var right_operand = code.substring(operator_index + 1, code.length);
                // 왼쪽 연산자를 기준으로 왼쪽과 오른쪽을 나눈다.

                for (var i = 0; i < right_operand.length; i++) {
                    // 오른쪽에도 연산자가 있는지를 확인
                    var find_op = right_operand.charAt(i);
                    if (find_op == '+' || find_op == '-' || find_op == '/' || find_op == '*' || lfind_op == '%') {
                        right_operator = find_op;
                        break;
                    }
                }

                var result; // 계산 결과를 저장할 변수

                if (right_operator != undefined) {
                    if ((left_operator == '+' || left_operator == '-') && (right_operator == '*' || right_operator == '/' || right_operator == '%')) {
                        // 뒷부분이 먼저 연산 되어야 할 때
                        right_operand = readCode(right_operand); // 오른쪽 피연산자를 인자로 주어 결과 받기
                        left_operand = readCode(left_operand); // 왼쪽 피연산자 값 갖고 오기
                        if (left_operator == '+') {
                            result = left_operand + right_operand;
                        }
                        else if (left_operator == '-') {
                            result = left_operand - right_operand;
                        }
                        return result;

                    }
                    else {
                        // 앞부터 연산을 해도 될 때
                        left_operand = readCode(left_operand); // 앞 부분 피연산자
                        var real_operand = right_operand.substring(0, right_operand.indexOf(right_operator)); // 실제 두 번째 피연산자
                        real_operand = readCode(real_operand); // 실제 데이터를 갖고 옴
                        if (left_operator == '+') {
                            left_operand = left_operand + real_operand;
                        }
                        else if (left_operator == '-') {
                            left_operand = left_operand - real_operand;
                        }
                        else if (left_operator == '*') {
                            left_operand = left_operand * real_operand;
                        }
                        else if (left_operator == '/') {
                            left_operand = left_operand / real_operand;
                        }
                        else if (left_operator == '%') {
                            left_operand = left_operand % real_operand;
                        }

                        right_operand = right_operand.replace(real_operand, left_operand);
                        code = right_operand;
                        continue;
                    }
                }
                else {
                    // 오른쪽 피연산자에서 연산자를 찾지 못했을 때, 그냥 그거 연산해서 내보내면 됨.
                    left_operand = readCode(left_operand);
                    right_operand = readCode(right_operand);
                    if (left_operator == '+') {
                        result = left_operand + right_operand;
                    }
                    else if (left_operator == '-') {
                        result = left_operand - right_operand;
                    }
                    else if (left_operator == '*') {
                        result = left_operand * right_operand;
                    }
                    else if (left_operator == '/') {
                        result = left_operand / right_operand;
                    }
                    else if (left_operator == '%') {
                        result = left_operand % right_operand;
                    }
                    return result;
                }
            }
            else {
                // 연산자가 존재하지 않으면 그냥 반환해버리기 page4와 관련
                //return readCode(code);
                break;
            }
        }

        if (code.indexOf("[") >= 0) {
            var brac_count = 0;
            var brac_index = 0;
            var arr_index2 = -1; // -1이 아닌 경우에는 2차원 배열이라는 뜻.
            var ex_name = code.substring(0, code.indexOf("["));
            ex_name = ex_name.replaceAll("+", "");
            ex_name = ex_name.replaceAll("-", "");
            // 배열의 이름 임시 저장.

            for (var i = 0; i < code.length; i++) {
                if (code.charAt(i) == "[") {
                    brac_count++;
                }
                else if (code.charAt(i) == "]") {
                    brac_count--;
                }
                if (brac_count == 0) { // 1-21 오타 수정
                    brac_index = i;
                    // ]의 인덱스 찾기
                }
            }

            var arr_index = code.substring(code.indexOf("[") + 1, brac_index);
            // []안에 있는 값 arr_index 변수에 저장
            code = code.replace(arr_index, "");
            code = code.replace("[", "");
            code = code.replace("]", "");
            // [N] 형태 제거하여 code에 저장
            arr_index = readCode(arr_index); // 함수로 다시보내 처리하도록 함.
            if ((returnType(ex_name) / 10) > 1) {
                // 2차원 배열이라는 뜻.
                // [] 안의 값을 한 번 더 얻어와 연산을 수행.
                for (var i = 0; i < code.length; i++) {
                    if (code.charAt(i) == "[") {
                        brac_count++;
                    }
                    else if (code.charAt(i) == "]") {
                        brac_count--;
                    }
                    if (brac_count == 0) { // 1-21 수정
                        brac_index = i;
                        // ]의 인덱스 찾기
                    }
                }

                arr_index2 = code.substring(code.indexOf("[") + 1, brac_index);
                // []안에 있는 값 arr_index2 변수에 저장
                code = code.replace(arr_index2, "");
                code = code.replace("[", "");
                code = code.replace("]", "");
                // [N] 형태 또 제거하여 code에 저장
                arr_index2 = readCode(arr_index2); // 함수로 다시보내 처리하도록 함.
            }

            var _name = code.replace(";", "");
            if (arr_index2 > 0) {
                return returnDoubleArray(_name, arr_index, arr_index2);
            }
            return returnArray(_name, arr_index);
            

        }
        else {

            /*
            var charF = code.charAt(0);
            var charL = code.charAt(code.length - 2);
            // 문자열 앞 뒤 문자 임시 저장
            code = code.replaceAll("+", "");
            code = code.replaceAll("-", "");
            // 두 가지 연산자에 대해서 코드 줄에서 모두 제거
            var _name = code.replace(";", "");
            // 변수 이름 _name
            if (charF == "+" || charL == "+") {
                setValue(_name, returnValue(_name) + 1); // 값을 갖고와서 1을 증가시켜 새로 설정. _name은 변수의 이름
            }
            else if (charF == "-" || charL == "-") {
                setValue(_name, returnValue(_name) - 1); // 값을 갖고와서 1을 감소시켜 새로 설정. _name은 변수의 이름
            }
            return returnValue(_name);*/

        }
    }
    return null;
}

//타입이 저장되어 있는 문자열의 경우 
function makeVariable(code) {
    var token = code.split(" ");
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
    } else if (token[0] == 'new') {//자료형이 나와있지 않은 경우(이미 선언되어있거나 메소드 호출)
        document.write("error");
    }
    if (type >= 0) {	//타입 판단 성공 시
        code.replaceAll(" ", "");	//공백 제거
        code.replace(typeString, "");	//타입 문자열 제거
        while (code.indexOf("[") != -1) {                   //1-19 오타 수정
            type += 10;
            var temp = code.indexOf("[");                   //1-19 오타 수정
            var front = code.substring(0, temp);
            var last = code.substring(temp + 2);
            code = front + last;
        }
        if (type < 10) createVariable(code.replace(";", ""), type);	//id, type 순으로 기입
        else if (type < 20) createArray(code.replace);
        return code.replace(";", "");
    }
    return null;
}

//문자 입력시 상수, 변수 판단 후 값 반환
var number = /^[0-9]+$/;
function getValue(string) {
    if (!number.test(string.charAt(0))) {  //변수인가?
        if (string.includes(".")) {   //필드 혹은 메소드인가?

        } else {
            var type = returnType(string);
            if (type < 10) {        //배열 X
                return returnValue(string);
            } else if (type < 20) {  //1차원 배열

            } else if (type < 30) {  //2차원 배열

            } else if (type < 200) { //stack

            }
        }
    } else {      //숫자일 때
        if (string.includes(".")) return parseFloat(string);
        else parseInt(string);
    }
    return null;
}


var if_count = 0;
var do_if = 0;
// 조건문 체크하는 데 이용하는 변수

var for_init = 0; // for문 초기화는 1번만 하기 때문에, 이를 확인하기 위한 변수
var _id; // 블록단위로 변수가 사라지지 않도록 하기 위해서 전역변수로 선언

function ifLoop(blockNumber, codeNumber) {
    // 조건문 or 반복문이 실행될 수 있는지 없는지 true, false로 반환
    var code = $("#codeNumber" + blockNumber + "_" + codeNumber).find("span")[0].innerText;
    if (code.charAt(0) == 'i' || code.charAt(0) == 'e') {
        // 조건문인 경우
        if (code.charAt(0) == 'i') {
            // if인 경우
            if_count++;
            var brac_open = code.indexOf("(");
            var brac_close = code.indexOf(")");
            var condition = code.substring(brac_open + 1, brac_close);
            condition = readCode(condition); // 조건문 얻어오기
            if (condition == true) {
                do_if = if_count;
                return true;
            }
            else {
                do_if = if_count - 1;
                return false;
            }
        }
        else {
            // else if or else
            if (if_count > do_if) {
                if (code.includes("(")) {
                    // 괄호가 있는가 -> else if
                    var brac_open = code.indexOf("(");
                    var brac_close = code.indexOf(")");
                    var condition = code.substring(brac_open + 1, brac_close);
                    condition = readCode(condition); // 얘는 처리한 값이 필요함.
                    if (condition == true) {
                        do_if++;
                        return true;
                    }
                    else {
                        return false;
                    }

                }
                else {
                    // else 실행
                    return true;
                }

            }
            else {
                // 이미 if가 실행되어 다른 조건은 실행할 수 없을 때
                return false;
            }
        }
    }
    else if (code.charAt(0) == 'f') {
        // for문인 경우
        var brac_open = code.indexOf("(");
        var brac_close = code.lastIndexOf(")");
        var op = code.substring(brac_open + 1, brac_close);
        var condition_arr = op.split(";"); // 3개의 항을 모두 얻는다.
        if (for_init == 0) {
            // 초기화를 아직 하지 않았다는 뜻
            if (condition_arr[0].includes("int") || condition_arr[0].includes("long") || condition_arr[0].includes("float") || condition_arr[0].includes("double")) {
                // 자료형이 포함되어있는가? => 생성해야 함.
                var _equal = condition_arr[0].substring(0, condition_arr[0].indexOf("=")); // 등호로 나누기
                _id = makeVariable(_equal[0]); // 변수명을 반환받음. 1-21 오타 수정
                condition_arr[0].replace(_equal[0], _id); // 1-21 오타 수정

            }
            condition_arr[0] = condition_arr[0].trim(); // 혹시 있을 앞 뒤 공백 제거
            readCode(condition_arr[0]);
            for_init = 1; // 초기화를 했음을 표시
            var con_expr = condition_arr[1].trim(); // 앞 뒤에 있을 수 있는 공백 제거하기
            var can_run = readCode(con_expr);
            if (can_run) {
                // for문 반복 조건 성립
                return true;
            }
            else {
                for_init = 0;
                // 하나의 for문 반복이 종료되었다는 의미이므로 for_init을 다시 0으로 초기화
                deleteVariable(_id); // 반복문이 종료될 때 반복자로 사용했던 변수 제거
                return false;
            }
        }
        else {
            // 초기화를 한 후에는 증감식을 먼저 작성한 후, 조건을 확인
            var inc_expr = condition_arr[2].trim(); // 앞 뒤에 있을 수 있는 공백 제거하기 (증감식)
            var temp_name = inc_expr.replace("++", "");
            temp_name = temp_name.replace("--", "");
            temp_name = temp_name.trim();
            // 증감식일 경우에 사용할 변수의 임시 이름
            var charF = inc_expr.charAt(0); // 맨 앞의 문자
            var charL = inc_expr.charAt(inc_expr.length - 1); // 맨 뒤의 문자
            if ((charF == "+") || (charF == "-") || (charL == "+") || (charL == "-")) {
                // 우선 맨 앞의 문자가 연산자인지를 확인
                if ((charF == inc_expr.charAt(1)) || (charL == inc_expr.charAt(inc_expr.length - 2))) {
                    // 만약 앞이나 뒤에 동일한 연산자 반복인 경우 -> 단항 연산자
                    if ((charF == "+") || (charL == "+")) {
                        // 그 연산자가 +인 경우
                        code = temp_name + "=" + temp_name + "+1"; // 변수=변수+1 형태 만들기
                        readCode(code);
                    }
                    else if ((charF == "-") || (charL == "-")) {
                        code = temp_name + "=" + temp_name + "-1"; // 변수=변수-1 형태 만들기
                        readCode(code);
                    }
                }
            }
            else {
                // 맨 앞의 부분이 연산자가 아닌 경우. 이 경우에는 단항 연산자가 아니므로 바로 readCode 처리 가능
                readCode(inc_expr);
            }

            var con_expr = condition_arr[1].trim(); // 앞 뒤에 있을 수 있는 공백 제거하기 (조건식)
            var can_run = readCode(con_expr);
            if (can_run) {
                // for문 반복 조건 성립
                return true;
            }
            else {
                // for문 반복 조건 성립 x
                for_init = 0;
                // 하나의 for문 반복이 종료되었다는 의미이므로 for_init을 다시 0으로 초기화
                deleteVariable(_id); // 반복문이 종료될 때 반복자로 사용했던 변수 제거
                return false;
            }
        }
    }
    else if(code.charAt(0)=='w'){
        // while인 경우

        var brac_open = code.indexOf("(");
        var brac_close = code.lastIndexOf(")");
        var op = code.substring(brac_open + 1, brac_close);

        var can_run = readCode(op);
        // 실행시킬 수 있는지 없는지를 확인
        
        if(can_run){
            return true;
        }
        else{
            return false;
        }
    }

}