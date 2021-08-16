const tagsElement = document.getElementById('tags');
const textarea = document.getElementById('textarea');
textarea.focus();

textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value);

    if (e.key === 'Enter') {
        console.log("====== ENTER ======");
        setTimeout(() => {
            e.target.value = '';
        }, 10);
        randomSelect();
    }
})

function createTags(input) {
    // console.log(input);
    const tags = input.split(',').filter(tag => (
        tag.trim() !== '')).map(tag => tag.trim());
    // console.log(tags);
    tagsElement.innerHTML = '';//reset
    tags.forEach(item => {
        const tagEl = document.createElement('span');
        tagEl.classList.add('tag');
        tagEl.innerText = item;
        tagsElement.appendChild(tagEl);
    })
}

function randomSelect() {
    const times = 30;
    const intervalID = setInterval(() => {
        const randomTag = pickRandomTag();
        highlightTag(randomTag);
        setTimeout(() => {
            unhighlightTag(randomTag);
        }, 100);
    }, 100);

    setTimeout(() => {
        clearInterval(intervalID);
        const randomTag = pickRandomTag();
        highlightTag(randomTag);
    }, times * 100)
}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag');
    return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
    tag.classList.add('highlight');
}

function unhighlightTag(tag) {
    tag.classList.remove('highlight');
}
