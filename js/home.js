
let slideIndex = 2;
setInterval(() => {
    for (let slide of $('.slide', true)) {
        slide.classList.remove('show');
        console.log(slide)
    }
    $('#slide-' + slideIndex).classList.add('show');
    slideIndex = slideIndex == 3 ? 1 : slideIndex + 1;
}, 2500);