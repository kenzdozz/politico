
const resetPasswordForm = document.querySelector('form');
formInputListener(resetPasswordForm)
resetPasswordForm.onsubmit = async function (event) {
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
    
    const submitBtn = this.querySelector('button[type=submit]');
    const loader = new Loading(submitBtn, 'sm');
    loader.start();
    const valid = validateInput(this, resetPasswordRules)
    event.preventDefault();
    if (!valid) return loader.stop();
    const response = await fetchCall('/auth/reset', 'POST', {
        email: this['email'].value,
    });
    loader.stop();
    if (response.status >= 400) {
        const errorSpan = this['email'].closest('.input-group').querySelector('.form-error');
        return errorSpan.innerHTML = response.error;
    }
    successAlert(response);
}
