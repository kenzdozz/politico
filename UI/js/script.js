
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
        element.oninput = function (event) {
            let errorSpan = element.closest('.input-group').querySelector('.form-error')
            if (errorSpan) errorSpan.innerHTML = '';
        }
    }
}

const validateInput = (form, rules) => {
    for (let rule of rules) {
        let isValid = false;
        switch (rule.rule) {
            case 'required':
                isValid = form[rule.name] && form[rule.name].value;
                if (isValid && form[rule.name].type === 'checkbox') isValid = form[rule.name].checked;
                break;
            case 'email':
                isValid = form[rule.name] && /\S+@\S+\.\S+/.test(form[rule.name].value);
                break;
            case 'confirm':
                isValid = form[rule.name] && form[rule.value] && form[rule.name].value === form[rule.value].value;
                break;
            case 'min':
                isValid = form[rule.name] && form[rule.name].value >= form[rule.value].value;
                break;
            case 'max':
                isValid = form[rule.name] && form[rule.name].value <= form[rule.value].value;
                break;
            case 'number':
                isValid = form[rule.name] && Number.isNaN(form[rule.name].value);
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
        }
    }
    return true
}

$('.toggle-modal', true).forEach(item => {
    item.addEventListener('click', function () {
        triggerModal(this.dataset.modal)
        $('#'+this.dataset.modal).querySelector('.modal-title').innerHTML = 'Create a Party';
    })
})

$('.modal-close', true).forEach(item => {
    item.addEventListener('click', () => {
        $('.modal', true).forEach(modal => modal.classList.remove('show'));
    })
})

$('.modal', true).forEach(modal => modal.onclick = () => {
    if (modal.id == 'dialogModal') return modal.classList.remove('show');
    modal.querySelector('.modal-content').classList.add('shake');
    setTimeout(() => {
        modal.querySelector('.modal-content').classList.remove('shake');
    }, 300)
})

$('.modal-content', true).forEach(mContent => mContent.onclick = function (e) {
    e.stopPropagation();
})

$('.nav-toggle').onclick = () => {
    $('.header nav').classList.toggle('show');
}