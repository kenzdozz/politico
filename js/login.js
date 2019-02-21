const registerForm = document.querySelector('form');
formInputListener(registerForm)
registerForm.onsubmit = async function (event) {
    const registerRules = [{
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
        },
        {
            name: 'password',
            rule: 'minlen',
            value: 7,
            message: 'Password min lengt 3h'
        }
    ];
    const submitBtn = this.querySelector('button[type=submit]');
    const loader = new Loading(submitBtn, 'sm');
    loader.start();
    const valid = validateInput(this, registerRules)
    event.preventDefault();
    if (!valid) {
        return loader.stop();
    }
    const response = await fetchCall('/auth/login', 'POST', {
        email: this['email'].value,
        password: this['password'].value
    });
    loader.stop();
    if (response.status >= 400) {
        return handleFieldErrors(this, response);
    }
    setLogin(response);
}