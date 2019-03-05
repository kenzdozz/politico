// const baseUrl = 'https://poli-tico.herokuapp.com/api/v1';
const baseUrl = 'http://localhost:3000/api/v1';

const $ = (selector, all = false) => {
    if (all) return document.querySelectorAll(selector);
    return document.querySelector(selector) || {};
};

const createElement = (type, attributes) => {
    var element = document.createElement(type);
    for (var key in attributes) {
        if (key == "class") {
            element.classList.add(...attributes[key]);
        } else if (key == 'innerHTML') {
            element[key] = attributes[key];
        } else {
            element.setAttribute(key, attributes[key]);
        }
    }
    return element;
}

const triggerModal = modalId => {
    const modal = $('#' + modalId);
    modal.classList.add('show');
    modal.querySelector('.modal-content').classList.add('slide-in');
    setTimeout(() => {
        modal.querySelector('.modal-content').classList.remove('slide-in');
    }, 100);
}

const formInputListener = form => {
    for (let element of form.elements) {
        element.oninput = event => {
            let genErrorSpan = form.querySelector('.form-error.gen-error');
            let errorSpan = element.closest('.input-group').querySelector('.form-error');
            if (genErrorSpan) genErrorSpan.innerHTML = '';
            if (errorSpan) errorSpan.innerHTML = '';
        }
    }
    const cpass = form.querySelector('input[name=confirm_password]');
    if (cpass) cpass.oninput = e => {
        form.querySelector('input[name=password]').closest('.input-group').querySelector('.form-error').innerHTML = '';
    }
}

const validateInput = (form, rules) => {
    let valid = true;
    for (let rule of rules) {
        let isValid = false;
        switch (rule.rule) {
            case 'required':
                isValid = form[rule.name] && form[rule.name].value;
                if (isValid && form[rule.name].type === 'checkbox') isValid = form[rule.name].checked;
                break;
            case 'email':
                isValid = form[rule.name] && /^[\w._]+@[\w]+[-.]?[\w]+\.[\w]+$/.test(form[rule.name].value);
                break;
            case 'confirm':
                isValid = form[rule.name] && form[rule.value] && form[rule.name].value === form[rule.value].value;
                break;
            case 'minlen':
                isValid = form[rule.name] && form[rule.name].value.length >= rule.value;
                break;
            case 'maxlen':
                isValid = form[rule.name] && form[rule.name].value.length <= rule.value;
                break;
            case 'number':
                isValid = form[rule.name] && Number.isNaN(form[rule.name].value);
                break;
            case 'file':
                isValid = form[rule.name] && form[rule.name].files[0];
                break;
            default:
                break;
        }
        if (!isValid && form[rule.name]) {
            let errorSpan;
            if (form[rule.name].length) {
                errorSpan = form[rule.name][0].closest('.input-group').querySelector('.form-error')
                form[rule.name][0].closest('.input-group').appendChild(errorSpan)
            } else {
                errorSpan = form[rule.name].closest('.input-group').querySelector('.form-error')
                form[rule.name].closest('.input-group').appendChild(errorSpan);
            }
            errorSpan.innerHTML = rule.message;
            valid = false;
        }
    }
    return valid
}

const isAdminPage = () => {
    return location.href.split('/').includes('admin');
}

const hanleAuthorization = response => {
    if (!response.status) return;
    if (response.status === 401 && !location.href.split('/').includes('login.html')){
        const url = isAdminPage() ? '../login.html' : 'login.html';
        location.href = url;
        return;
    }
    if (response.status === 403){
        location.href = 'vote.html';
    }
}

const fetchCall = async (url, method = 'GET', data, isFormData = false) => {
    const config = {
        method,
        body: isFormData ? data : JSON.stringify(data)
    };
    config.headers = {
        'authorization': localStorage.getItem('userToken')
    }
    if (!isFormData) config.headers['Content-Type'] = 'application/json; charset=utf-8';
    try {
        const resData = await fetch(`${baseUrl}${url}`, config);
        const response = await resData.json();
        hanleAuthorization(response);
        return response;
    } catch (error) {
        console.log(error)
        return {};
    }
}

const setEmptyRow = (colSpan) => {
    const table = $('table tbody');
    const row = document.createElement('tr');
    row.id = 'emptyRow';
    const data = document.createElement('td');
    data.colSpan = colSpan;
    data.innerHTML = 'No records found.';
    row.append(data);
    if(table) table.append(row);
}

const handleFieldErrors = (form, response) => {
    try {
        if (response.fields) for (const field in response.fields) {
            const errorSpan = form[field].closest('.input-group').querySelector('.form-error');
            errorSpan.innerHTML = response.fields[field];
        }
        const genError = form.querySelector('.gen-error');
        if (genError) genError.innerHTML = response.error;
    } catch (err) {/**console.log(err) **/}
}

const successAlert = (response, wrapper = document) => {
    const elem = wrapper.querySelector('.alert.success');
    if (elem) {
        elem.innerHTML = response.data.message || 'Success!';
        elem.classList.add('show');
        elem.scrollIntoView({behavior: "smooth"})
    }
}

const getFormData = form => {
    const formData = new FormData();
    for (const element of form.elements) {
        const name = element.getAttribute('name');
        const elem = form[name];
        if (elem && elem.value && !formData.has(name)) formData.append(name, elem.value);
    }
    return formData;
}

class Loading {
    constructor(element, classNames = '') {
        this.element = element;
        this.element.classList.add('isloading');
        const lClass = ['loader'];
        if (classNames.split(' ').includes('big')) lClass.push('big');
        this.loader = createElement('span', {
            class: lClass,
            innerHTML: `
        <svg class="${classNames}" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
            <rect x="0" y="10" width="4" height="10" class="svg-rect" fill="#333" opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="8" y="10" width="4" height="10" class="svg-rect" fill="#333"  opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="16" y="10" width="4" height="10" class="svg-rect" fill="#333"  opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            </rect>
        </svg>`
        });
        return this;
    }
    start() {
        this.element.appendChild(this.loader);
        this.element.classList.add('progress');
    }
    stop() {
        this.element.removeChild(this.loader);
        this.element.classList.remove('progress');
        this.element.classList.remove('isloading');
    }
}

const redirecting = (elem, link) => {
    elem.innerHTML += ' <small>Redirecting...</small>';
    new Loading(elem, 'sm dark').start();
    setTimeout(() => {
        location.href = link;
    }, 3000);
}

const setLogin = response => {
    const { user, token } = response.data;
    localStorage.setItem('userToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    const url = user.isadmin ? 'admin/index.html' : 'vote.html';
    successAlert(response);
    redirecting($('.alert.success'), url);
}

const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

const emptyForm = form => {
    for (const element of form.elements) {
        element.value = '';
    }
    const imageHolder = form.querySelector('.upload-image');
    const placeholderUrl = isAdminPage() ? '../images/upload.webp' : './images/upload.webp';
    if (imageHolder) {
        imageHolder.querySelector('img.upload').setAttribute('src', placeholderUrl);
        imageHolder.classList.remove('uploaded');
    }
}

$('.modal-close', true).forEach(item => {
    item.addEventListener('click', () => {
        $('.modal', true).forEach(modal => {
            modal.classList.remove('show');
            const mAlert = modal.querySelector('.alert');
            if (mAlert) mAlert.classList.remove('show');
            const mForm = modal.querySelector('form');
            if (mForm) {
                emptyForm(mForm);
                mForm.querySelectorAll('.form-error').forEach(elem => elem.innerHTML = '');
                delete mForm.dataset.id;
            }
        });
    })
})

$('.modal', true).forEach(modal => modal.onclick = () => {
    if (modal.id == 'dialogModal') return modal.classList.remove('show');
    modal.querySelector('.modal-content').classList.add('shake');
    setTimeout(() => {
        modal.querySelector('.modal-content').classList.remove('shake');
    }, 300)
})

$('.modal-content', true).forEach(mContent => mContent.onclick = e => {
    e.stopPropagation();
})

$('.nav-toggle').onclick = () => {
    $('.header nav').classList.toggle('show');
}

$('a[href^="#"]', true).forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const targetElem = $(anchor.getAttribute('href'));
        if (!targetElem) return;
        targetElem.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
        e.preventDefault();
    })
})

$('img.upload', true).forEach(uploder => {
    uploder.onclick = event => {
        const inputFile = uploder.closest('.input-group').querySelector('input[type=file]');
        if (inputFile) inputFile.click();
    }
});

$('input[type=file]', true).forEach(inputFile => {
    inputFile.onchange = event => {
        const imgHolder = inputFile.closest('.input-group').querySelector('img.upload');
        if (!imgHolder || !inputFile.files || !inputFile.files[0]) return;
        var reader = new FileReader();
        reader.onload = function (e) {
            imgHolder.setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(inputFile.files[0]);
        inputFile.closest('.input-group').querySelector('.upload-image').classList.add('uploaded');
    }
});

$('.upload-image .remove', true).forEach(removeImg => {
    removeImg.onclick = event => {
        const inpGrp = removeImg.closest('.input-group');
        const placeholderUrl = isAdminPage() ? '../images/upload.webp' : './images/upload.webp';
        inpGrp.querySelector('.upload-image').classList.remove('uploaded');
        inpGrp.querySelector('img.upload').setAttribute('src', placeholderUrl);
        inpGrp.querySelector('input[type=file]').value = null;
    }
})

const logout = $('li.nav-dropdown ul').lastElementChild.querySelector('a');
if (logout) logout.onclick = async e => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    await localStorage.clear();
}


$('.nav-link[data-modal=expressInterest]').onclick = async (e) => {
    const exInterest = $('#expressInterest');
    if (!exInterest) return false;

    const partySelect = exInterest.querySelector('select[name=party]');
    const officeSelect = exInterest.querySelector('select[name=office]');
    
    if (partySelect.childElementCount == 1) {
        const partiesRes = await fetchCall('/parties');
        if (partiesRes && partiesRes.data){
            const parties = partiesRes.data;
            parties.forEach(party => {
                const option = createElement('option', { 
                    value: party.id,
                    innerHTML: party.name,
                });
                partySelect.append(option);
            });
        }
    }
    if (officeSelect.childElementCount == 1) {
        const officesRes = await fetchCall('/offices');
        if (officesRes && officesRes.data) {
            const offices = officesRes.data;
            offices.forEach(office => {
                const option = createElement('option', { 
                    value: office.id,
                    innerHTML: office.name,
                });
                officeSelect.append(option);
            });
        }
    }
}

$('#expressInterest form').onsubmit = async function (e) {
    e.preventDefault();
    formInputListener(this);
    const rules = [
        {
            name: 'office',
            rule: 'required',
            message: 'Select interested office.'
        },
        {
            name: 'party',
            rule: 'required',
            message: 'Select your party.'
        }
    ];
    const loader = new Loading(this.querySelector('button[type=submit]'), 'sm');
    loader.start();
    const valid = validateInput(this, rules);
    if (!valid) return loader.stop();
    const response = await fetchCall(`/office/register/${this['office'].value}`, 'POST', {
        party: this['party'].value,
        mandate: this['mandate'].value
    });
    loader.stop();
    if (!response.status || response.status >= 400) return handleFieldErrors(this, response);
    successAlert(response, this);
    setTimeout(() => {
        this.querySelector('.modal-close').click();
    }, 1500);
}
