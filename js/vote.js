
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
    });
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
    const aClass = ['btn'];
    if (typeof voted === 'object'){
        aClass.push('voted');
        if (voted.candidate === item.id) aClass.push('btn-green');
        else aClass.push('btn-gray');
    }
    const voteBtn = createElement('a', { href: 'javascript:;', class: aClass, innerHTML: 'Vote' });
    voteBtn.onclick = voteCandidate(item);
    office.append(item.officename);
    pDetails.append(pName);
    pDetails.append(office);
    pDetails.append(voteBtn);
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
let voted = null;
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
    const response = await fetchCall(`/candidates/${office.id}/office`);
    loader.stop();
    candidates = response.data;
    voted = response.voted;
    if (!candidates || !candidates.length)
        return $('.politicians').innerHTML = '<p class="text-center w-100">No records found.</p>';
    candidates.forEach(item => {
        populateRecord(item);
    });
}

const voteCandidate = candidate => async e => {
    const loader = new Loading(e.target, 'sm dark');
    loader.start();
    const response = await fetchCall('/votes', 'POST', {
        office: candidate.office,
        candidate: candidate.id,
    });
    loader.stop();
    voted = response.data;
    if (!voted) {
        triggerModal('dialogModal');
        $('#dialogModal .text-red').innerHTML = response.error || 'Error occurred, reload page and try again.';
        return;
    };
    $('.politicians .btn', true).forEach(item => {
        if (item !== e.target) item.classList.add('voted', 'btn-gray');
    });
    e.target.classList.add('voted', 'btn-green');
}
