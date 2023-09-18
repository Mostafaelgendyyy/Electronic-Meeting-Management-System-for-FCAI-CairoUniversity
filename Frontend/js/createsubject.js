function send() {
    selectElement = document.getElementById('subjecttype');
    const subjectid = selectElement.value;
    const description = document.getElementById('description').value;
    var token = localStorage.getItem('token');
    const Id = localStorage.getItem('notifiy')

    fetch('http://127.0.0.1:8000/api/meeting-initiator/create-subject', {
        method: 'POST',
        body: JSON.stringify({
            "userid": Id,
            "description": description,
            "subjecttypeid": subjectid
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token

        },
    })
        .then(response => {
            if (!response.ok) {
                return alert("لم يتم اضافة الموضوع")
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const subid = data.subjectid;
            fetch(`http://127.0.0.1:8000/uploadDOC/${subid}`, {
                method: 'GET',
            })
                .then(response => {
                    if (response.ok) {
                        // throw new Error('Network response was not ok');
                        console.log(response)
                        return response.url;
                    }
                })
                .then(url => {
                    const newWindow = window.open(url);
                    newWindow.addEventListener('submit',(event) => {
                        event.preventDefault();
                        window.location.href = 'http://127.0.0.1:5500/CreateSubject.html';
                    });
                })
        })
}


function displaySubjetsType() {
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/meeting-initiator/Subjecttype`, {
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
            document.getElementById("subjecttype").innerHTML = "";
            for (subjectty of data) {
                let content = `<option value=${subjectty.id}> ${subjectty.name}</option>`
                document.getElementById("subjecttype").innerHTML += content;
            }
        })
}