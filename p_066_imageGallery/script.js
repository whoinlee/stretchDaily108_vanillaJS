const current = document.querySelector('#current');
const imgs = document.querySelector('.imgs');
const img = document.querySelectorAll('.imgs img');
const opacity = 0.6;
let selectedThumb  = img[0];

// Set first img opacity
selectedThumb.style.opacity = opacity;

imgs.addEventListener('click', imgClick);

function imgClick(e) {
    e.preventDefault();
    // Reset the opacity
    selectedThumb.style.opacity = 1;

    // Change current image to src of clicked image
    current.src = e.target.src;
    current.classList.value = "";

    // Add fade in class
    current.classList.add('fade-in');

  // Remove fade-in class after .5 seconds
//   setTimeout(() => current.classList.remove('fade-in'), 500);

  // Change the opacity to opacity var
  selectedThumb = e.target;
  selectedThumb.style.opacity = opacity;
}

for (let i=0; i<4; i++) {
    const newImg = document.createElement("img");
    newImg.setAttribute("src", "https://preview.ibb.co/gxVppG/img1.jpg")
    imgs.append(newImg);
}

console.log([...Array(5).keys()].map(x => x+1))
console.log(Array.from([1,2,3,4,5]))