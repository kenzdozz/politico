const populateOffice = (item, action = '') => {
    const office = {
        name: item.name,
        type: item.type,
    }
    const table = $('table tbody');
    let row;
    if (action === 'edit') {
        row = $(`#office-${item.id}`);
        row.innerHTML = '';
    } else {
        row = document.createElement('tr');
        row.id = `office-${item.id}`;
    }
    for (let prop in office) {
        const data = document.createElement('td');
        data.innerHTML = office[prop];
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

let offices = [];
window.onload = async e => {
    $('.nav-link .user-icon').setAttribute('src', getUser().passporturl);
    const loader = new Loading($('.load'), 'dark big');
    loader.start();
    const response = await fetchCall('/offices');
    offices = response.data;
    if (!offices || !offices.length) setEmptyRow(3);
    loader.stop();
    offices.forEach(item => {
        populateOffice(item);
    });
}

$('#manageOffice form').onsubmit = async function (event) {
    formInputListener(this);
    const isEdit = this.dataset.id ? true : false;
    const officeRules = [{
            name: 'name',
            rule: 'required',
            message: 'Office name is required.',
        },
        {
            name: 'type',
            rule: 'required',
            message: 'Office type is required.',
        },
    ];
    const valid = validateInput(this, officeRules);
    const submitBtn = this.querySelector('button[type=submit]');
    const loader = new Loading(submitBtn, 'sm');
    loader.start();
    event.preventDefault();
    if (!valid) return loader.stop();
    const url = isEdit ? `/offices/${this.dataset.id}` : '/offices';
    const response = await fetchCall(url, isEdit ? 'PATCH' : 'POST', {
        name: this['name'].value,
        type: this['type'].value,
    });
    loader.stop();
    if (!response.status || response.status >= 400) return handleFieldErrors(this, response);
    if (isEdit) {
        const index = offices.indexOf(offices.find(item => item.id = this.dataset.id));
        offices[index] = response.data;
    } else offices.unshift(response.data);
    populateOffice(response.data, isEdit ? 'edit' : 'prepend');
    $('#manageOffice .modal-close').click()
}

const editModal = (office) => {
    triggerModal('manageOffice');
    const mOffice = $('#manageOffice');
    mOffice.querySelector('.modal-title').innerHTML = 'Edit a Office';
    mOffice.querySelector('button[type=submit]').innerHTML = 'Save';
    const mpForm = mOffice.querySelector('form');
    mpForm.dataset.id = office.id;
    mpForm['name'].value = office.name;
    mpForm['type'].value = office.type;
}

const deleteOffice = async (button, office) => {
    const loader = new Loading(button, 'sm');
    loader.start();
    const response = await fetchCall(`/offices/${office.id}`, 'DELETE');
    loader.stop();
    if (response.status >= 400) {
        button.closest('.modal').querySelector('.alert.error').classList.add('show');
        button.closest('.modal').querySelector('.alert.error').innerHTML = response.error;
        return false;
    }
    offices.pop(office);
    if (!offices.length) setEmptyRow();
    $(`#office-${office.id}`).remove();
    $('#dialogModal .modal-close').click()
}

const deleteModal = (office) => {
    triggerModal('dialogModal');
    $('#dialogModal .modal-title').innerHTML = `Delete Office: ${office.name}?`;
    $('#dialogModal .alert.error').classList.remove('show');
    $('#dialogModal button.delete').onclick = (e) => deleteOffice(e.target, office);
}

$('.toggle-modal', true).forEach(item => {
    item.addEventListener('click', function () {
        triggerModal(this.dataset.modal)
        $('#' + this.dataset.modal).querySelector('.modal-title').innerHTML = 'Create an Office';
    })
});