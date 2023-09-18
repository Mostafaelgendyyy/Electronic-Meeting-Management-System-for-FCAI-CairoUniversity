(() => {
    'use strict';
    const form = document.getElementById('loginForm');
    form.addEventListener('submit',async (event) => {
        event.preventDefault();
        form.classList.remove('was-validated');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let hasError = false;
        if (email === '') {
            setFieldError(emailInput, 'يرجى إدخال البريد الالكترونى.');
            hasError = true;
        }
        else if (!isValidEmail(email)) {
            setFieldError(emailInput, ' يرجى إدخال البريد الالكترونى بشكل صحيح .');
            hasError = true;
        }
        
        if (password === '') {
            setFieldError(passwordInput, 'يرجى إدخال كلمة المرور.');
            hasError = true;
        }

        if (!hasError) {
   
            try{
                window.location.href = await vaildData(email,password);    }  
            catch(error)
            {
                console.log(error);
                alert("عفوا لا يمكنك تسجيل الدخول")
                setFieldError(emailInput, ' قد يكون البريد الالكترونى غير صحيح .');
                setFieldError(passwordInput, ' قد يكون كلمة المرور غير صحيح .');   
            }   
        }

    });
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
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
    async function vaildData(email,pass){
        const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            body: JSON.stringify({
                "email": email,
                "password": pass
    
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }) ;
        const data= await response.json();
        let token = data.token;
        let ID = data.user.id;
        localStorage.setItem("notifiy",ID)
        localStorage.setItem("token",token)
        localStorage.setItem("role",data.user.role)        
        let role = data.user.role;
        if(role == '0'){
            return 'http://127.0.0.1:5500/controllerhome.html';
        }else if(role == '1'){
           return'http://127.0.0.1:5500/admin.html';
        }else if(role == '2'){
           return 'http://127.0.0.1:5500/notification.html';
        }else if(role == '3'){
            return 'http://127.0.0.1:5500/createmeeting.html';
        }
    }
    
})();

