const html = document.querySelector('html')
const toggleBtn = document.getElementById('themeToggleBtn');
const hourEl = document.querySelector('.hour')
const minuteEl = document.querySelector('.minute')

toggleBtn.addEventListener('click', (e) => {
    // console.log("onClick");
    
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        e.target.innerHTML = 'Dark Mode';
        e.target.classList.remove('light');   
        hourEl.classList.remove('light');
        minuteEl.classList.remove('light');
    } else {
        html.classList.add('dark');
        e.target.innerHTML = 'Light Mode';
        e.target.classList.add('light');
        hourEl.classList.add('light'); 
        minuteEl.classList.add('light'); 
    }
});