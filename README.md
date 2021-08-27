![대신 그려드립니다](C:\Users\user\Downloads\대신 그려드립니다.png) 

![preview badge](https://img.shields.io/github/languages/code-size/ire4564/Debugging_visualization_web)   ![preview badge](https://img.shields.io/github/repo-size/ire4564/Debugging_visualization_web)

## Tech Stack

[![img](https://camo.githubusercontent.com/dcda8d4b13cf09b9e90b1b44d91aefd13f2bdca27b55733f4f3332339e3d190f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f48544d4c2d6533346632363f7374796c653d666c6174266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/dcda8d4b13cf09b9e90b1b44d91aefd13f2bdca27b55733f4f3332339e3d190f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f48544d4c2d6533346632363f7374796c653d666c6174266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465) [![img](https://camo.githubusercontent.com/9ec42846977dc75ca88cfac233370cad14d36507f7a1449ab3636e86f2ccb756/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4353532d3135373262363f7374796c653d666c6174266c6f676f3d63737333266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/9ec42846977dc75ca88cfac233370cad14d36507f7a1449ab3636e86f2ccb756/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4353532d3135373262363f7374796c653d666c6174266c6f676f3d63737333266c6f676f436f6c6f723d7768697465) [![img](https://camo.githubusercontent.com/5346585204aa17630cc0dd80a57d42e2b6c66a12add2e761f9b0cb3fce05d167/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d6462616230393f7374796c653d666c6174266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/5346585204aa17630cc0dd80a57d42e2b6c66a12add2e761f9b0cb3fce05d167/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d6462616230393f7374796c653d666c6174266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d7768697465) <span><img src="https://img.shields.io/badge/Php-0052cc?style=flat&logo=php&logoColor=white"/></span>  <span><img src="https://img.shields.io/badge/AWS-232f3e?style=flat&logo=amazon-aws&logoColor=white"/></span> 

## Preview

![image](https://user-images.githubusercontent.com/44183221/86324713-ece95200-bc79-11ea-9771-860c53a5dc4a.png)

> Live Demo는 현재 Server의 연결 문제로 보류 중입니다. 시연을 원하시는 분들은 Apache 서버가 깔린 Web Server에 해당 파일을 올리고, main.html에서 동작을 확인하면 됩니다.

프로그램 Main 동작 화면입니다. 왼쪽의 Text field에 코드를 넣게 되면 오른쪽의 화면단과 같이 자료 구조를 시각화하여 현재 실행하고 있는 코드의 상태를 시각화하여 보여 줍니다. 프로그램의 동작에 대한 자세한 설명은 아래를 참고하면 됩니다.



## About Project

초보자들이 알고리즘 문제를 해결할 경우, IDE 등을 사용하여 프로그래밍을 한다고 하더라도 직관적으로 프로그램이 어떤 상태인지는 확인하기가 어렵습니다. 이 문제에 대한 도움을 주고자, 시각적으로 현재 프로그램의 실행 상태를 확인할 수 있는 디버깅 시각화 프로그램을 개발하였습니다. 위의 프로그램은 웹에서 동작합니다.

<b>Frontend</b>같은 경우 각각의 <Stack, 1Dimension Array , 2Dimension Arrary> 그리고 기본적인 변수에 대한 처리를 구현하였으며, <b>Backend</b>로 Java 기준으로 프로그램의 언어를 해석하여 Frontend에 구현된 기능 함수들을 가지고 화면에 표시하는 동작을 구현하였습니다.

현재에는 프로그램 이용 가능 언어를  Java로 한정하고 있으며, 추후 재구현 또는 리팩토링을 통해 실사용 시에 활용도가 높은 디버깅 시각화 프로그램을 완성하는 것을 목적으로 합니다.



## Point function

![image-20210827151807095](C:\Users\user\AppData\Roaming\Typora\typora-user-images\image-20210827151807095.png) 

* <b>원하는 코드 입력</b>
  자신이 푼 알고리즘 문제, 눈으로 동작을 직접 확인하고 싶은 코드를 코드 입력 란에 입력합니다.

* <b>수집한 코드 분석</b>
  입력한 코드를, 위의 Java 규칙에 따라 분석합니다. 입력된 코드를 텍스트로 처리하여, 규칙에 따라 토큰을 분석하고 그에 따른 처리를 할 수 있는 함수를 만듭니다. 변수 생성, 값 변경, 자료구조 생성 등의 동작을 하는 함수를 만들어 코드를 분석합니다.
* <b>실행 라인 표시</b>
  분석한 코드를 정적으로 보여주는 것이 아닌, 현재 실행 상태에 따라 보여주는 식이므로 현재 실행되고 있는 프로그램의 라인을 색으로 표시해줍니다. 현재 실행되고 있는 라인에서 프로그램이 어떤 상태에 놓여 있는지 직관적으로 확인할 수 있습니다.
* <b>실행 및 리셋 동작 버튼</b>
  프로그램의 라인을 하나씩 실행 시키며 결과를 확인할 수 있도록 동작 UI 버튼을 배치하였습니다.
* <b>프로그램 시각화</b>
  코드를 분석했다면, 그에 맞는 화면을 보여주도록 설계하였습니다. 예를 들어 스택이 생성되는 동작의 함수라면 그 함수 안에 CreateStack()이라는 함수와 같이 html과 css로 설계된 다양한 UI들을 JavaScript를 이용하여 상황에 맞게 보여주고 삭제하는 동작을 하는 프로그램을 작성하였습니다.



## My Position

>  Writer: <b>ire4564</b> 

<span><img src="https://img.shields.io/badge/JavaScript-DBA901?style=flat&logo=JavaScript&logoColor=white"/></span> <img src="https://img.shields.io/badge/UI/UX Design-cc6699?style=flat&logo=adobe&logoColor=white"/> <img src="https://img.shields.io/badge/Web Frontend-045FB4?style=flat&logo=web&logoColor=white"/>   

언어를 분석하여, 분석된 알고리즘에 맞춰 UI를 보여주도록 설계하고 개발하는 <b>Front-end</b>를 담당하였습니다.

우선 분석할 언어 Java에 맞춰 각각의 분석될 수 있는 케이스들을 분류하고, 시각화 할 수 있는 자료구조를 선정하여 어떻게 하면 사용자가 직관적이고 편리하게 사용할 수 있을지에 대해 생각하며 프로그램을 설계하였습니다. 또한 자료구조들을 어떻게 하면 친근하고 쉽게 표현할 수 있을지 고민을 하며 UI를 개발하였습니다.

개발 시에는 백엔드를 담당하는 사람들과 함께 협업을 하기 위해서, 커뮤니케이션을 하며 계속 분석 과정에서 추가되는 케이스에 대해 고려를 하였고 그에 맞도록 Front에서 표시되는 요소들을 추가하여 개발하였습니다. 분석 시에 필요한 UI들을 함수를 사용하여 컴포넌트화 시켜 개발하였고, 동작에 알맞는 UI 컴포넌트 함수들을 연결하여 개발을 진행하였습니다.



## Detail 

![image](https://user-images.githubusercontent.com/44183221/86325619-4aca6980-bc7b-11ea-96a8-940e93277e9d.png) 
