document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('comment-post-content');
    const actions = document.getElementById('comment-actions');
    const cancelBtn = document.getElementById('cancelBtn');

    textarea.addEventListener('focus', () => {
        actions.classList.remove('hidden');
    });


    textarea.addEventListener('blur', () => {
        if (textarea.value === '') { 
            actions.classList.add('hidden');
        }
    });

    cancelBtn.addEventListener('click', () => {
        actions.classList.add('hidden'); 
        textarea.value = ''; 
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.querySelector("#comment-post-content");
    textarea.addEventListener('input', autoResize, false);

    function autoResize() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    }
});



// document.addEventListner('DOMContentLoaded', () => {
//     const auto_grow = document.getElementById('comment-post-content');

//     auto_grow.style.height = "5px"
//     auto_grow.style.height = (auto_grow.scrollHeight) + "px"
// })

// function auto_grow(element) {
//     element.style.height = "5px";
//     element.style.height = (element.scrollHeight) + "px";
//   }