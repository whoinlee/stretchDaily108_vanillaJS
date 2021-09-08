const loveMe = document.querySelector('.loveMe')
const times = document.getElementById('times')

let clickTime = 0
let timesClicked = 0

loveMe.addEventListener('click', (e) => {
  console.log("click!!!")
    if(clickTime === 0) {
      //-- first click
        clickTime = new Date().getTime()
    } else {
        if((new Date().getTime() - clickTime) < 800) {
          //-- if double clicked within less than .8 sec
            createHeart(e)
            clickTime = 0
        } else {
          //-- reset to the fist click
            clickTime = new Date().getTime()
        }
    }
})

const createHeart = (e) => {
    const heart = document.createElement('i'); //-- icon
    heart.classList.add('fas')//
    heart.classList.add('fa-heart')//

    const x = e.clientX; //*** mouseX location*/
    const y = e.clientY; //*** mouseY location*/

    const leftOffset = e.target.offsetLeft
    const topOffset = e.target.offsetTop

    const xInside = x - leftOffset
    const yInside = y - topOffset

    heart.style.top = `${yInside}px`
    heart.style.left = `${xInside}px`

    loveMe.appendChild(heart)

    times.innerHTML = ++timesClicked

    setTimeout(() => heart.remove(), 1000)
}