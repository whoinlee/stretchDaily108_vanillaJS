//-- copyright year
const date = document.getElementById("date"); //  span.#date
date.innerHTML = new Date().getFullYear();

//-- nav menu
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links"); // ul.links
// const linksHeight = links.getBoundingClientRect().height;
// const containerHeight = linksContainer.getBoundingClientRect().height;
//-- hamburger menu
const navToggle = document.querySelector(".nav-toggle");
navToggle.addEventListener("click", function () {
  const linksHeight = links.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  // console.log("linksHeight:", linksHeight);
  // console.log("containerHeight:", containerHeight);
  //-- toggle height
  linksContainer.style.height = (containerHeight === 0)? `${linksHeight}px` : 0;
});

//-- sticky(fixed) nav bar 
const navbar = document.getElementById("nav");
//-- back-home arrow btn
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
  //-- toggle topLink
  if (scrollHeight > 500) {
    // console.log("scrollHeight > 500");
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

// ********** smooth scroll ************
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    //-- navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1); //-- after #
    const element = document.getElementById(id);
    //
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    //--close
    linksContainer.style.height = 0;
  });
});