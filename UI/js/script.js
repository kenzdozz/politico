
function validateInput(form, rules) {
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

function formInputListener(form) {
    for (let element of form.elements) {
        element.oninput = function (event) {
            let errorSpan = element.closest('.input-group').querySelector('.form-error')
            if (errorSpan) errorSpan.innerHTML = '';
        }
    }
}
