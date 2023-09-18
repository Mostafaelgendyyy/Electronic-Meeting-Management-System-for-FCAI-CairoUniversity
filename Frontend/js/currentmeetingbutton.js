function getdoctors() {
    var mi = localStorage.getItem('cm');
    console.log(mi)
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/meeting-initiator/doctorsinvited/${mi}`, {
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
            document.getElementById("doctors").innerHTML = "";
            for (doctor of data) {
                let content = `<div class="row formayainshallah">
            <div class="col-md-3">
              <div class="card border-0 h-100">
                <div class="card-body">
                  <img src="logos/avatar.png" height="70" width="70" alt="">
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="card border-0 h-0">
                <div class="card-body">
                  <p class="card-text doctorname" style="text-align:right; font-size: large;">${doctor.name}</p>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="card border-0 h-100">
                <div class="card-body">
                  <input class="chbox" type="checkbox" id=${doctor.id} name="Doc1" value="Doc1">
                </div>
              </div>
            </div>
          </div>
          <hr>`

                document.getElementById("doctors").innerHTML += content;
            }
        })
}

function getsubjects() {
    var token = localStorage.getItem('token');
    const mi = localStorage.getItem('cm');
    fetch(`http://127.0.0.1:8000/api/meeting-initiator/SubjectForMeetings/${mi}`, {
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
            // document.getElementById("subjects").innerHTML = "";
            // document.getElementById("slbutton").innerHTML = "";
            let i = 1;
            for (subjec of data) {
                const subid = subjec.subjectid
                const description = subjec.description
                const typeid = subjec.subjecttypeid
                fetch(`http://127.0.0.1:8000/api/meeting-initiator/Subjecttype/${typeid}`, {
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
                        // Process the retrieved data
                        console.log(data1);
                        const dname = data1.name;
                        let content = ` <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active"
                        aria-current="true" aria-label="Slide ${i}"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i + 1}" class="active"
                        aria-current="true" aria-label="Slide ${i + 1}"></button>`
                        document.getElementById("slbutton").innerHTML += content;

                        let content1 = `
                        <div class="carousel-item">
                            <input id="type" style="margin-bottom: 3%; margin-top: 3%; border-radius: 5px; width: 40%;"
                                placeholder="${dname}" readonly>
                            <textarea name="Subject" placeholder="موضوع 1" id="" cols="100" rows="10" disabled>${description}</textarea>
                            <textarea name="Decision" placeholder=" قرار 1" id=${subid} cols="100" rows="7"></textarea>
                            <div class="col-5">
                                <div>
                                <button type="button" onclick="attach(${subid},${i})" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal${i}">
                                    المرفقات
                                </button>

                                <!-- Modal -->
                                <div class="modal fade" id="exampleModal${i}" tabindex="-1" aria-labelledby="exampleModalLabe${i}"
                                    aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-scrollable">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabe${i}">المرفقات </h1>
                                        </div>
                                        <div class="modal-body" id="attfiles${i}">
                                        </div>
                                        <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">اغلاق</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <button class="save" onclick="clicksave(${mi},${subid})">حفظ القرار</button>
                        </div>`
                        document.getElementById("subjects").innerHTML += content1;
                        i = i + 2;
                    })
            }
        })
}

function endmeeting() {
    attendees();
    var token = localStorage.getItem('token');
    var mi = localStorage.getItem('cm');
    fetch(`http://127.0.0.1:8000/api/meeting-initiator/end-meeting/${mi}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (response.ok) {
                window.location.href = "http://127.0.0.1:5500/createmeeting.html";
                return response.json();

            }
        })
    // throw new Error('Network response was not ok');

}


function clicksave(mi, id) {
    var Decision = document.getElementById(id).value;
    console.log(Decision)
    if (Decision == "") {
        return alert(" من فضلك ادخل القرار")
    }
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/meeting-initiator/saveDecision`, {
        method: 'POST',
        body: JSON.stringify({
            "meetingid": mi,
            "subjectid": id,
            "decision": Decision
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {
                console.log("save decision done")
            }
        })
}

function attendees() {
    var mi = localStorage.getItem('cm');
    console.log(mi);
    var token = localStorage.getItem('token');
    var checkb1 = document.querySelectorAll("input[name='Doc1']");
    var attenddoc = [];
    var absentdoc = [];
    checkb1.forEach(function (checkbox) {
        if (checkbox.checked) {
            var x = { "doctorid": checkbox.id, "meetingid": mi }
            attenddoc.push(x);
        } else {
            var x = { "doctorid": checkbox.id, "meetingid": mi }
            absentdoc.push(x);
        }
    })
    console.log(attenddoc)
    console.log(absentdoc)
    fetch(`http://127.0.0.1:8000/api/meeting-initiator/addattendee`, {
        method: 'POST',
        body: JSON.stringify(attenddoc),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {
                console.log("done atendee")
            }
        })
    fetch(`http://127.0.0.1:8000/api/meeting-initiator/addabsent`, {
        method: 'POST',
        body: JSON.stringify(absentdoc),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {
                console.log("done absent")
            }
        })
}

function attach(id, i) {
    const divname = `attfiles${i}`;
    // console.log(divname)
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/attachmentsofSubjects/${id}`, {
        method: 'GET',
        // headers: {
        //     'Authorization': 'Bearer ' + token
        // }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            document.getElementById(divname).innerHTML = "";
            for (att of data) {
                const link = att.id
                const file = att.file
                let content = `
                <div class="container ">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="card border-0 h-100">
                            <div class="card-body">
                                <a class="btn btn-transparent" href="http://127.0.0.1:8000/viewAttachment/${link}" target="_blank"
                                style="background-color: transparent; border: 0px;"><img src="img/file.png"
                                    height="50" width="50" alt=""></a>
                                <!--fl href ektby esm el page.html bt3t el pdf-->
                            </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card border-0 h-100">
                            <div class="card-body">
                                <p class="card-text" style="text-align:left;">${file}<p>
                            </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>`
                document.getElementById(divname).innerHTML += content;
            }

        })
}

// function viewattach(id){
//     // const url =`http://127.0.0.1:8000/viewAttachment/${id}`
//     // window.open(url);
//     // var token = localStorage.getItem('token');
//     fetch(`http://127.0.0.1:8000/viewAttachment/${id}`, {
//         method: 'GET',
//         // headers: {
//         //     'Authorization': 'Bearer ' + token
//         // }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             console.log(response)
//             // return response.json();
//         })
//         // .then(data => {
//         //     console.log(data);
//         // })
// }

document.getElementById("pdf").addEventListener("click", function () { window.open('pdfpage.html', '_blank'); })












    