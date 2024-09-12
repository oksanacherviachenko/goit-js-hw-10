import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const delay = parseInt(delayInput.value);
  if (isNaN(delay) || delay < 0) {
    iziToast.error({
      title: '❌ Error',
      message: 'Please enter a valid delay in milliseconds',
      position: 'topRight',
      backgroundColor: '#ef4040',
      class: 'custom-toast',  
    });
    return;
  }

  const selectedState = form.querySelector('input[name="state"]:checked');
  if (!selectedState) {
    iziToast.error({
      title: '❌ Error',
      message: 'Please select a state',
      position: 'topRight',
      backgroundColor: '#ef4040',
      class: 'custom-toast',  
    });
    return;
  }
  const state = selectedState.value;

  createPromise(delay, state)
    .then((result) => {
      iziToast.success({
        title: '✅ Success',
        message: `Fulfilled promise in ${result}ms`,
        position: 'topRight',
        backgroundColor: '#59a10d',
        class: 'custom-toast',  
      });
    })
    .catch((error) => {
      iziToast.error({
        title: '❌ Error',
        message: `Rejected promise in ${error}ms`,
        position: 'topRight',
        backgroundColor: '#ef4040',
        class: 'custom-toast', 
      });
    });
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

