const counterHolder = document.querySelector('.counter');
const finalHolder = document.querySelector('.final');
const nums = document.querySelectorAll('.nums span');
const replayBtn = document.querySelector('#replay');

runAnimation();

function resetDOM() {
    counterHolder.classList.remove('hide')
    finalHolder.classList.remove('show')

  nums.forEach((num) => {
    num.classList.value = ''
  })

  nums[0].classList.add('in')
}

function runAnimation() {
  nums.forEach((num, idx) => {
    const nextToLast = nums.length - 1

    num.addEventListener('animationend', (e) => {
      if (e.animationName === 'goIn' && idx !== nextToLast) {
        num.classList.remove('in')
        num.classList.add('out')
      } else if (e.animationName === 'goOut' && num.nextElementSibling) {
        num.nextElementSibling.classList.add('in')
      } else {
        counterHolder.classList.add('hide')
        finalHolder.classList.add('show')
      }
    })
  })
}

replayBtn.addEventListener('click', () => {
  resetDOM()
  runAnimation()
})