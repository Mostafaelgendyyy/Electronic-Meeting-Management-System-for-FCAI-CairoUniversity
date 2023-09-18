function getupcomingmeetings() {
    var token = localStorage.getItem('token');
    var Id = localStorage.getItem('notifiy')
    fetch(`http://127.0.0.1:8000/api/subjectController/upcomings/${Id}`, {
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
            document.getElementById("meetings").innerHTML = "";
            let meetingtype; 
            var IDD ;
            for (meeting of data) {
                const mid= meeting.meetingid;
                const mdate= meeting.date
                IDD = meeting.meetingtypeid
                console.log(IDD)
                fetch(`http://127.0.0.1:8000/api/subjectController/Meetingtype/${IDD}`, {
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
                        meetingtype = data.name
                        console.log(meetingtype)
                        let content = `<option value=${mid}>${meetingtype}/${mdate}</option>`
                        document.getElementById("meetings").innerHTML += content;
                    })
            }
        })
}

function showsubjects() {
    var token = localStorage.getItem('token');
    var Id = localStorage.getItem('notifiy')
    fetch(`http://127.0.0.1:8000/api/subjectController/Subjects/${Id}`, {
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
            for (subject of data) {
                let content = `
                <div class="row">
                    <div class="col-md-9">
                    <div class="card border-0 h-100">
                        <div class="card-body"> 
                        <p class="card-text" style="text-align:right;">${subject.description}</p>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card border-0 h-100">
                            <div class="card-body">
                            <input class="chbox" type="checkbox" 
                            name="subjects" id=${subject.subjectid}>
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

function selectedSubjects() {
    var selected = document.querySelectorAll("input[name='subjects']");
    var selectedSubjects = [];

    selectElement = document.getElementById('meetings');
    meetingid = selectElement.value;
    localStorage.setItem("meetingid", meetingid)

    selected.forEach(function (checkbox) {
        if (checkbox.checked) {
            var x = { "meetingid": meetingid, "subjectid": checkbox.id, "decision": "" }
            selectedSubjects.push(x);
        }

    })
    console.log(selectedSubjects)
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/subjectController/addSubject-in-Meeting`, {
        method: 'POST',
        body: JSON.stringify(selectedSubjects),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token

        },
    })
        .then(response => {
            if (response.ok) {

                alert("تمت اضافة الموضوع الى اجندة الاجتماع")
                location.reload();
            }
        })
}
function getmeetinglist() {
    var token = localStorage.getItem('token');
    const meetingid = localStorage.getItem('meetingid')
    fetch(`http://127.0.0.1:8000/api/subjectController/SubjectForMeetings/${meetingid}`, {
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
            document.getElementById("meetinglist").innerHTML = "";
            for (topic of data) {
                subid = topic.subjecttypeid
                const subjectid = topic.subjectid
                const topicdes = topic.description
                let subjecttype;
                // <--------------------------------------------------->
                fetch(`http://127.0.0.1:8000/api/subjectController/Subjecttype/${subid}`, {
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
                        subjecttype = data.name
                        console.log(subjecttype)

                        let content = `
                            <div class="row" id="deletem">
                                <div class="col-md-9">
                                    <div class="card border-0 h-100">
                                    <div class="card-body">
                                        <p class="card-text" style="text-align:right;">${subjecttype}</p>
                                        <p class="card-text" style="text-align:right;">${topicdes}</p>
                                    </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="card border-0 h-100">
                                    <div class="card-body">
                                        <button type="submit" onclick="deletesubject(${meetingid},${subjectid})" id="deletemm" class="btn btn-danger " >
                                        حذف
                                        </button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <hr>`
                        document.getElementById("meetinglist").innerHTML += content;
                    })
            }
        })
}

function deletesubject(meetingid,subjectid){
    console.log(meetingid,subjectid)
    const url = `http://127.0.0.1:8000/api/subjectController/deletesubjectinMeeting`; 
    var token = localStorage.getItem('token');
    fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({
            "meetingid": meetingid,
            "subjectid":subjectid
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {
                alert("تم حذف الموضوع من اجندة الاجتماع بنجاج")
                location.reload()
            } else {
                console.error('Failed to delete user.');
            }
        })
        .catch(error => {
            // Handle network error
            console.error('Network error occurred.', error);
        });
}
