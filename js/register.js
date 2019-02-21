const registerForm = document.querySelector('form');
formInputListener(registerForm)
registerForm.onsubmit = async function (event) {
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
            name: 'phonenumber',
            rule: 'required',
            message: "Phone number is required."
        },
        {
            name: 'phonenumber',
            rule: 'minlen',
            value: 10,
            message: "Phone number length should be between 10 and 15."
        },
        {
            name: 'phonenumber',
            rule: 'maxlen',
            value: 15,
            message: "Phone number length should be between 10 and 15."
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
            name: 'password',
            rule: 'minlen',
            value: 8,
            message: 'Password should be more than 7 characters.'
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
    const valid = validateInput(this, registerRules);
    const submitBtn = this.querySelector('button[type=submit]');
    const loader = new Loading(submitBtn, 'sm');
    loader.start();
    event.preventDefault();
    if (!valid) return loader.stop();
    const formData = getFormData(this);
    formData.append('passport', document.querySelector('input[type="file"]').files[0]);
    const response = await fetchCall('/auth/signup', 'POST', formData, true);
    loader.stop();
    if (response.status >= 400) {
        return handleFieldErrors(this, response);
    }
    setLogin(response);
}