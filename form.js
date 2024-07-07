
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const inputs = form.querySelectorAll('input');
    const submitButton = document.getElementById('submitButton');
    const formTitle = document.getElementById('formTitle');
    const signupBtn = document.getElementById('signupBtn');
    const signinBtn = document.getElementById('signinBtn');
    const nameField = document.getElementById('nameField');
    const confirmField = document.getElementById('confirmField');
    const emailField = document.getElementById('emailField');
    const passwordField = document.getElementById('passwordField');
    const message = document.getElementById('message');
    const formBox = document.querySelector('.form-box');
    let isSignup = true;
    
    signinBtn.onclick = function(){
        isSignup = false;
        nameField.style.maxHeight = "0";
        confirmField.style.maxHeight = "0";
        formTitle.innerHTML = "Sign In";
        signupBtn.classList.add('disable');
        signinBtn.classList.remove('disable');
        emailField.querySelector('small').classList.add('hidden-error');
        passwordField.querySelector('small').classList.add('hidden-error');
    }
    signupBtn.onclick = function(){
        isSignup = true;
        nameField.style.maxHeight = "64px";
        confirmField.style.maxHeight = "64px";
        formTitle.innerHTML = "Sign Up";
        signupBtn.classList.remove('disable');
        signinBtn.classList.add('disable');
        emailField.querySelector('small').classList.remove('hidden-error');
        passwordField.querySelector('small').classList.remove('hidden-error');
    }

    const validators = {
        Name: value => value.trim().length > 2 || 'Name is too short',
        // lName: () => true,
        email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Email is not valid',
        password: value => {
            const rules = [
                { regex: /[a-z]/, elementId: 'letter' },
                { regex: /[A-Z]/, elementId: 'capital' },
                { regex: /[0-9]/, elementId: 'number' },
                { regex: /.{8,}/, elementId: 'length' }
            ];
            let ruleValid = true;
            rules.forEach(rule => {
                const element = document.getElementById(rule.elementId);
                if (rule.regex.test(value)) {
                    element.classList.remove('invalid');
                    element.classList.add('valid');
                    
                } else {
                    element.classList.remove('valid');
                    element.classList.add('invalid');
                    ruleValid = false;
                }
            });
            return ruleValid;
        },
        cPassword: (value, form) => value === form.password.value || 'Passwords do not match',
    };
        
    

    const showMessage = (input, errormessage) => {
        const form_control = input.parentElement;
        const small = form_control.querySelector('small');
        console.log(small);
        small.textContent = errormessage;
    };

    const validateInput = input => {
        const { id, value, touched } = input;
        if (validators[id] && touched) {
            const validationMessage = validators[id](value, form);
            const isValid = validationMessage === true;
            showMessage(input, isValid ? '' : validationMessage);
            return isValid;
        }
        return true;
    };
    
    const loadFormData = () => {
        inputs.forEach(input => {
            const value = localStorage.getItem(input.id);
            if (value) {
                input.value = value;
                input.touched = true;
                validateInput(input);
            }
        });

    };

    const saveSubmittedData = formData => {
        let allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
        allUsers.push(formData);
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        // localStorage.setItem('formData', JSON.stringify(formData));
    };

    const clearFormData = () => {
        // console.log('clearFormData called');
        inputs.forEach(input => {
            input.value = '';
            input.touched = false;
            showMessage(input, '');
        });
    };
    
    const areAllFieldsValid = () => {
        return Array.from(inputs).every(input => validateInput(input));
    };

    const handleInput = e => {
        e.target.touched = true;
        validateInput(e.target);
        submitButton.disabled = !areAllFieldsValid();
        // signupBtn.classList.toggle('disable', !areAllFieldsValid());
    };
    form.addEventListener('submit', e => {
        e.preventDefault();
        if (!areAllFieldsValid()) return;

        const formData = Array.from(inputs).reduce((acc, input) => {
            acc[input.id] = input.value;
            return acc;
        }, {});
        
        if (isSignup) {
            saveSubmittedData(formData);
            clearFormData();
            window.location.href = "food.html"; // redirect to form2.html after successful signup
        } else {
            const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
            const user = allUsers.find(user => user.email === formData.email && user.password === formData.password);
            if (user) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = "food.html"; // redirect to form2.html after successful signin
            } else {
                showMessage(emailField.querySelector('input'), 'Invalid email or password');
            }
        }
    });

    form.querySelectorAll('input').forEach(input => {
        input.touched = false;
        input.addEventListener('input', handleInput);
    });
    passwordField.querySelector('input').addEventListener('focus', () => {
            if (isSignup) {
            //   document.getElementById('message').style.display = 'block';
            message.classList.remove('hidden');
            formBox.style.height = 'auto';
              
            }
          });
      
          passwordField.querySelector('input').addEventListener('blur', () => {
            // document.getElementById('message').style.display = 'none';
            message.classList.add('hidden');
            formBox.style.height = '';
          });
    loadFormData();
    
});


