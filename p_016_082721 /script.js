const toggleBtn = document.getElementById('themeToggleBtn');
// console.log("toggleButton? ", toggleBtn);

toggleBtn.addEventListener('click', (e) => {
    // console.log("onClick");
    const html = document.querySelector('html')
    if (html.classList.contains('dark')) {
        html.classList.remove('dark')
        e.target.innerHTML = 'Dark Mode'
    } else {
        html.classList.add('dark')
        e.target.innerHTML = 'Light Mode'
    }
});