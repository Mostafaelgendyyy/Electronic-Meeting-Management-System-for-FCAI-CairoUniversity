const form = document.getElementById('admin-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // get user data
    const name = document.getElementById('name').value;
    const pass = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const alldepartments = document.querySelectorAll('input[name="search-radio1"]');
    let deptid;

    for (const dept of alldepartments) {
        if (dept.checked) {
            deptid = dept.value
        }
    }
    const allusers = document.querySelectorAll('input[name="search-radio"]');
    let usertype;
    let input;
    let job;
    for (const user of allusers) {
        if (user.checked) {
            usertype = user.value
            idd = user.id
            input = document.getElementById(idd)
            for (const label of input.labels) {
                job = label.textContent;
            }
        }
    }

        let url;
        if (usertype === "منشئ اجتماع") {
            url = 'http://127.0.0.1:8000/api/admin/addInitiator'
        } else if (usertype === "سكرتير") {
            url = 'http://127.0.0.1:8000/api/admin/addSubjectController'

        } else if (usertype === "عضو هيئة تدريس") {
            url = 'http://127.0.0.1:8000/api/admin/adddoctor'

        } else if (usertype === "مسؤل النظام") {
            url = 'http://127.0.0.1:8000/api/addAdmin'

        }
        // add user
        var token = localStorage.getItem('token');
        console.log(token)
        console.log(name);
        console.log(pass);
        console.log(email);
        console.log(deptid);
        console.log(job);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "name": name,
                "password": pass,
                "email": email,
                "adminstrationid": deptid,
                "jobdescription": job
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            },
        })
            .then(response => {
                if (response.ok) {
                    alert("تم اضافة " + name + " بنجاح")
                }
            })
        form.reset();
    })
    function fun() {
        selectElement = document.getElementById('users');
        output = selectElement.value;
        console.log(output)
        let url;
        if (output === "منشئ اجتماع") {
            url = 'http://127.0.0.1:8000/api/admin/initiators'
        } else if (output === "سكرتير") {
            url = 'http://127.0.0.1:8000/api/admin/controllers'

        } else if (output === "عضو هيئة تدريس") {
            url = 'http://127.0.0.1:8000/api/admin/doctors'

        } else if (output === "مسؤل النظام") {
            url = 'http://127.0.0.1:8000/api/admin/admins'

        }
        var token = localStorage.getItem('token');
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(response => {
                // Check if the response is successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the response as JSON and return another Promise
                return response.json();
            })
            .then(data => {
                // Process the retrieved data
                console.log(data);
                console.log(typeof data);
                document.getElementById("listofusers").innerHTML = "";
                for (user of data) {
                   const name = user.name
                   const id = user.id
                    fetch(`http://127.0.0.1:8000/api/admin/adminstration/${user.adminstrationid}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                        .then(response => {
                            // Check if the response is successful
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            // Parse the response as JSON and return another Promise
                            return response.json();
                        })
                        .then(da => {
                            console.log(da)
                            let content = `
                            <div id="getusers" class="row box">
                                <div class="col-md-3">
                                    <div class="card border-0 h-100">
                                        <div class="card-body">
                                            <a class="btn btn-transparent" onclick="updateUser(${id})" href="edituser.html" 
                                                style="background-color: transparent; border: 0px;"><img
                                                    src="logos/avatar.png" height="60" width="60"
                                                    alt=""><span id="update"
                                                    style="text-decoration: underline;">تعديل</span></a>
                                                    <div class="card-body">
                                                    <button id="butt" class="btn btn-primary" onclick="mySpecificFunction(${id})" style="text-decoration: underline; height: 15;">حذف</button>
                                                    </div>
                                        </div>
                                    </div>
                                </div>
                                <!---------------------------------------->
                                <div class="col-md-6">
                                    <div class="card border-0 h-100">
                                        <div id="datashown" class="card-body">
                                            <p id="showname" class="card-text" style="text-align:right;">${name}</p>
                                            <p id="showdept" class="card-text" style="text-align:right;">${da.ar_name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                            document.getElementById("listofusers").innerHTML += content;
                        })
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error:', error);
});
}

function mySpecificFunction(userId) {
    const button = document.getElementById('butt');
    console.log(userId);
    const result = window.confirm("هل متاكد من حذف هذا المستخدم");
    if (result) {
        button.addEventListener('click', deleteUser(userId));
        console.log("Delete confirmed");
    } else {
        console.log("Delete canceled");
    }

}
function deleteUser(userId) {

    const url = `http://127.0.0.1:8000/api/admin/delete-user/${userId}`; // Replace with your API endpoint URL
    var token = localStorage.getItem('token');
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {
                // User successfully deleted
                console.log(`User with ID ${userId} deleted.`);
                alert("تم حذف المستخدم بنجاج")
                location.reload()
            } else {
                // Handle error case
                console.error('Failed to delete user.');
            }
        })
        .catch(error => {
            // Handle network error
            console.error('Network error occurred.', error);
        });
}

function updateUser(uid) {
    localStorage.setItem('upatedid', uid);
}
function departments() {
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/admin/adminstrations`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the response as JSON and return another Promise
            return response.json();
        })
        .then(data => {
            console.log(data);
            document.getElementById("department").innerHTML = "";
            var i = 1
            for (dept of data) {
                let content = ` <input class="form-check-input" type="radio" value=${dept.id} name="search-radio1"
                id="department${i}">
            <label class="form-check-label" for="department${i}">
                ${dept.ar_name}
            </label>
            <br>`
                document.getElementById("department").innerHTML += content;
                i++;
            }
        })
}
