(() => {
    'use strict';

    const form = document.getElementById('forgetpasswordForm');

    form.addEventListener('submit', event => {
        event.preventDefault();

        form.classList.remove('was-validated');

        const emailInput = document.getElementById('email');
 
        const email = emailInput.value.trim();


        let hasError = false;

        if (email === '' || !isValidEmail(email)) {
            setFieldError(emailInput, 'يرجى إدخال بريد الألكتروني صحيح.');
            hasError = true;
        }

        if (!hasError) {
            alert('Login successful!');
            // form.submit(); // Uncomment this line to submit the form
        }

        form.classList.add('was-validated');
    });

    function setFieldError(field, errorMessage) {
        field.classList.add('is-invalid');
        const errorFeedback = field.nextElementSibling;
        errorFeedback.innerText = errorMessage;
        field.addEventListener('input', () => {
            field.classList.remove('is-invalid');
            errorFeedback.innerText = '';
          });

          field.addEventListener('blur', () => {
            if (field.value.trim() === '') {
              field.classList.add('is-invalid');
              errorFeedback.innerText = errorMessage;
            }
          });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
)();
