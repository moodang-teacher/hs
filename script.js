// DateInfo 생성자 함수 정의
function DateInfo(year, month, day) {
  this.year = year;
  this.month = month;
  this.day = day;

  // Date 객체를 이용하여 요일 계산
  const today = new Date(year, month - 1, day); // month는 0부터 시작하므로 -1
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  this.weekday = daysOfWeek[today.getDay()];

  // 날짜 문자열 반환
  this.toString = function () {
    return `${this.year}-${String(this.month).padStart(2, '0')}-${String(this.day).padStart(2, '0')} (${this.weekday})`;
  };
}

// 현재 날짜 정보를 기준으로 초기화
let currentDate = new Date();
console.log(currentDate);

// HTML 요소 선택
const yesterdayBtn = document.getElementById('yesterdayBtn');
const tomorrowBtn = document.getElementById('tomorrowBtn');
const dateInfoDiv = document.getElementById('dateInfo');

// 날짜 정보를 업데이트하는 함수
function updateDateInfo() {
  const dateInfo = new DateInfo(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
  dateInfoDiv.textContent = dateInfo.toString();

  if (dateInfo.weekday === 'Saturday') {
    dateInfoDiv.style.color = 'blue';
  }
  if (dateInfo.weekday === 'Sunday') {
    dateInfoDiv.style.color = 'red';
  }
}

// 초기 날짜 정보 표시
updateDateInfo();

// 버튼 클릭 이벤트 핸들러
yesterdayBtn.addEventListener('click', () => {
  currentDate.setDate(currentDate.getDate() - 1);
  updateDateInfo();
});

tomorrowBtn.addEventListener('click', () => {
  currentDate.setDate(currentDate.getDate() + 1);
  updateDateInfo();
});

dateInfoDiv.addEventListener('mouseup', () => {
  currentDate.setDate(currentDate.getDate() + 1);
  updateDateInfo();
});
