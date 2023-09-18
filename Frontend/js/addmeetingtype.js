function addmeetingtype() {
    const form = document.getElementById('admin-form');
    meeting = document.getElementById('textinput').value;
    console.log(meeting)
    var token = localStorage.getItem('token');
    fetch('http://127.0.0.1:8000/api/admin/addMeetingtype', {
        method: 'POST',
        body: JSON.stringify({
            "name": meeting
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {
                alert("تم اضافة " + meeting + " بنجاح")
                location.reload();
            }
        }).catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
}
function getmeetings() {
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/admin/Meetingtype`, {
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
            document.getElementById("meet").innerHTML = "";
            for (meeting of data) {
                let content = `<option value=${meeting.id}> ${meeting.name}</option>`
                document.getElementById("meet").innerHTML += content;
            }
        })
}

function fun() {
    selectElement = document.getElementById('meet');
    meetingId = selectElement.value;
    console.log(meetingId);
    const form = document.getElementById('admin-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const button = document.getElementById('butt');
        const result = window.confirm("هل تريد مسح هذا الاجتماع");
        if (result) {
            button.addEventListener('click', deletemeetingtype(meetingId));
            console.log("Delete confirmed");
        } else {
            console.log("Delete canceled");
        }
    })
}
// Define the specific function to be called

function deletemeetingtype(meetingId) {

    var token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:8000/api/admin/deleteMeetingtype/${meetingId}`, {
        method: 'DElETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {
                // User successfully deleted
                console.log(`mettingtype with ID ${meetingId} deleted.`);
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