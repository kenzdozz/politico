const populateParty = (item, action = '') => {
    const party = {
        logourl: item.logourl,
        name: item.name,
        acronym: item.acronym,
        hqaddress: item.hqaddress,
    }
    const table = $('table tbody');
    let row;
    if (action === 'edit') {
        row = $(`#party-${item.id}`);
        row.innerHTML = '';
    } else {
        row = document.createElement('tr');
        row.id = `party-${item.id}`;
    }
    for (let prop in party) {
        const data = document.createElement('td');
        if (prop === 'logourl') {
            const logo = document.createElement('img');
            logo.src = party[prop];
            data.append(logo);
        } else {
            data.innerHTML = party[prop];
        }
        row.append(data)
    }
    let editBtn = createElement('a', {
        href: 'javascript:;',
        innerHTML: 'Edit',
        class: ['btn', 'btn-green', 'btn-sm']
    });
    editBtn.onclick = function () {
        editModal(item)
    };
    let deleteBtn = createElement('a', {
        href: 'javascript:;',
        innerHTML: 'Delete',
        class: ['btn', 'btn-red', 'btn-sm']
    });
    deleteBtn.onclick = function () {
        deleteModal(item)
    };
    let data = document.createElement('td');
    data.append(editBtn);
    data.append(deleteBtn);
    row.append(data)
    if (action === 'edit') return false;
    const emptyRow = table.querySelector('#emptyRow');
    if (emptyRow) emptyRow.remove();
    if (action === 'prepend') return table.prepend(row);
    table.append(row);
};

let parties = [];
window.onload = async e => {
    $('.nav-link .user-icon').setAttribute('src', getUser().passporturl);
    const loader = new Loading($('.load'), 'dark big');
    loader.start();
    const response = await fetchCall('/parties');
    parties = response.data;
    if (!parties || !parties.length) setEmptyRow(5);
    loader.stop();
    parties.forEach(item => {
        populateParty(item);
    });
}

$('#manageParty form').onsubmit = async function (event) {
    formInputListener(this);
    const isEdit = this.dataset.id ? true : false;
    const partyRules = [{
            name: 'name',
            rule: 'required',
            message: 'Party name is required.',
        },
        {
            name: 'hqaddress',
            rule: 'required',
            message: 'Headquater address is required.',
        },
    ];
    if (!isEdit) partyRules.push({
        name: 'logo',
        rule: 'file',
        message: 'Logo is required - jpg or png.',
    });
    const valid = validateInput(this, partyRules);
    const submitBtn = this.querySelector('button[type=submit]');
    const loader = new Loading(submitBtn, 'sm');
    loader.start();
    event.preventDefault();
    if (!valid) return loader.stop();
    const formData = getFormData(this);
    const fileInput = this.querySelector('input[type="file"]');
    if (fileInput && fileInput.files[0])
        formData.append('logo', fileInput.files[0]);
    const url = isEdit ? `/parties/${this.dataset.id}` : '/parties';
    const response = await fetchCall(url, isEdit ? 'PATCH' : 'POST', formData, true);
    loader.stop();
    if (!response.status || response.status >= 400) return handleFieldErrors(this, response);
    if (isEdit) {
        const index = parties.indexOf(parties.find(item => item.id = this.dataset.id));
        parties[index] = response.data;
    } else parties.unshift(response.data);
    populateParty(response.data, isEdit ? 'edit' : 'prepend');
    $('#manageParty .modal-close').click()
}

const editModal = (party) => {
    triggerModal('manageParty');
    const mParty = $('#manageParty');
    mParty.querySelector('.modal-title').innerHTML = 'Edit a Party';
    mParty.querySelector('button[type=submit]').innerHTML = 'Save';
    const mpForm = mParty.querySelector('form');
    mpForm.dataset.id = party.id;
    mpForm['name'].value = party.name;
    mpForm['acronym'].value = party.acronym;
    mpForm['hqaddress'].value = party.hqaddress;
    mpForm.querySelector('.upload-image').classList.add('uploaded');
    mpForm.querySelector('.upload-image img.upload').setAttribute('src', party.logourl);
}

const deleteParty = async (button, party) => {
    const loader = new Loading(button, 'sm');
    loader.start();
    const response = await fetchCall(`/parties/${party.id}`, 'DELETE');
    loader.stop();
    if (response.status >= 400) {
        button.closest('.modal').querySelector('.alert.error').classList.add('show');
        button.closest('.modal').querySelector('.alert.error').innerHTML = response.error;
        return false;
    }
    parties.pop(party);
    if (!parties.length) setEmptyRow();
    $(`#party-${party.id}`).remove();
    $('#dialogModal .modal-close').click()
}

const deleteModal = (party) => {
    triggerModal('dialogModal');
    $('#dialogModal .modal-title').innerHTML = `Delete Party: ${party.name}?`;
    $('#dialogModal .alert.error').classList.remove('show');
    $('#dialogModal button.delete').onclick = (e) => deleteParty( e.target, party);
}

$('.toggle-modal', true).forEach(item => {
    item.addEventListener('click', function () {
        triggerModal(this.dataset.modal)
        $('#' + this.dataset.modal).querySelector('.modal-title').innerHTML = 'Create a Party';
    })
});
