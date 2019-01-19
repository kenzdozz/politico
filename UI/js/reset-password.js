
const resetPasswordForm = document.querySelector('form');
formInputListener(resetPasswordForm)
resetPasswordForm.onsubmit = function (event) {
    const resetPasswordRules = [
        {
            name: 'email',
            rule: 'required',
            message: 'Email address is required.'
        },
        {
            name: 'email',
            rule: 'email',
            message: 'A valid email address is required.'
        }
    ]
    validateInput(this, resetPasswordRules)
    event.preventDefault();
}
