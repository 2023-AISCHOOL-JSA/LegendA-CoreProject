// // const arenaSocket = io("/CodeArena"); // 이미 codeArenaList에서 선언
// const $c_main_content = $chat_main.querySelector(".c_main_content"); // 채팅 내용이 들어갈 곳
// const $c_chatting = $chat_main.querySelector(".c_chatting"); // 채팅작성 및 전송
// const $c_chatting_form = $c_chatting.querySelector(".c_chatting_form"); // 채팅 작성 form
// const $form_input = $c_chatting_form.querySelector("#form_input"); // 채팅 작성 form의 input
// const $c_chatting_2 = $c_chatting_form.querySelector(".c_chatting_2")
// const $c_chatting_2_btn = $c_chatting_2.querySelector(".c_chatting_2_btn")
// const $c_a_u_r_name2 = document.querySelector(".c_a_u_r_name2")

// // 공지
// const addNotice = (message) => {
//   console.log("addNotice 함수 실행");
//   const $div = document.createElement("div");
//   console.log("message : ", message);
//   $div.textContent = message;
//   $c_main_content.appendChild($div);
// };

// const handleMessageSubmit = (event) => {
//   // alert(console.log("handleMessageSubmit 함수 실행"))
//   // event.preventDefault();
//   // const message = $form_input.value; // 메시지 입력값 가져오기
//   // console.log("메세지 핸들러, 메세지 : ", message);
//   // console.log("userInfo : ", currentNickname);

//   // arenaSocket.emit(
//   //   "new_message",
//   //   {currentNickname, message: message}
//   // )

//   // $form_input.value = ""; // 입력 창 초기화
// };
// // ---------------함수 정의 끝------------------

// arenaSocket.on("connect", () => {
//   console.log("프론트와 서버와의 연결 성공");
// });

// arenaSocket.on("new_message", ({ currentNickname, message }) => {
//   console.log("new_message이벤트 프론트에서 받음");
//   const $div = document.createElement("div");
//   $div.textContent = `${currentNickname} : ${message}`
//   $c_main_content.appendChild($div);

//   // Chat.sendMessage(currentNickname, message);
// });

// // 프론트로 온 이벤트 감지
// arenaSocket.onAny((event) => {
//   console.log(`arenaSocket Event: ${event}`);
// });

// arenaSocket.on("welcome", ({nickname}) => {
//   console.log("프론트 welcome 옴");
//   console.log("nickname : ",nickname);
//   // $user_count.textContent = `${user_count}명`;
//   addNotice(`${nickname}(이)가 방에 입장했습니다.`);
//   // setUserCount(user_count);
// });

// arenaSocket.on("user_count", ({ user_count }) => {
//   console.log(`user_count 이벤트의 사용자 수: ${user_count}`);
//   $c_content_num.textContent = `${user_count}`;
// });

// arenaSocket.on("bye", ({currentNickname}) => {
//   console.log("프론트 bye이벤트 옴");
//   console.log(`${currentNickname}은 방을 나갔습니다. `);
//   addNotice(`${currentNickname}(이)가 방에서 나갔습니다.`);
// });

// $c_chatting_2_btn.addEventListener("click", handleMessageSubmit);

// --------------------------------------------------------------------------------------------------------------------------

// 움직이는 모달
$(document).on("ready", () => {
  //모달 움직이게 하려면, draggable(); 하면 된다.
  $("#c_content_move button").draggable();
});

// 전송 버튼 ENTER 키 기능
function susubmit(f) {
  if (f.keyCode == 13) {
    $c_chatting_form.submit();
  }
}
// textarea -> 줄바꿈_Shift+Enter 버튼 실행
// $(function () {
//   $("textarea").on("keydown", function (event) {
//     if (event.keyCode == 13)
//       if (!event.shiftKey) {
//         event.preventDefault();
//         $("#testForm").submit();
//       }
//   });
// });

// 채팅 내용 왔다리 갔다리
const Chat = (function () {
  let myName = "blue"; // 사용자 이름

  // init 함수
  function init() {
    // enter 키 이벤트
    $(document).on("keydown", "c_chatting_1 textarea", function (e) {
      if (e.keyCode == 13 && !e.shiftKey) {
        e.preventDefault();
        const message = $(this).val();

        // 메시지 전송
        sendMessage(message);
        // 입력창 clear
        clearTextarea();
      }
    });
  }

  // 메세지 태그 생성
  function createMessageTag(LR_className, senderName, message) {
    // 형식 가져오기
    let chatLi = $("div.chat1.format ul li").clone();

    // 값 채우기
    chatLi.addClass(LR_className);
    chatLi.find(".sender span").text(senderName);
    chatLi.find(".message span").text(message);

    return chatLi;
  }

  // 메세지 태그 append
  function appendMessageTag(LR_className, senderName, message) {
    const chatLi = createMessageTag(LR_className, senderName, message);

    $("div.chat:not(.format) ul").append(chatLi);

    // 스크롤바 아래 고정
    $("div.chat1").scrollTop($("div.chat1").prop("scrollHeight"));
  }

  // 메세지 전송
  function sendMessage(nickname, message) {
    console.log("sendMessage 함수 활성화");
    // 서버에 전송하는 코드로 후에 대체
    const data = {
      senderName: nickname,
      message: message,
    };

    // 통신하는 기능이 없으므로 여기서 receive
    resive(data);
  }

  // 메세지 입력박스 내용 지우기
  function clearTextarea() {
    $("c_chatting_1 textarea").val("");
  }

  // 메세지 수신
  function resive(data) {
    const LR = data.senderName != myName ? "left" : "right";
    appendMessageTag("right", data.senderName, data.message);
  }

  return {
    init: init,
  };
})();

$(function () {
  Chat.init();
});


  // 1. 팝업창 열기
  $(document).on("click", ".chat_open", (e) => {
    console.log("팝업창 열기");
    $("#chat").css("display", "block");
  });

  // 1. 팝업창 닫기
  $(document).on("click", ".c_content_close button", (e) => {
    console.log("팝업창 닫기");
    $("#chat").css("display", "none");
  });

  // 2. chat 축소판 다시 열기
  $(document).on("click", ".c_content_mini_btn", (e) => {
    console.log("팝업창 키우기");
    $("#chat_mini").css("display", "flex");
    $("#chat").css("display", "none");
  });

  // 2. chat 축소판 닫기
  $(document).on("click", ".chat_mini_1_2btn", (e) => {
    console.log("팝업창 줄이기");
    $("#chat_mini").css("display", "none");
    $("#chat").css("display", "block");
  });

  