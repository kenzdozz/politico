
$('.toggle-modal', true).forEach(item => {
    item.addEventListener('click', function () {
        triggerModal(this.dataset.modal);
    })
});

const populateRecord = item => {
    const candidate = {
        logourl: item.logourl,
        name: `${item.firstname} ${item.lastname}`,
        result: item.result,
        office: item.officename
    }
    const table = $('table tbody');
    const row = document.createElement('tr');
    for (let prop in candidate) {
        const data = document.createElement('td');
        if (prop === 'logourl') {
            const logo = document.createElement('img');
            logo.src = candidate[prop];
            data.append(logo);
        } else {
            data.innerHTML = candidate[prop];
        }
        row.append(data)
    }
    table.append(row);

    const emptyRow = table.querySelector('#emptyRow');
    if (emptyRow) emptyRow.remove();
};


let candidates = [];
let offices = [];
window.onload = async e => {
    $('.nav-link .user-icon').setAttribute('src', getUser().passporturl);
    const loader = new Loading($('.table-responsive'), 'dark big');
    loader.start();
    const resOffice = await fetchCall('/offices/active');
    loader.stop();
    offices = resOffice.data;
    if (!offices || !offices.length) return setEmptyRow(4);
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
    $('table tbody').innerHTML = '';
    const loader = new Loading($('.table-responsive'), 'dark big');
    loader.start();
    const response = await fetchCall(`/office/${office.id}/result`);
    loader.stop();
    candidates = response.data;
    if (!candidates || !candidates.length) return setEmptyRow(4);
    candidates.sort((a, b) => (a.result > b.result) ? -1 : ((b.result > a.result) ? 1 : 0))
        .forEach(item => {
            populateRecord(item);
    });
}
