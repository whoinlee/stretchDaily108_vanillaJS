const hamburger = document.querySelector(".hamburger");
const mobile_menu = document.querySelector(".header .nav-bar .nav-list ul");
const menu_item = document.querySelectorAll(
  ".header .nav-bar .nav-list ul li a"
);
const header = document.querySelector(".header.container");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobile_menu.classList.toggle("active"); //-- location left changes, 0(show) & 100%(hide)
});

document.addEventListener("scroll", () => {
  var scroll_position = window.scrollY;
  if (scroll_position > 250) {
    // header.style.backgroundColor = "#29323c";
    header.style.backgroundColor = "#000";
  } else {
    header.style.backgroundColor = "transparent";
  }
});

menu_item.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobile_menu.classList.toggle("active");
  });
});

// ********** smooth scroll ************
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  //   link.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     //-- navigate to specific spot
  //     const id = e.currentTarget.getAttribute("href").slice(1); //-- after #
  //     const element = document.getElementById(id);
  //     //
  //     const navHeight = navbar.getBoundingClientRect().height;
  //     const containerHeight = linksContainer.getBoundingClientRect().height;
  //     const fixedNav = navbar.classList.contains("fixed-nav");
  //     let position = element.offsetTop - navHeight;
  //     if (!fixedNav) {
  //       position = position - navHeight;
  //     }
  //     if (navHeight > 82) {
  //       position = position + containerHeight;
  //     }
  //     window.scrollTo({
  //       left: 0,
  //       top: position,
  //     });
  //     //--close
  //     linksContainer.style.height = 0;
  //   });
});
