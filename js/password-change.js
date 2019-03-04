let email = '', token = '';

window.onload = e => {
    const urlParams = new URLSearchParams(window.location.search);
    email = urlParams.get('email');
    token = urlParams.get('token');
    if (!email || !token) return location.href = 'login.html';
    $('#email').innerHTML = email;
}

const resetPasswordForm = document.querySelector('form');
formInputListener(resetPasswordForm)
resetPasswordForm.onsubmit = async function (event) {
    const resetPasswordRules = [
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
            name: 'password',
            rule: 'minlen',
            value: 8,
            message: 'Password should be more than 7 characters.'
        },
    ]
    
    const submitBtn = this.querySelector('button[type=submit]');
    const loader = new Loading(submitBtn, 'sm');
    loader.start();
    const valid = validateInput(this, resetPasswordRules)
    event.preventDefault();
    if (!valid) return loader.stop();
    const response = await fetchCall('/auth/reset', 'PATCH', {
        email,
        token,
        password: this['password'].value,
    });
    loader.stop();
    if (response.status >= 400) {
        const errorSpan = submitBtn.closest('.input-group').querySelector('.form-error');
        return errorSpan.innerHTML = response.error;
    }
    successAlert(response);
    redirecting($('.alert.success'), 'login.html');
}
