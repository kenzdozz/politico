
const dialogModal = (item, isDelete = false) => (e) => {
    triggerModal('dialogModal');
    const modal = $('#dialogModal');
    const warning = isDelete ? 'Warning: This will delete all associated data.' : '';
    modal.querySelector('.text-red').innerHTML = warning;
    const title = isDelete ? 'Delete this candidate request?' : `Approve ${item.firstname} for ${item.officename}?`;
    modal.querySelector('.modal-title').innerHTML = title;
    modal.querySelector('button.btn-green').onclick = isDelete ? deleteCandidate(item) : approveCandidate(item);
}


const populateCandidate = (item, action = '') => {
    const candidate = {
        office: item.officename,
        name: `${item.firstname} ${item.lastname}`,
        party: item.partyname,
    }
    const table = $('table tbody');
    let row = createElement('tr', {
        id: `candidate-${item.id}`
    });
    for (let prop in candidate) {
        let data = document.createElement('td');
        data.innerHTML = candidate[prop];
        row.append(data)
    }
    let approveBtn = createElement('a', {
        href: 'javascript:;',
        innerHTML: 'Approve',
        class: ['btn', 'btn-green', 'btn-sm']
    });
    approveBtn.onclick = dialogModal(item);
    let rejectBtn = createElement('a', {
        href: 'javascript:;',
        innerHTML: 'Delete',
        class: ['btn', 'btn-red', 'btn-sm']
    });
    rejectBtn.onclick = dialogModal(item, true);
    let data = document.createElement('td');
    if (!item.approved) data.append(approveBtn);
    data.append(rejectBtn);
    row.append(data)
    table.append(row);
};

let candidates = [];
window.onload = async e => {
    $('.nav-link .user-icon').setAttribute('src', getUser().passporturl);
    const loader = new Loading($('.load'), 'dark big');
    loader.start();
    const response = await fetchCall('/candidates/all');
    candidates = response.data;
    if (!candidates || !candidates.length) setEmptyRow(4);
    loader.stop();
    candidates.forEach(item => {
        populateCandidate(item);
    });
}

const deleteCandidate = candidate => async (e) => {
    const button = e.target;
    const loader = new Loading(button, 'sm');
    loader.start();
    const response = await fetchCall(`/candidates/${candidate.id}`, 'DELETE');
    loader.stop();
    if (!response || !response.status || response.status >= 400) {
        button.closest('.modal').querySelector('.alert.error').classList.add('show');
        button.closest('.modal').querySelector('.alert.error').innerHTML = response.error || 'Error occurred.';
        return false;
    }
    candidates.pop(candidate);
    if (!candidates.length) setEmptyRow(4);
    $(`#candidate-${candidate.id}`).remove();
    $('#dialogModal .modal-close').click()
}

const approveCandidate = item => async (e) => {
    const loader = new Loading(e.target, 'sm');
    loader.start();
    const response = await fetchCall(`/office/${item.candidate}/register`, 'POST', {
        office: item.office,
    });
    loader.stop();
    if (response.status >= 400) {
        button.closest('.modal').querySelector('.alert.error').classList.add('show');
        button.closest('.modal').querySelector('.alert.error').innerHTML = response.error;
        return false;

    }
    candidates[candidates.find(candid => candid.id === item.id)] = response.data;
    $(`#candidate-${item.id}`).querySelector('.btn-green').remove();
    $('#dialogModal .modal-close').click()
}
