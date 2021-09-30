const toggleBtn = document.getElementById("toggleBtn");
const closeBtn = document.getElementById("closeBtn");
const sideBar = document.getElementById("sideBar");

toggleBtn.addEventListener("click",  () => {
  console.log("ever?")
  sideBar.classList.toggle("show-sidebar")
});

closeBtn.addEventListener("click", () =>
  sideBar.classList.remove("show-sidebar")
);