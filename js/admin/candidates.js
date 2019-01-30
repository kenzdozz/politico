
const dialogModal = (partyId) => {
    triggerModal('dialogModal');
}

document.addEventListener("DOMContentLoaded", function(event) {
    const offices = [
        {
            office: 'President',
            name: "Atikulate Obi",
            party: "People Political Democracy",
        },
        {
            office: 'President',
            name: "Osi Buhari",
            party: "Political Democratic Congress",
        },
        {
            office: 'President',
            name: "Atikulate Obi",
            party: "People Political Democracy",
        },
        {
            office: 'President',
            name: "Osi Buhari",
            party: "Political Democratic Congress",
        },
        {
            office: 'President',
            name: "Atikulate Obi",
            party: "People Political Democracy",
        },
        {
            office: 'President',
            name: "Osi Buhari",
            party: "Political Democratic Congress",
        },
    ]
    
    const table = $('table tbody');
    offices.forEach(office => {
        let row = document.createElement('tr');
        for (let prop in office) {
            let data = document.createElement('td');
            data.innerHTML = office[prop];
            row.append(data)
        }
        let approveBtn = createElement('a', {
            href: 'javascript:;',
            innerHTML: 'Approve',
            class: ['btn', 'btn-green', 'btn-sm']
        });
        approveBtn.onclick = function () {
            dialogModal(9)
        };
        let rejectBtn = createElement('a', {
            href: 'javascript:;',
            innerHTML: 'Reject',
            class: ['btn', 'btn-red', 'btn-sm']
        });
        rejectBtn.onclick = function () {
            dialogModal(9)
        };
        let data = document.createElement('td');
        data.append(approveBtn);
        data.append(rejectBtn);
        row.append(data)
        table.append(row);
    })
});
