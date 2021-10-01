const park = document.querySelector(".park");
const tabs = document.querySelectorAll(".tab-btn");
const articles = document.querySelectorAll(".content");

park.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (id) {
    tabs.forEach(tab => tab.classList.remove("active"));
    e.target.classList.add("active");

    articles.forEach(article => article.classList.remove("active"));
    const selectedArticle = document.getElementById(id);
    selectedArticle.classList.add("active");
  }
});