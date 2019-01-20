
const registerForm = document.querySelector('form');
formInputListener(registerForm)
registerForm.onsubmit = function (event) {
    const registerRules = [
        {
            name: 'first_name',
            rule: 'required',
            message: 'First name is required.'
        },
        {
            name: 'last_name',
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
            name: 'voter_id',
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
            message: 'Password does not required.'
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
        }
    ]
    validateInput(this, registerRules)
    event.preventDefault();
}
