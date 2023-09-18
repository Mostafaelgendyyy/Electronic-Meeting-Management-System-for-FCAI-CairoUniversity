const form = document.getElementById('forgetpasswordForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    // get user data
    const email = document.getElementById('email').value;
    console.log(email);
    fetch('http://127.0.0.1:8000/api/forgotpassword', {
        method: 'POST',
        body: JSON.stringify({
            "email": email
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })  .then(response => {
        if (response.ok) {
            alert("تم إرسال البريد الإلكتروني الخاص بإعادة تعيين كلمة المرور بنجاح")
        } else {
            // Handle error case
            console.error('هناك خطاء في البريد لإلكتروني');
        }
    })
        
})
