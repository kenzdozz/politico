const setUserDetails = () => {
    const user = getUser();
    $('.nav-link .user-icon').setAttribute('src', user.passporturl);
    $('.passporturl').setAttribute('src', user.passporturl);
    $('.name').innerHTML = `${user.firstname} ${user.othername ? user.othername + ' ':''}${user.lastname}`;
    $('.phonenumber').innerHTML = user.phonenumber;
    $('.email').innerHTML = user.email;
    $('.gender').innerHTML = user.gender || 'N/A';
    $('.bio').innerHTML = user.bio || '';
}

window.onload = async e => {
    setUserDetails();
}

$('#updateProfile form').onsubmit = async function (e) {
    e.preventDefault();
    formInputListener(this);
    const formData = getFormData(this);
    const fileInput = this.querySelector('input[type="file"]');
    if (fileInput && fileInput.files[0]) formData.append('passport', fileInput.files[0]);
    const submitBtn = this.querySelector('button[type=submit]');
    const loader = new Loading(submitBtn, 'sm');
    loader.start();
    const response = await fetchCall('/users', 'PATCH', formData, true);
    loader.stop();
    if (!response.status || response.status >= 400) return handleFieldErrors(this, response);
    const user = response.data;
    if (user) localStorage.setItem('user', JSON.stringify(user));
    setUserDetails();
    $('.modal-close').click();
}

$('#updatePassword form').onsubmit = async function (e) {
    e.preventDefault();
    formInputListener(this);
    const passRules = [
        {
            name: 'oldpassword',
            rule: 'required',
            message: 'Old password is required.'
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
    ];
    const submitBtn = this.querySelector('button[type=submit]');
    const loader = new Loading(submitBtn, 'sm');
    loader.start();
    const valid = validateInput(this, passRules);
    if (!valid) return loader.stop();
    const response = await fetchCall('/users/password', 'PATCH', {
        oldpassword: this['oldpassword'].value,
        password: this['password'].value,
    });
    loader.stop();
    if (!response.status || response.status >= 400) return handleFieldErrors(this, response);
    successAlert(response, this);
    setTimeout(() => {
        $('.modal-close').click();
    }, 1000);
}

$('.toggle-modal', true).forEach(item => {
    item.addEventListener('click', function () {
        triggerModal(this.dataset.modal);
        if (this.dataset.modal == 'updateProfile'){
            const user = getUser();
            const updateForm = $('#updateProfile form');
            for (const prop in user) {
                if (updateForm[prop]) 
                    updateForm[prop].value = user[prop];
            }
            updateForm.querySelector('.upload-image').classList.add('uploaded');
            updateForm.querySelector('.upload-image img.upload').setAttribute('src', user.passporturl);
        }
    })
});
