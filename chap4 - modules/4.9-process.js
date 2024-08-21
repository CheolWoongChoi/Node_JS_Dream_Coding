const process = require("process");

console.log(process.execPath);

/**
 * 이벤트 루프가 콜스택이 비었을 때, 태스크를 수행
 */
setTimeout(() => {
  console.log("setTimeout");
}, 0);

/**
 * 테스크 큐에 태스크를 맨 앞에 넣어줘
 */
process.nextTick(() => {
  console.log("nextTick");
});
