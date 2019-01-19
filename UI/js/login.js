
const registerForm = document.querySelector('form');
formInputListener(registerForm)
registerForm.onsubmit = function (event) {
    const registerRules = [
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
            name: 'password',
            rule: 'required',
            message: 'Password is required.'
        }
    ]
    validateInput(this, registerRules)
    event.preventDefault();
}
