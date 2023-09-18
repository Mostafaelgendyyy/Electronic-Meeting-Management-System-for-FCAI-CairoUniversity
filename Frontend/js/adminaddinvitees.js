const form = document.getElementById('admin-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var token = localStorage.getItem('token');
    var ID = localStorage.getItem('notifiy');

    const name = document.getElementById('name').value;
    const des = document.getElementById('description').value;
    const email = document.getElementById('email').value;
    console.log(ID)
    fetch('http://127.0.0.1:8000/api/admin/addInvited', {
        method: 'POST',
        body: JSON.stringify({
            "adminid": ID,
            "name": name,
            "jobdescription": des,
            "email": email,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {
                alert("تم اضافة " + name + " بنجاح")
                location.reload();
            }
        })
})


function showinvited() {
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/admin/invited`, {
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
            document.getElementById("listofusers").innerHTML = "";
            for (invite of data) {
                let content = `
                <div id="getusers" class="row box">
                    <div class="col-md-3">
                        <div class="card border-0 h-100">
                            <div class="card-body">
                                <a class="btn btn-transparent" id="update"  href="#"
                                    style="background-color: transparent; border: 0px;"><img
                                        src="logos/avatar.png" height="60" width="60"
                                        alt=""></a>

                                <div class="card-body">
                                    <button id="butt" class="btn btn-primary"
                                        onclick="deletFunction(${invite.id})"
                                        style="text-decoration: underline; height: 15;">حذف</button>

                                </div>
                            </div>

                        </div>
                    </div>
                    <!---------------------------------------->
                    <div class="col-md-6">
                        <div class="card border-0 h-100">
                            <div id="datashown" class="card-body">
                                <p id="showname" class="card-text"
                                    style="text-align:right;">${invite.name}</p>
                                <p id="showname" class="card-text"
                                    style="text-align:right;"> ${invite.jobdescription}</p>
                            </div>
                        </div>
                    </div>
                    <div id="dataContainer"></div>
                </div>
                `
                document.getElementById("listofusers").innerHTML += content;
            }
        })
}

// Define the specific function to be called
function deletFunction(invitedId) {
    const button = document.getElementById('butt');
    const result = window.confirm("هل متاكد من حذف هذا المستخدم");
    if (result) {
        button.addEventListener('click', deleteUser(invitedId));
        console.log("Delete confirmed");
    } else {
        console.log("Delete canceled");
    }

}
function deleteUser(invitedId) {
    const url = `http://127.0.0.1:8000/api/admin/deleteInvited/${invitedId}`;
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
                console.log(`User with ID ${invitedId} deleted.`);
                alert("تم حذف المستخدم بنجاج")
                location.reload();
            } else {
                console.error('Failed to delete user.');
            }
        })
}