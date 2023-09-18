function upcommingmeeting() {
  var ID = localStorage.getItem('notifiy');
  var token = localStorage.getItem('token');
  fetch(`http://127.0.0.1:8000/api/doctor/upcomingMeeting/${ID}`, {
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
      document.getElementById("upcomming").innerHTML = "";
      var IDD = data.meetingtypeid
      const date = data.date
      const startedtime = data.startedtime
      fetch(`http://127.0.0.1:8000/api/doctor/Meetingtype/${IDD}`, {
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
        .then(data1 => {
          // Process the retrieved data
          console.log(data1);
          const mtype = data1.name
          fetch(`http://127.0.0.1:8000/api/doctor/place/${IDD}`, {
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
            .then(data2 => {
              // Process the retrieved data
              console.log(data2);
              const placename = data2.placename
              let content = `
              <div class="left1Layer1">
                <label class="h2-1">
                  الاجتماعات القادمة
                </label>
                <label class="h3-1">
                  نوع الاجتماع: ${mtype}
                </label>
                <label class="h3-2">
                  المكان: ${placename}
                </label>
                <label class="h3-3">
                  التاريخ: ${date}
                </label>
                <br>
                <label class="h3-4">
                  الساعه: ${startedtime}
                </label>
              </div>`
              document.getElementById("upcomming").innerHTML += content;
            })
        })
    })
}

function getnotifications() {
  var ID = localStorage.getItem('notifiy');
  var token = localStorage.getItem('token');
  fetch(`http://127.0.0.1:8000/api/doctor/notifications/${ID}`, {
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

      document.getElementById("notificationtable").innerHTML = "";
      for (notification of data) {
        var IDD = notification.meeting.meetingtypeid
        const nname = notification.initiator.name;
        const stime=notification.meeting.startedtime
        const dat = notification.meeting.date
        const mi = notification.meeting.meetingid
        fetch(`http://127.0.0.1:8000/api/doctor/Meetingtype/${IDD}`, {
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
          .then(data1 => {
            // Process the retrieved data
            console.log(data1);
            const mtype = data1.name
            fetch(`http://127.0.0.1:8000/api/doctor/place/${IDD}`, {
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
              .then(data2 => {
                // Process the retrieved data
                console.log(data2);
                const placename = data2.placename
                let content = `
                  <div class="card cardu">
                  <div class="card-body" class="forPlaces">
                    <blockquote class="blockquote mb-0" style="font-family: 'Amiri', serif;">
                    <p>يدعوكم  ${nname} لحضور اجتماع ${mtype} ,وذلك في تمام الساعه/
                    ${stime} ,الموافق/ ${dat} ,في/ ${placename}</p>
                    </blockquote>
                    <hr>
                    <div class="col-5">
                      <div>
                        <button type="button" onclick="meetinglist(${ID} ,${mi})" class="agenda" data-bs-toggle="modal" data-bs-target="#exampleModal3">
                          محضر الاجتماع 
                        </button>
                        <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel"
                          aria-hidden="true">
                          <div class="modal-dialog modal-dialog-scrollable">
                            <div class="modal-content">
                              <div class="modal-header">
                                  <h1 class="modal-title fs-5" id="exampleModalLabel">الموضوع</h1>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    style="margin-left: 0;"></button>
                                </div>
                              <div class="modal-body" id="mlist">
                                <div>
                                  <div class="container" id="">
                                    <p class="card-text" style="text-align:right;">نوع الموضوع: </p>
                                    <textarea placeholder="الموضوع" cols="57" rows="7" disabled> </textarea>
                                  </div>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button type="submit" onclick="acceptRequest(${ID} ,${mi})" class="accept">
                          الموافقه
                        </button>

                        <button type="submit" onclick="rejectRequest(${ID} ,${mi})" class="reject">
                          الاعتذار عن الحضور
                        </button>
                      </div>
                    </div>
                  </div>
                </div>  `
                document.getElementById("notificationtable").innerHTML += content;
              })
          })
    }
  })
}


function acceptRequest(Idd, mId) {
  console.log(Idd, mId)
  var token = localStorage.getItem('token');
  fetch(`http://127.0.0.1:8000/api/doctor/acceptRequest`, {
    method: 'POST',
    body: JSON.stringify({
      "doctorid": Idd,
      "meetingid": mId
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + token
    },
  })
    .then(response => {
      if (response.ok) {
        alert("تم قبول الدعوه")
      }
    })
}
function rejectRequest(Idd, mId) {
  var token = localStorage.getItem('token');
  fetch(`http://127.0.0.1:8000/api/doctor/rejectRequest`, {
    method: 'POST',
    body: JSON.stringify({
      "doctorid": Idd,
      "meetingid": mId
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + token
    },
  })
    .then(response => {
      if (response.ok) {
        alert("تم الاعتذر")
      }
    })
}

function meetinglist(Idd, mId) {
  var token = localStorage.getItem('token');
  fetch(`http://127.0.0.1:8000/api/doctor/SubjectForMeetings`, {
    method: 'POST',
    body: JSON.stringify({
      "doctorid": Idd,
      "meetingid": mId
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + token
    },
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
      document.getElementById("mlist").innerHTML = "";
      for (subject of data) {
        const tex = subject.description
        let subid = subject.subjecttypeid
        fetch(`http://127.0.0.1:8000/api/doctor/Subjecttype/${subid}`, {
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
            // Process the retrieved data
            console.log(da);
            var stype = da.name
            let content = `
              <div>
              <div class="container">
                <p class="card-text" style="text-align:right;">${stype}: </p>
                <textarea placeholder="الموضوع" cols="57" rows="7" disabled> ${tex} </textarea>
              </div>
            </div>
              `
            document.getElementById("mlist").innerHTML += content;
          })
      }

    })
} 
