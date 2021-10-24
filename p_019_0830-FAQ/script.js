const container = document.querySelector(".faq-container");

const setupFAQs = async() => {
    //-- get data
    const res = await fetch('./data.json');  
    const faqData = await res.json();  //-- an array of objects
    if (faqData && faqData.length > 0) {
        container.innerHTML = faqData.map(item => `
            <div data-id=${item.id} class="faq">
                <h3 class="faq-question">
                    ${item.question}
                </h3>
                <p class="faq-answer">
                    ${item.answer}
                </p>
                <button class="faq-toggle-btn">
                    <i class="fas fa-chevron-down"></i>
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
        const toggleBtns = container.querySelectorAll(".faq-toggle-btn");
        toggleBtns.forEach(toggleBtn => toggleBtn.addEventListener("click", toggleFAQ));
    }
};

let selectedFaq;
const toggleFAQ = (e) => {
    e.preventDefault();
    
    const element = e.currentTarget.parentElement;  //-- .faq div
    if (element.classList.contains("active")) {
        element.classList.remove("active");
        selectedFaq = null;
    } else {
        element.classList.add("active");
        if (selectedFaq) selectedFaq.classList.remove("active");
        selectedFaq = element;
    }
}

setupFAQs();