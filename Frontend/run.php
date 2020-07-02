<!DOCTYPE HTML>
    <html lang="ko">
        <head>
            <meta charset="utf-8">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <title>대신 그려드립니다</title>
            <link href="https://fonts.googleapis.com/css?family=Do+Hyeon&display=swap&subset=korean" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css?family=Jua&display=swap&subset=korean" rel="stylesheet">
        </head>
        <body>
        <img src="yourcode.png" width="500px" height="100px" id="yourcode">
        
        <div calss="row">
            <div id="codefield" class="col-md-4 col-sm-4">
                <!--<input type="text" value="LOOK YOUR CODE" id="lookcode" onkeypress="if(event.keyCode==13) {Enter();}">-->
            </div>

            <div id="show" class="col-md-8 col-sm-8">
            <!--그림이 그려질 영역-->
            </div>
            <div id="btn_area" class="col-md-4 col-sm-4">
                <input type="button" id="reset" class="btn2" value="RESET">
                <input type="button" id="go" class="btn" value="▶"><br/>
            </div>
        
        </div>
        <script src="stack.js"></script>
        <script src="variable.js"></script>
        <script src="array.js"></script>
        <script src="run.js"></script>
        <script src="./javaScript/get_code.js"></script>
        <script src="./javaScript/read_code.js"></script>

        <link rel="stylesheet" href="run.css">
        </body>
</html>
<?php
    $codeList = array();    //완성된 코드를 담을 곳

    if($_SERVER["REQUEST_METHOD"]=="POST"){
        //먼저 사용자로부터 입력을 받는다
        if(!empty($_POST["code"])){
            $code = input($_POST["code"]);      //사용자로부터 입력받은 코드를 임시 저장
            $codeList = explode(";", $code);    //;를 기준으로 분할
            $size = sizeof($codeList);          //(가변)분할한 코드 배열의 크기 저장

            $stack = array();                   //stack

            $block = 0;                         //묶음 코드
            $codeNumber = 1;                    //묶음 내 코드 번호
            $switch = 0;


            for($i=0; $i<$size; $i++){
                $whoIsFirst=0;
                $line = $codeList[$i];
                if(strpos($line, "{")!==false && strpos($line, "}")!==false){
                    $whoIsFirst = strpos($line, "{")<strpos($line, "{")? 1:-1;
                }
                //case 1: 여는 중괄호 만남
                if($whoIsFirst==1 || ($whoIsFirst==0&&strpos($line, "{")!==false)){
                    $temp = explode("{", $line);
                    
                    $condition = 1;
                    //switch문인 경우 condition을 변경
                    if(strpos($temp[0], "switch")!==false) {
                        $condition = 2;
                        $switch = $codeNumber;
                    }
                    //중괄호까지의 조건을 담은 코드를 일단 js로 전송
                    echo '<script>addCode('.$block.','.$codeNumber.','.$condition.', "'.htmlspecialchars($temp[0]).'{");</script>
                        ';
                    //남은 문자열들은 처리 전이므로 배열에 다시 삽입
                    $tempString = "";
                    for($j=1; $j<sizeof($temp); $j++)
                        $tempString = $tempString.$temp[$j];
                    addCodeList($i+1, $tempString);
                    $size++;
                    //이후 닫는 중괄호 전까지 새로운 블럭이므로 이에 대한 처리를 진행
                    array_push($stack, $block);
                    $block = $codeNumber++;
                    //$codeNumber = 1;
                }

                //case 2: switch문 내 case문장이 포함된 경우
                else if(strpos($line, ":")!==false&&$switch!=0&&(strpos($line, "case")!==false||strpos($line, "default")!==false)){
                    $temp = explode(":", $line);
                    //case 내용을 담은 코드를 일단 js로 전송
                    echo '<script>addCode('.$block.','.$codeNumber.', 3, "'.htmlspecialchars($temp[0]).':");</script>
                        ';
                    //남은 문자열들은 처리 전이므로 배열에 다시 삽입
                    $tempString = "";
                    for($j=1; $j<sizeof($temp); $j++) $tempString = $tempString.$temp[$j];
                    addCodeList($i+1, $tempString);
                    $size++;
                    $codeNumber++;
                }

                //case 3: 닫는 중괄호 만남
                else if($whoIsFirst==-1 || ($whoIsFirst==0 && strpos($line, "}")!==false)){
                    $temp = explode("}", $line);
                    //중괄호까지의 조건을 담은 코드를 일단 js로 전송
                    echo '<script>addCode('.$block.','.$codeNumber.',0, "'.htmlspecialchars($temp[0]).'}");</script>
                    ';
                    //남은 문자열들은 처리 전이므로 배열에 다시 삽입
                    $tempString = "";
                    for($j=1; $j<sizeof($temp); $j++)
                        $tempString = $tempString.$temp[$j];
                    addCodeList($i+1, $tempString);
                    $size++;
                    //한 블록이 종료되었으므로 stack을 이용하여 전에 작업하던 것을 불러온다
                    //$codeNumber = $block+1;
                    $codeNumber++;
                    //switch문이 있는 경우 이에 대한 처리
                    if($switch == $block){
                        $switch = 0;
                    }
                    $block = array_pop($stack);
                }

                //case 4: 문장 내 여는 괄호가 있는 경우
                else if(strpos($line, "(")!==false){
                    $count = 1;
                    $temp = strpos($line, "(")+1;
                    $cut = -1;
                    while($count!=0){
                        $temp_open = strpos($line, "(", $temp);
                        $temp_close = strpos($line, ")", $temp);
                        if($temp_open===false && $temp_close=== false) break;
                        else if($temp_open === false){
                            $count--;    
                        }else if($temp_open === false){
                            $count++;
                        }else if($temp_open>$temp_close){
                            $count--;
                            $temp = $temp_close+1;
                        }else{
                            $count++;
                            $temp = $temp_open+1;
                        }
                        if($count==0) $cut = $temp_close;
                        else if($count<0) break;    //오류 상황
                    }
                    if($count!=0) $codeList[$i+1] = $line.";".$codeList[$i+1];
                    else{
                        if(strpos($line,"for")!==false||strpos($line,"while")!==false||strpos($line,"if")!==false){
                            echo '<script>addCode('.$block.','.$codeNumber++.', 1, "'.htmlspecialchars(substr($line, 0, $cut+1)).'");</script>
                        ';
                        $codeList[$i--] = substr($line, $cut+1);
                        }else echo '<script>addCode('.$block.','.$codeNumber++.',0, "'.htmlspecialchars($line).';");</script>
                        ';
                    }
                }
                /*
                else if(strpos($line, "(")!==false){
                    //case 3-1: 문장 내 닫는 괄호도 있는 경우
                    if(strpos($line, ")")!==false){
                        $condition = 0;
                        if(strpos($line,"for")!==false||strpos($line,"while")!==false||strpos($line,"if")!==false){
                            $condition = 1;
                        }
                        echo '<script>addCode('.$block.','.$codeNumber++.','.$condition.', "'.htmlspecialchars($line).';");</script>
                        ';
                    }
                    //case 3-2: 문장 내 닫는 괄호가 없는 경우
                    else{
                        $codeList[$i+1] = $line.$codeList[$i+1];
                    }
                }
*/
                //case default: 조건문이 포함되지 않은 기본 문장인 경우
                else if($line!=""){
                    echo '<script>addCode('.$block.','.$codeNumber++.',0, "'.htmlspecialchars($line).';");</script>
                    ';
                }
            }
            
            //stack이 비었을 때(정상 코드)
            if(sizeof($stack)==0){  
                //echo "success!";
            }
            //비정상적인 코드
            else{
                //echo "error!";
            }
        }
        
        //입력받기 실패
        else{
            alert("잘못된 접근입니다!");
        }

        
    }

    function input($data){  //validation check
        $data = trim($data);
        $data = stripslashes($data);
        //$data = htmlspecialchars($data);
        return $data;
    }
    function addCodeList($index, $newCode){
        global $codeList;
        $front = array_slice($codeList, 0, $index);
        $end = array_slice($codeList, $index);
        $front[] = $newCode;
        $codeList = array_merge($front, $end);
    }
?>