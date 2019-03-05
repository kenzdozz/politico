
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

const populateRecord = item => {
    const politicians = $('div .politicians');
    const politician = createElement('div', { class: ['politician'] });
    politician.id = `candidate-${item.id}`;
    const pCard = createElement('div', { class: ['card'] });
    const partyLogo = createElement('img', { class: ['party-logo'], alt: 'Party Logo' });
    partyLogo.src = item.logourl;
    const userImage = createElement('img', { class: ['user-img'], alt: 'Politician image' });
    userImage.src = item.passporturl;
    const pDetails = createElement('div', { class: ['details'] });
    const pName = createElement('p', { class: ['name'] });
    pName.append(`${item.firstname} ${item.lastname}`);
    const office = createElement('p', { class: ['office'] });
    const result = createElement('p', {
        class: ['result'],
        innerHTML: `<strong ${item === winner ? 'class="winner"':''}>
            ${item.result}</strong> vote${item.result > 1 ? 's' : ''}`
    });
    office.append(item.officename);
    if (item === winner) {
        const award = createElement('img', { src: './images/winner.png' });
        pDetails.append(award);
    }
    pDetails.append(pName);
    pDetails.append(office);
    pDetails.append(result);
    pCard.append(partyLogo);
    pCard.append(userImage);
    pCard.append(pDetails);
    politician.append(pCard);
    politicians.append(politician)

    const emptyRow = politicians.querySelector('#emptyRow');
    if (emptyRow) emptyRow.remove();
};


let candidates = [];
let offices = [];
let winner = null;
window.onload = async e => {
    $('.nav-link .user-icon').setAttribute('src', getUser().passporturl);
    const loader = new Loading($('.politicians'), 'dark big');
    loader.start();
    const resOffice = await fetchCall('/offices/active');
    loader.stop();
    offices = resOffice.data;
    if (!offices || !offices.length)
        return $('.politicians').innerHTML = '<p class="text-center w-100">No records found.</p>';
    offices.forEach(office => {
        const anchor = createElement('a', {
            innerHTML: office.name,
            href: 'javascript:;',
            class: ['btn', 'btn-sm', 'btn-outline'],
        });
        anchor.onclick = loadCandidates(office);
        $('div.goto').append(anchor);
        if (office === offices[0]) anchor.click();
    });
}

const loadCandidates = office => async e => {
    const goBtn = e.target;
    if (goBtn.classList.contains('btn-green')) return;
    const activeBtn = goBtn.parentElement.querySelector('.btn-green')
    if (activeBtn) activeBtn.classList.remove('btn-green');
    goBtn.classList.add('btn-green');
    $('.politicians').innerHTML = '';
    $('.pol-office').innerHTML = office.name;
    const loader = new Loading($('.politicians'), 'dark big');
    loader.start();
    const response = await fetchCall(`/office/${office.id}/result`);
    loader.stop();
    candidates = response.data;
    if (!candidates || !candidates.length)
        return $('.politicians').innerHTML = '<p class="text-center w-100">No records found.</p>';
    winner = candidates.reduce(function(a, b) {
        return a.result > b.result ? a 
            : (a.result === b.result) ? {} : b;
    });
    candidates.forEach(item => {
        populateRecord(item);
    });
}
