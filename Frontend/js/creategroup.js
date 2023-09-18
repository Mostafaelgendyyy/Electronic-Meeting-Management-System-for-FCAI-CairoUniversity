function showinitiators(){
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/admin/initiators`, {
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
            document.getElementById("init").innerHTML = "";
            for (doctor of data) {
                let content = `<option value=${doctor.id}> ${doctor.name}</option>`
                document.getElementById("init").innerHTML += content;
            }
        })
}
function showdoctors() {
    var token = localStorage.getItem('token');
    var Id = localStorage.getItem('initid')
    console.log(Id)
    fetch(`http://127.0.0.1:8000/api/admin/DoctorsandInitiator/${Id}`, {
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
            document.getElementById("group").innerHTML = "";
            for (invite of data) {
                let content = `
                <div class="row">
                      <div class="col-md-9">
                        <div class="card border-0 h-100">
                          <div class="card-body">
                            <p class="card-text" style="text-align:right;">${invite.name}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="card border-0 h-100">
                          <div class="card-body">
                            <input class="chbox" type="checkbox" id=${invite.id} name="Doc1" value="Doc1">
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr>
                `
                document.getElementById("group").innerHTML += content;
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });

}

function checkedinvited() {
    var token = localStorage.getItem('token');
    selectElement = document.getElementById('init');
    initid = selectElement.value;
    console.log(initid)
    fetch('http://127.0.0.1:8000/api/admin/CreateGroup', {
        method: 'POST',
        body: JSON.stringify({
            "initiatorid": initid,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token

        },
    })

    var checkboxes = document.querySelectorAll("input[type='checkbox']");
    var checkedCheckboxes = [];

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            var x = { "doctorid": checkbox.id }
            checkedCheckboxes.push(x);
        }

    })
    console.log(checkedCheckboxes)

    fetch(`http://127.0.0.1:8000/api/admin/addGroupUsers/${initid}`, {
        method: 'POST',
        body: JSON.stringify(checkedCheckboxes),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token

        },
    })
        .then(response => {
            if (response.ok) {

                alert("تمت اضافة اعضاء المجموعه بنجاح")
                location.reload();
            } else {
                alert("هناك عضو موجود من قبل في المجموعة")
            }
        })
        .then((response) => response.json())
        .then((json) => console.log(json));


}

function deletFunction() {
    const button = document.getElementById('butt');
    const result = window.confirm("هل تريد حذف المجموعه");
    if (result) {
        button.addEventListener('click', deletegroup());
        console.log("Delete confirmed");
    } else {
        console.log("Delete canceled");
    }

}
function deletegroup() {

    var token = localStorage.getItem('token');
    selectElement = document.getElementById('init');
    var IX = selectElement.value;
    const url = `http://127.0.0.1:8000/api/admin/deletegroup/${IX}`;
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
                alert("تم حذف الممجموعه بنجاج")
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


function fun() {
    var token = localStorage.getItem('token');
    var IX = localStorage.getItem('initid');
    console.log(IX)
    url = `http://127.0.0.1:8000/api/admin/GroupUser/${IX}`
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
            document.getElementById("deletem").innerHTML = "";
            for (member of data) {
                console.log(member.name);
                let content = `
                <div class="col-md-9">
                <div class="card border-0 h-100">
                  <div class="card-body">
                    <p class="card-text" style="text-align:right;">${member.name}</p>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="card border-0 h-100">
                  <div class="card-body">
                    <button id="deletemm" onclick="deletemember(${member.id})" type="submit" class="btn btn-danger " >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
                    `
                document.getElementById("deletem").innerHTML += content;
            }
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
}


function deletemember(userId) {
    const button = document.getElementById('deletemm');
    console.log(userId);
    const result = window.confirm("هل متاكد من حذف هذاالمستخدم");
    if (result) {
        button.addEventListener('click', deleteUser(userId));
        console.log("Delete confirmed");
    } else {
        console.log("Delete canceled");
    }

}
function deleteUser(userId) {
    var IN = localStorage.getItem('initid');
    const url = `http://127.0.0.1:8000/api/admin/deleted/${IN}/${userId}`; // Replace with your API endpoint URL
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

function onselection(){
    selectElement = document.getElementById('init');
    initid = selectElement.value;
    localStorage.setItem('initid',initid)
    showdoctors();
}