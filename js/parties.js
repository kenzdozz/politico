const populateParty = (item, action = '') => {
    const politicians = $('div .politicians');
    const politician = createElement('div', { class: ['politician', 'party'] });
    politician.id = `party-${item.id}`;
    const pCard = createElement('div', { class: ['card'] });
    const logo = createElement('img', { class: ['user-img'], alt: 'Party Logo' });
    logo.src = item.logourl;
    const pDetails = createElement('div', { class: ['details'] });
    const pName = createElement('p', { class: ['name'] });
    pName.append(item.name);
    const pAcronym = createElement('p', { class: ['office'] });
    pAcronym.append(item.acronym);
    const pAddress = createElement('p', { class: ['address'] });
    pAddress.append(item.hqaddress);
    pDetails.append(pName);
    pDetails.append(pAcronym);
    pDetails.append(pAddress);
    pCard.append(logo);
    pCard.append(pDetails);
    politician.append(pCard);
    politicians.append(politician)

    const emptyRow = politicians.querySelector('#emptyRow');
    if (emptyRow) emptyRow.remove();
};

const setEmpty = () => {
    const politicians = $('.politicians');
    const data = createElement('p', { class: ['text-center', 'w-100'] });
    data.id = 'emptyRow';
    data.innerHTML = 'No parties found.';
    politicians.append(data);
}

let parties = [];
window.onload = async e => {
    $('.nav-link .user-icon').setAttribute('src', getUser().passporturl);
    const loader = new Loading($('.politicians'), 'dark big');
    loader.start();
    const response = await fetchCall('/parties');
    parties = response.data;
    if (!parties || !parties.length) setEmpty();
    loader.stop();
    parties.forEach(item => {
        populateParty(item);
    });
}


$('.toggle-modal', true).forEach(item => {
    item.addEventListener('click', function () {
        triggerModal(this.dataset.modal);
    })
});
