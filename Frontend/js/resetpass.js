const form2 = document.getElementById('resetpass');
form2.addEventListener('submit', function (event) {
    event.preventDefault();
    const idd = localStorage.getItem('notifiy');
    var token = localStorage.getItem('token');
    const oldpass = document.getElementById('oldpassword').value;
    const newpass = document.getElementById('newpassword').value;
    const verpass = document.getElementById('verpassword').value;
    console.log(oldpass, newpass, verpass)
    if (newpass != verpass) {
        return alert("كلمة المرور التأكديه لا تتناسب مع كلمة المرور الجديدة ");

    } else {
        fetch(`http://127.0.0.1:8000/api/checkPass`, {
            method: 'POST',
            body: JSON.stringify({
                "id": idd,
                "password": oldpass
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            },
        }).then(response => {
            if (response.ok) {
                fetch(`http://127.0.0.1:8000/api/change-password/${idd}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        "password": newpass
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + token
                    },
                }).then(response => {
                    if (response.ok) {
                        alert("تم تغير كلمة المرور")
                        logoutUser();
                    } 
                })
            } else {
                // Handle error case
                alert('هناك خطاء في كلمة المرو الحالية');
            }
        })
    }

})

function logoutUser() {
    var token = localStorage.getItem('token');

    fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (response.ok) {
                localStorage.removeItem('token');
                window.location.href = 'http://127.0.0.1:5500/login.html';
            }
        })
}