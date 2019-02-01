
document.addEventListener("DOMContentLoaded", function(event) {
    const offices = [
        {
            name: 'John Doe',
            email: "john@doe.com",
            phoneNumber: "09083637787",
            gender: "Male",
        },
        {
            name: 'Jane Doe',
            email: "jane@doe.com",
            phoneNumber: "09009837787",
            gender: "Female",
        },
        {
            name: 'John Doe',
            email: "john@doe.com",
            phoneNumber: "09083637787",
            gender: "Male",
        },
        {
            name: 'Jane Doe',
            email: "jane@doe.com",
            phoneNumber: "09009837787",
            gender: "Female",
        },
        {
            name: 'John Doe',
            email: "john@doe.com",
            phoneNumber: "09083637787",
            gender: "Male",
        },
        {
            name: 'Jane Doe',
            email: "jane@doe.com",
            phoneNumber: "09009837787",
            gender: "Female",
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
        table.append(row);
    })
});
