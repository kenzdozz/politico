
const registerForm = document.querySelector('form');
formInputListener(registerForm)
registerForm.onsubmit = function (event) {
    const registerRules = [
        {
            name: 'firstname',
            rule: 'required',
            message: 'First name is required.'
        },
        {
            name: 'lastname',
            rule: 'required',
            message: 'Last name is required.'
        },
        {
            name: 'email',
            rule: 'required',
            message: 'Email address is required.'
        },
        {
            name: 'email',
            rule: 'email',
            message: 'A valid email address is required.'
        },
        {
            name: 'phoneNumber',
            rule: 'required',
            message: "Voter's ID is required."
        },
        {
            name: 'password',
            rule: 'required',
            message: 'Password is required.'
        },
        {
            name: 'password',
            rule: 'confirm',
            value: 'confirm_password',
            message: 'Password does not match.'
        },
        {
            name: 'gender',
            rule: 'required',
            message: 'Gender is required.'
        },
        {
            name: 'terms',
            rule: 'required',
            message: 'You must accept the terms and condition.'
        },
        {
            name: 'photo',
            rule: 'required',
            message: 'Upload your passport photo.'
        }
    ]
    validateInput(this, registerRules)
    event.preventDefault();
}
