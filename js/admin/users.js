const populateUser = (item, action = '') => {
    const user = {
        passporturl: item.passporturl,
        name: `${item.firstname} ${item.othername || ''} ${item.lastname}`,
        email: item.email,
        phonenumber: item.phonenumber,
        gender: item.gender || 'N/A',
        createdat: new Date(item.createdat).toLocaleString(),
    }
    const table = $('table tbody');
    let row;
    if (action === 'edit') {
        row = $(`#user-${item.id}`);
        row.innerHTML = '';
    } else {
        row = document.createElement('tr');
        row.id = `user-${item.id}`;
    }
    for (let prop in user) {
        const data = document.createElement('td');
        if (prop === 'passporturl') {
            const logo = document.createElement('img');
            logo.src = user[prop];
            data.append(logo);
        } else {
            data.innerHTML = user[prop];
        }
        row.append(data)
    }
    let makeAdmin = createElement('a', {
        href: 'javascript:;',
        innerHTML: `${item.isadmin ? 'Remove':'Make'} Admin`,
        class: ['btn', 'btn-gold', 'btn-sm']
    });
    makeAdmin.onclick = function () {
        adminModal(item)
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
    if (item.id !== getUser().id) {
        data.append(makeAdmin);
        data.append(deleteBtn);
    } else data.innerHTML = 'N/A';
    row.append(data)
    if (action === 'edit') return false;
    const emptyRow = table.querySelector('#emptyRow');
    if (emptyRow) emptyRow.remove();
    if (action === 'prepend') return table.prepend(row);
    table.append(row);
};

let users = [];
window.onload = async e => {
    $('.nav-link .user-icon').setAttribute('src', getUser().passporturl);
    const loader = new Loading($('.load'), 'dark big');
    loader.start();
    const response = await fetchCall('/users');
    users = response.data;
    if (!users || !users.length) setEmptyRow(7);
    loader.stop();
    users.forEach(item => {
        populateUser(item);
    });
}

const deleteUser = async (button, user) => {
    const loader = new Loading(button, 'sm');
    loader.start();
    const response = await fetchCall(`/users/${user.id}`, 'DELETE');
    loader.stop();
    if (response.status >= 400) {
        button.closest('.modal').querySelector('.alert.error').classList.add('show');
        button.closest('.modal').querySelector('.alert.error').innerHTML = response.error;
        return false;
    }
    users.pop(user);
    $(`#user-${user.id}`).remove();
    $('#dialogModal .modal-close').click()
}

const makeAdmin = async (button, user) => {
    const loader = new Loading(button, 'sm');
    loader.start();
    const response = await fetchCall('/users/make-admin', 'PATCH', {
        user: user.id,
        action: !user.isadmin,
    });
    loader.stop();
    if (response.status >= 400) {
        button.closest('.modal').querySelector('.alert.error').classList.add('show');
        button.closest('.modal').querySelector('.alert.error').innerHTML = response.error;
        return false;
    }
    users[users.indexOf(user)] = response.data;
    populateUser(response.data, 'edit');
    $('#dialogModal .modal-close').click()
}

const deleteModal = (user) => {
    triggerModal('dialogModal');
    $('#dialogModal .modal-title').innerHTML = `Delete User: ${user.firstname}?`;
    $('#dialogModal .text-red').innerHTML = 'Warning: This will delete all associated data.';
    $('#dialogModal .alert.error').classList.remove('show');
    $('#dialogModal button.delete').onclick = (e) => deleteUser(e.target, user);
}

const adminModal = (user) => {
    triggerModal('dialogModal');
    $('#dialogModal .modal-title').innerHTML = `${user.isadmin ? 'Remove':'Make'} User: ${user.firstname}, ${user.isadmin ? 'from':''} admin?`;
    $('#dialogModal .text-red').innerHTML = `Warning: User will ${user.isadmin ? 'loose':'have'} all privileges.`;
    $('#dialogModal .alert.error').classList.remove('show');
    $('#dialogModal button.delete').onclick = (e) => makeAdmin(e.target, user);
}