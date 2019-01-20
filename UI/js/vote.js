
const goTo = document.querySelector('.goto');
const distanceTop = goTo.offsetTop;
window.onscroll = function () {
    if (window.pageYOffset > distanceTop) {
        goTo.classList.add('fix');
        goTo.previousElementSibling.classList.add('mb-52');
    } else {
        goTo.classList.remove('fix');
        goTo.previousElementSibling.classList.remove('mb-52');
    }
}

$('.toggle-modal', true).forEach(item => {
    item.addEventListener('click', function () {
        triggerModal(this.dataset.modal);
    })
});
