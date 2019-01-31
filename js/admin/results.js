
document.addEventListener("DOMContentLoaded", function (event) {
    const results = [
        {
            logoUrl: './../images/pdp.png',
            name: "Atiku Buhari",
            voteCount: 34000,
            office: 'President',
        },
        {
            logoUrl: './../images/pdp.png',
            name: "Atiku Buhari",
            voteCount: 34000,
            office: 'President',
        },
        {
            logoUrl: './../images/pdp.png',
            name: "Atiku Buhari",
            voteCount: 34000,
            office: 'President',
        },
        {
            logoUrl: './../images/pdp.png',
            name: "Atiku Buhari",
            voteCount: 34000,
            office: 'President',
        },
    ]

    const table = $('table tbody');
    results.forEach(result => {
        const row = document.createElement('tr');
        for (let prop in result) {
            const data = document.createElement('td');
            if (prop === 'logoUrl') {
                const logo = document.createElement('img');
                logo.src = result[prop];
                data.append(logo);
            } else {
                data.innerHTML = result[prop];
            }
            row.append(data)
        }
        table.append(row);
    })
});
