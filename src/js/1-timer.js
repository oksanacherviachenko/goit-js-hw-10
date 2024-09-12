
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const startButton = document.querySelector('button[data-start]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');
let selectedDate = null;
let timerId = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    selectedDate = selectedDates[0];

    if (selectedDate <= now) {
      iziToast.error({
        title: 'Error',
          message: 'Please choose a date in the future',
          backgroundColor: '#ef4040',
        position: 'topRight', 
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};


flatpickr("#datetime-picker", options);


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}


function startTimer() {
  timerId = setInterval(() => {
    const now = new Date();
    const timeDifference = selectedDate - now;

    if (timeDifference <= 0) {
      clearInterval(timerId);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      iziToast.success({
        title: 'Success',
          message: 'Countdown finished!',
          background: '#59a10d',
        position: 'topRight',
      });
      startButton.disabled = true;
      document.querySelector('#datetime-picker').disabled = false;
      return;
    }

    const timeLeft = convertMs(timeDifference);
    updateTimerDisplay(timeLeft);
  }, 1000);

  startButton.disabled = true;
  document.querySelector('#datetime-picker').disabled = true;
}

startButton.addEventListener('click', startTimer);
