import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('input#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');

buttonStart.disabled = true;
let timerId = null;

const options = {
  enableTime: true, //робить віконце доступним
  time_24hr: true, //відображає віконце у форматі 24 години
  defaultDate: new Date(), //дефолтне значення пікера при відкриванні сторінки
  minuteIncrement: 1, //крок на який змінюється значення
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      buttonStart.disabled = false;

      buttonStart.addEventListener('click', () => {
        timerId = setInterval(() => {
          if (selectedDates[0] - new Date() < 0) {
            clearInterval(timerId);
            return;
          }
          displayTimeout(selectedDates[0] - new Date());
        }, 1000);
      });
    }
  },
};

function displayTimeout(time) {
  const { days, hours, minutes, seconds } = convertMs(time);
  spanDays.textContent = addLeadingZero(days);
  spanHours.textContent = addLeadingZero(hours);
  spanMinutes.textContent = addLeadingZero(minutes);
  spanSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(input, options);
