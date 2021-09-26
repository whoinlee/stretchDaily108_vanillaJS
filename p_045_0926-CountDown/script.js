const counterHolder = document.querySelector('.counter');
const finalHolder = document.querySelector('.final');
const nums = document.querySelectorAll('.nums span');
const replayBtn = document.querySelector('#replay');

function resetDOM() {
    counterHolder.classList.remove('hide');
    finalHolder.classList.remove('show');
    nums.forEach((numSpan) => {
        numSpan.classList.value = '';   //-- span
    })
    nums[0].classList.add('in');
}

//***********/
function runAnimation() {
    const lastIndex = nums.length - 1;
    nums.forEach((num, idx) => {
        //***** animationed event??? 
        num.addEventListener('animationend', (e) => {
            if (e.animationName === 'goIn' && idx !== lastIndex) {
                num.classList.remove('in');
                num.classList.add('out');
            } else if (e.animationName === 'goOut' && num.nextElementSibling) {
                num.nextElementSibling.classList.add('in'); //*****nextElementSibling */
            } else {//-- the last one
                counterHolder.classList.add('hide');
                finalHolder.classList.add('show');
            }
        });
    });
};

replayBtn.addEventListener('click', () => {
  resetDOM();
  runAnimation();
});

runAnimation();