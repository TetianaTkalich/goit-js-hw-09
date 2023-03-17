function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId;

const onClickStart = () => {
  timerId = setInterval(() => {
    const color = getRandomHexColor();
    body.style.backgroundColor = color;
    buttonStart.disabled = true;
  }, 1000);
};

const onClickStop = () => {
  clearInterval(timerId);
  buttonStart.disabled = false;
};

buttonStart.addEventListener('click', onClickStart);
buttonStop.addEventListener('click', onClickStop);
