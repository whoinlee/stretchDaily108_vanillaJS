const imgContainer = document.querySelector('.container');
const loader = document.querySelector('.loader');
const unsplashURL = 'https://source.unsplash.com/random/';
const getRandomNum = () => Math.floor(Math.random() * 10) + 300;
const getRandomSize = () => `${getRandomNum()}x${getRandomNum()}`;

const rows = 5;
const cols = 3;

const loadImages = () => {
    for(let i = 0; i < rows * cols; i++) {
        const imgElt = document.createElement('img');
        imgElt.src = `${unsplashURL}${getRandomSize()}`;
        imgContainer.appendChild(imgElt);
    }
}

function showLoader() {
    loader.classList.add('show');

    setTimeout(() => {
        loader.classList.remove('show');

        setTimeout(() => {
            loadImages();
        }, 300);
    }, 1000);
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement; //******/
    if (scrollHeight - scrollTop === clientHeight) {
        showLoader();
    }
});

loadImages();