
const editModal = (partyId) => {
    triggerModal('manageOffice');
    $('#manageOffice').querySelector('.modal-title').innerHTML = 'Edit an office';
}
const deleteModal = (partyId) => {
    triggerModal('dialogModal');
}

$('.toggle-modal', true).forEach(item => {
    item.addEventListener('click', function () {
        triggerModal(this.dataset.modal)
        $('#' + this.dataset.modal).querySelector('.modal-title').innerHTML = 'Create an Office';
    })
});

document.addEventListener("DOMContentLoaded", function(event) {
    const offices = [
        {
            name: "President",
            type: "federal",
        },
        {
            name: "President",
            type: "federal",
        },
        {
            name: "President",
            type: "federal",
        },
        {
            name: "President",
            type: "federal",
        },
        {
            name: "President",
            type: "federal",
        }
    ]
    
    const table = $('table tbody');
    offices.forEach(office => {
        let row = document.createElement('tr');
        for (let prop in office) {
            let data = document.createElement('td');
            data.innerHTML = office[prop];
            row.append(data)
        }
        let editBtn = createElement('a', {
            href: 'javascript:;',
            innerHTML: 'Edit',
            class: ['btn', 'btn-green', 'btn-sm']
        });
        editBtn.onclick = function () {
            editModal(9)
        };
        let deleteBtn = createElement('a', {
            href: 'javascript:;',
            innerHTML: 'Delete',
            class: ['btn', 'btn-red', 'btn-sm']
        });
        deleteBtn.onclick = function () {
            deleteModal(9)
        };
        let data = document.createElement('td');
        data.append(editBtn);
        data.append(deleteBtn);
        row.append(data)
        table.append(row);
    })
});
