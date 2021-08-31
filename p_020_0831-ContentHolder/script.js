const container = document.querySelector(".faq-container");
let selectedFaq;

const setupFAQs = async() => {
    // console.log("setupFAQs");

    //-- get data
    const res = await fetch('./data.json');  
    const faqData = await res.json();  //-- an array of objects
    if (faqData != null && faqData.length > 0) {
        faqData.forEach(item => {
            const faqElt = document.createElement("div");
            let attr = document.createAttribute("data-id");
            attr.value = item.id;
            faqElt.setAttributeNode(attr);
            faqElt.classList.add("faq");
            faqElt.innerHTML = `
                <!-- .faq-question -->
                <h3 class="faq-question">
                    ${item.question}
                </h3>
                <!-- .faq-answer -->
                <p class="faq-answer">
                    ${item.answer}
                </p>
                <!-- .faq-toggle-btn -->
                <button class="faq-toggle-btn">
                    <i class="fas fa-chevron-down"></i>
                    <i class="fas fa-times"></i>
                </button>
            `;
            const toggleBtn = faqElt.querySelector(".faq-toggle-btn");
            toggleBtn.addEventListener("click", toggleFAQ);
            container.appendChild(faqElt);
        });
      }
};

const toggleFAQ = (e) => {
    // console.log("toggleFAQ");
    e.preventDefault();
    
    const element = e.currentTarget.parentElement;  //-- .faq div
    //element.classList.toggle('active');

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