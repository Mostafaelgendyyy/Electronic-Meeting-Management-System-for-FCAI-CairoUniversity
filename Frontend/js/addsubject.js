function addsubjecttype() {
    const form = document.getElementById('admin-form');
    subject = document.getElementById('textinput').value;
    console.log(subject)
    var token = localStorage.getItem('token');
    fetch('http://127.0.0.1:8000/api/admin/addSubjecttype', {
        method: 'POST',
        body: JSON.stringify({
            "name": subject
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {
                alert("تم اضافة " + subject + " بنجاح")
                location.reload();
            }
        }).catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
}
function getsubjectstype() {
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/admin/Subjecttype`, {
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
            document.getElementById("sub").innerHTML = "";
            for (subjectty of data) {
                let content = `<option value=${subjectty.id}> ${subjectty.name}</option>`
                document.getElementById("sub").innerHTML += content;
            }
        })
}

function fun() {
    selectElement = document.getElementById('sub');
    subjectid = selectElement.value;
    console.log(subjectid);
    const form = document.getElementById('admin-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const button = document.getElementById('butt');
        const result = window.confirm("هل تريد مسح هذا الاجتماع");
        if (result) {
            button.addEventListener('click', deletesubjecttype(subjectid));
            console.log("Delete confirmed");
        } else {
            console.log("Delete canceled");
        }
    })
}
// Define the specific function to be called

function deletesubjecttype(subjectid) {

    var token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:8000/api/admin/deleteSubjecttype/${subjectid}`, {
        method: 'DElETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {
                // User successfully deleted
                console.log(`mettingtype with ID ${subjectid} deleted.`);
                location.reload();
            } else {
                // Handle error case
                console.error('Failed to delete meetingtype.');
            }
        })
        .catch(error => {
            // Handle network error
            console.error('Network error occurred.', error);
        });
}