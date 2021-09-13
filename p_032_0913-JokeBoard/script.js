const jokeEl = document.getElementById('jokeHolder');
const jokeBtn = document.getElementById('jokeBtn');

jokeBtn.addEventListener('click', generateJoke);

function fadeIn(el, time) {
    el.style.opacity = 0;
  
    var last = +new Date();
    var tick = function() {
      el.style.opacity = +el.style.opacity + (new Date() - last) / time;
      last = +new Date();
  
      if (+el.style.opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      }
    };
  
    tick();
}

async function generateJoke() {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  }    //***** */
  const res = await fetch('https://icanhazdadjoke.com', config);
  const data = await res.json();
  jokeEl.innerHTML = data.joke;
  fadeIn(jokeEl, 1000)
};



generateJoke();