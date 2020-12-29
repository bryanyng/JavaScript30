let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time');


function timer(s) {
  // clear current timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + s * 1000;
  displayTimeLeft(s);
  displayEndTime(then)

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if need to stop
    if(secondsLeft <= 0) {
      clearInterval(countdown)
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(s) {
  const mins = Math.floor(s / 60);
  const remainderSeconds = s % 60;
  const display = `${mins}:${remainderSeconds < 10 ? '0': ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(ts) {
  const end = new Date(ts);
  const hour = end.getHours();
  const mins = end.getMinutes();
  // const adjustedHour = hour > 12 ? hour - 12 : hour;
  endTimeDisplay.textContent = `Be Back At ${hour}:${mins}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(btn => btn.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});