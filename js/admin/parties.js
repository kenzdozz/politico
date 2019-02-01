
const editModal = (partyId) => {
    triggerModal('manageParty');
    $('#manageParty').querySelector('.modal-title').innerHTML = 'Edit a Party';
}
const deleteModal = (partyId) => {
    triggerModal('dialogModal');
}

$('.toggle-modal', true).forEach(item => {
    item.addEventListener('click', function () {
        triggerModal(this.dataset.modal)
        $('#' + this.dataset.modal).querySelector('.modal-title').innerHTML = 'Create a Party';
    })
});

document.addEventListener("DOMContentLoaded", function(event) {
    const parties = [
        {
            logoUrl: './../images/pdp.png',
            name: "People Democratic Party",
            address: "Aso Rock, Abuja",
        },
        {
            logoUrl: './../images/pdp.png',
            name: "People Democratic Party",
            address: "Aso Rock, Abuja",
        },
        {
            logoUrl: './../images/pdp.png',
            name: "People Democratic Party",
            address: "Aso Rock, Abuja",
        },
        {
            logoUrl: './../images/pdp.png',
            name: "People Democratic Party",
            address: "Aso Rock, Abuja",
        },
        {
            logoUrl: './../images/pdp.png',
            name: "People Democratic Party",
            address: "Aso Rock, Abuja",
        },
        {
            logoUrl: './../images/pdp.png',
            name: "People Democratic Party",
            address: "Aso Rock, Abuja",
        },
        {
            logoUrl: './../images/pdp.png',
            name: "People Democratic Party",
            address: "Aso Rock, Abuja",
        }
    ]
    
    const table = $('table tbody');
    parties.forEach(party => {
        const row = document.createElement('tr');
        for (let prop in party) {
            const data = document.createElement('td');
            if (prop === 'logoUrl') {
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
