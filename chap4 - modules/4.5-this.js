/**
 * 함수
 *
 * 함수에서는 this가 global과 동일
 */
function hello() {
  console.log(this === global);
}
hello();

/**
 * 클래스
 *
 * 클래스 메서드 안의 this는 클래스 인스턴스를 가리킴
 */
class A {
  constructor(num) {
    this.num = num;
  }
  memberFunction() {
    console.log("----- class -----");
    console.log(this);
    console.log(this === global);
  }
}

const a = new A(1);
a.memberFunction();

/**
 * 전역 범위
 *
 * 전역 범위에서 this는 module.exports를 가리킴
 */
console.log("----- global scope -----");
console.log(this);
console.log(this === module.exports);
