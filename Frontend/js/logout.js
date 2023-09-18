function logout() {
    const button = document.getElementById('logout');
    const result = window.confirm("هل تريد تسجيل الخروج");
    if (result) {
        button.addEventListener('click', logoutUser());
        console.log("Delete confirmedj");
    } else {
        console.log("Delete canceled");
    }
}


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

                window.location.href = 'http://127.0.0.1:5500/index.html';
            } else {

                console.error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Logout failed:', error);
        });
}
