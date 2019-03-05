
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
    const aClass = ['btn', 'voted', 'btn-green'];
    const voteBtn = createElement('a', { href: 'javascript:;', class: aClass, innerHTML: 'Vote' });
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
window.onload = async e => {
    $('.nav-link .user-icon').setAttribute('src', getUser().passporturl);
    const loader = new Loading($('.politicians'), 'dark big');
    loader.start();
    const response = await fetchCall('/votes/user');
    loader.stop();
    candidates = response.data;
    if (!candidates || !candidates.length)
        return $('.politicians').innerHTML = '<p class="text-center w-100">No records found.</p>';
    candidates.forEach(item => {
        populateRecord(item);
    });
}
