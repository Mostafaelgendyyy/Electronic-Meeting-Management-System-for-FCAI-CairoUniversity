function userdata() {
    var id = localStorage.getItem('notifiy')
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/User/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const name = data.name;
            const email = data.email;
            const job = data.jobdescription
            fetch(`http://127.0.0.1:8000/api/adminstration/${data.adminstrationid}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(response => {

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data1 => {
                    console.log(data1);
                    document.getElementById("user").innerHTML = "";
                    let content = ` <div class="card" style="padding-top: 75px; border: 0px;">
                <center>
                <img src="logos/2default-avatar-profile-icon-vector-social-media-user-image-700-205124837-removebg-preview.png" style="width: 200px !important;" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title" id="username">${name}</h5>
                </div>
                </center>
            </div>
        
            <div class="card middlecard" style="border: 0px;">
                <div class="card-body">
                <h3 class="card-title">إعدادات</h3>
                <br>
                <form>
                    <div class="form-group">
                    <label for="exampleInputEmail1">القسم</label>
                    <input type="text" class="form-control disable" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="${data1.ar_name}">
                    </div>
                    <div class="form-group">
                    <label for="exampleInputPassword1">البريد الإلكتروني</label>
                    <input type="email" class="form-control disable" id="exampleInputEmail1" placeholder="${email}">
                    </div>
                    <div class="form-group">
                    <label for="exampleInputPassword1">المسمى الوظيفي</label>
                    <input type="text" class="form-control disable" id="exampleInputPassword4" placeholder="${job}">
                    </div>
                    <div>
                    <a href="resetpassword.html" class="btn selectDoneBtn" id="resetpassword1">تغير كلمه المرور</a>
                    </div>
                </form>
                
                </div>
            </div>
            <div class="card" style="border: 0px;"></div>`
                    document.getElementById("user").innerHTML += content;
                })

        })
}
function gohome() {
    var id = localStorage.getItem('notifiy')
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/User/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            let role = data.role;
            if (role == '0') {
                url = 'http://127.0.0.1:5500/controllerhome.html';
            } else if (role == '1') {
                url = 'http://127.0.0.1:5500/admin.html'
            } else if (role == '2') {
                url = 'http://127.0.0.1:5500/notification.html'
            } else if (role == '3') {
                url = 'http://127.0.0.1:5500/createmeeting.html'
            } else {
                url = 'http://127.0.0.1:5500/login.html'
                alert("عفوا لا يمكنك تسجيل الدخول")
            }
            window.location.href = url;
            console.log(role)
        })
}