// var container1 = document.getElementById("meetingtable");
// for (var i = 1; i <= 8; i++) {
//   var row = document.createElement("div");
//   row.className = "row";
//   row.id = `r${i}`;
//   var col1 = document.createElement("div");
//   col1.className = "col-md-3";
//   var card1 = document.createElement("div");
//   card1.className = "card border-0 h-100";
//   var cardBody1 = document.createElement("div");
//   cardBody1.className = "card-body";
//   var link1 = document.createElement("a");
//   link1.className = "btn btn-transparent";
//   link1.href = "btn1.html";
//   link1.style.backgroundColor = "transparent";
//   link1.style.border = "0px";
//   var img1 = document.createElement("img");
//   img1.src = "img/file.png";
//   img1.height = "50";
//   img1.width = "50";
//   link1.appendChild(img1);
//   cardBody1.appendChild(link1);
//   card1.appendChild(cardBody1);
//   col1.appendChild(card1);
//   row.appendChild(col1);

//   var col2 = document.createElement("div");
//   col2.className = "col-md-6";
//   var card2 = document.createElement("div");
//   card2.className = "card border-0 h-100";
//   var cardBody2 = document.createElement("div");
//   cardBody2.className = "card-body";
//   var texts = [`عن: ${i}`, "من :"];
//   texts.forEach(function (text) {
//     var cardText = document.createElement("p");
//     cardText.textContent = text;
//     cardText.className = "card-text";
//     cardText.style.textAlign = "right";
//     cardBody2.appendChild(cardText);
//   });
//   card2.appendChild(cardBody2);
//   col2.appendChild(card2);
//   row.appendChild(col2);

//   var col3 = document.createElement("div");
//   col3.className = "col-md-3";
//   var card3 = document.createElement("div");
//   card3.className = "card border-0 h-100";
//   var cardBody3 = document.createElement("div");
//   cardBody3.className = "card-body";
//   var button = document.createElement("button");
//   button.style.backgroundColor = "transparent";
//   button.style.border = "0px";
//   button.addEventListener("click", function () {
//     confirmRemoveRow(this);
//   });
//   var img2 = document.createElement("img");
//   img2.src = "img/bin.png";
//   img2.height = "25";
//   img2.width = "25";
//   button.appendChild(img2);
//   cardBody3.appendChild(button);
//   card3.appendChild(cardBody3);
//   col3.appendChild(card3);
//   row.appendChild(col3);

//   container1.appendChild(row);

//   var hr = document.createElement("hr");
//   container1.appendChild(hr);
// }
// function confirmRemoveRow(button) {
//   var confirmed = confirm("هل انت متأكد من الغاء اجتماع؟");
//   if (confirmed) {
//     var row = button.closest(".row");
//     var hr = row.nextElementSibling;
//     row.parentNode.removeChild(row);
//     if (hr.tagName === "HR") {
//       hr.parentNode.removeChild(hr);
//     }
//   }
// }

// const attendContainer = document.getElementById('attendcontianer');

// for (var i = 1; i <= 8; i++) {
//   const rowElement = document.createElement('div');
//   rowElement.classList.add('row');
//   rowElement.innerHTML = `
//   <div class="col-md-4">
//     <div class="card border-0 h-100">
//       <div class="card-body">
//         <img src="logos/avatar.png" height="70" width="70" alt="">
//       </div>
//     </div>
//   </div>
//   <div class="col-md-8">
//     <div class="card border-0 h-100">
//       <div class="card-body">
//         <p class="card-text" style="text-align:right;">القسم: <br> الاسم : ${i}</p>
//       </div>
//     </div>
//   </div>
// `;
//   // selceteattendcontainer.appendChild(form);
//   // var hr = document.createElement("hr");
//   // selceteattendcontainer.appendChild(hr);
// }

// function validateForm() {
//   const startInput = document.getElementById('start');
//   const endInput = document.getElementById('end');
//   const dateInput = document.getElementById('datepicker');
//   const location = document.getElementById('Loc');
//   const subjectname = document.getElementById('textinput');

//   if (!startInput.value || !endInput.value || !dateInput.value || !location.value || !subjectname.value) {
//     alert('يرجى ملء جميع الحقول المطلوبة.');
//     return;
//   }

//   // Validate date
//   const today = new Date().toISOString().split('T')[0];
//   if (dateInput.value < today) {
//     alert('تاريخ غير صالح. يجب أن يكون بعد اليوم الحالي.');
//     return;
//   }

//   // Validate time
//   const startTime = startInput.value;
//   const endTime = endInput.value;
//   if (startTime >= endTime) {
//     alert('وقت الانتهاء يجب أن يكون أكبر من وقت البدء.');
//     return;
//   }
//   else if (startTime <= endTime) {
//     alert('وقت البداية يجب أن يكون اقل من وقت النهاية.');
//     return;
//   }

//   // Form is valid
//   alert('تم الإنشاء بنجاح.');
// }
// var donebutton = document.getElementById("selectDoneBtn");
// donebutton.addEventListener("click", validateForm);

// <-------------------------------------------------------->
//create meeting

// <-------------------------------------------------------->

function getplaces() {
  var token = localStorage.getItem('token');
  fetch(`http://127.0.0.1:8000/api/meeting-initiator/places`, {
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
      document.getElementById("Loc").innerHTML = "";
      for (place of data) {
        let content = `<option value=${place.id}> ${place.placename}</option>`
        document.getElementById("Loc").innerHTML += content;
      }
    })
}

function getdept() {
  var token = localStorage.getItem('token');
  fetch(`http://127.0.0.1:8000/api/meeting-initiator/adminstrations`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + token
    },
  })
    .then(response => {
      // Check if the response is successful
      return response.json();
    })
    .then(data => {
      // Process the retrieved data
      console.log(data);
      document.getElementById("selectdept").innerHTML = "";
      for (dept of data) {
        console.log(dept);
        let content = `<option value=${dept.id}>${dept.ar_name}</option>`
        document.getElementById("selectdept").innerHTML += content;
      }

    })
}

function fun() {
  selectElement = document.getElementById('selectdept');
  var deptId = selectElement.value;
  var ID = localStorage.getItem('notifiy');
  var token = localStorage.getItem('token');

  fetch(`http://127.0.0.1:8000/api/meeting-initiator/DoctorsandInitiators/${ID}/${deptId}`, {
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
      document.getElementById("doctorgroup").innerHTML = "";
      for (doctor of data) {
        let content = `
            <form action="/action_page.php" class="formbody">
              <label class="header" for="Doc1">${doctor.name}</label>
              <div class="clearr"></div>
              <input class="chbox" onclick="selecte(${doctor.id})" type="checkbox" id=${doctor.id} name="Doc1" value="Doc1">
            </form>
            <hr>`
        document.getElementById("doctorgroup").innerHTML += content;
      }
    })
}

function getmeetingtype() {
  var token = localStorage.getItem('token');
  fetch(`http://127.0.0.1:8000/api/meeting-initiator/Meetingtype`, {
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
      document.getElementById("meeting").innerHTML = "";
      for (meeting of data) {
        let content = `<option value= ${meeting.id} >${meeting.name}</option>`
        document.getElementById("meeting").innerHTML += content;
      }
    })
}
function upcommingmeeting() {
  var ID = localStorage.getItem('notifiy');
  var token = localStorage.getItem('token');
  console.log(token)
  fetch(`http://127.0.0.1:8000/api/meeting-initiator/upcoming/${ID}`, {
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
      document.getElementById("upcomming").innerHTML = "";
      const placeid = data.placeid
      const date = data.date
      const startedtime = data.startedtime
      let subid = data.meetingtypeid
      fetch(`http://127.0.0.1:8000/api/meeting-initiator/Meetingtype/${subid}`, {
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
          const mtype = da.name
          fetch(`http://127.0.0.1:8000/api/meeting-initiator/place/${placeid}`, {
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
              const placen = data1.placename
              let content = `
            <div class="left1Layer1">
              <label class="h2-1">
                الاجتماعات القادمة
              </label>
              <label class="h3-1">
                نوع الاجتماع: ${mtype}
              </label>
              <label class="h3-2">
                المكان: ${placen}
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
function showinvited() {
  var token = localStorage.getItem('token');
  fetch(`http://127.0.0.1:8000/api/meeting-initiator/invited`, {
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
      document.getElementById("invited").innerHTML = "";
      for (invite of data) {
        let content = `
        <form action="/action_page.php" class="formbody">
        <label class="header" for="Doc2">${invite.name}</label>
        <br>
        <label class="header" for="Doc2">${invite.jobdescription}</label>
        <div class="clearr"></div>
        <input class="chbox" id=${invite.id} type="checkbox" name="Doc2">
        </form>
        <hr>`
        document.getElementById("invited").innerHTML += content;
      }
    })
}

const allDoctorsInvites = []
function selecte(ID) {
   var checkbox = document.getElementById(ID);
    if (checkbox.checked) {
      allDoctorsInvites.push(ID);
    }else{
      allDoctorsInvites.pop(ID)
    }
    console.log(allDoctorsInvites)
}
function createmeeting() {
  const ID = localStorage.getItem('notifiy');
  const token = localStorage.getItem('token');
  const job = localStorage.getItem('job')

  selectElement = document.getElementById('meeting');
  const meetingtyid = selectElement.value;

  selectElement = document.getElementById('Loc');
  const placeid = selectElement.value;

  const meetingdate = document.getElementById('datepicker').value;
  const meetingtime = document.getElementById('start').value;

  console.log(ID, token, job, meetingtyid, placeid, meetingdate, meetingtime)
  var checkboxes = document.querySelectorAll("input[name='Doc2']");
  const checkedinvited = [];
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      // var x = {"invitedid": checkbox.id, "meetingid":meid}
      checkedinvited.push(checkbox.id);
    }
  })

  // var checkb = document.querySelectorAll("input[name='Doc1']");
  // const checkeddoc = [];
  // checkb.forEach(function (checkbox) {
  //   if (checkbox.checked) {
  //     // var x = {"invitedid": checkbox.id, "meetingid":meid}
  //     checkeddoc.push(checkbox.id);
  //   }
  // })
  console.log(allDoctorsInvites)
  console.log(checkedinvited)

  fetch(`http://127.0.0.1:8000/api/meeting-initiator/create-Meeting`, {
    method: 'POST',
    body: JSON.stringify({
      "initiatorid": ID,
      "placeid": placeid,
      "date": meetingdate,
      "meetingtypeid": meetingtyid,
      "startedtime": meetingtime
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + token
    },
  })
    .then(response => {
      // Check if the response is successful
      if (response.ok) {
        alert('تم انشاء الاجتماع بنجاح')
      }

      return response.json();
    })
    .then(data => {
      // Process the retrieved data
      console.log(data);
      const meeid = data.meetingid;
      checkgroup(meeid);
      let inve = []
      for (inv of checkedinvited) {
        var x = { "invitedid": inv, "meetingid": meeid }
        inve.push(x);
      }
      let doc = []
      for (inv2 of allDoctorsInvites) {
        var y = { "doctorid": inv2, "meetingid": meeid }
        doc.push(y);
      }
      console.log(doc)
      fetch(`http://127.0.0.1:8000/api/meeting-initiator/Request-invited`, {
        method: 'POST',
        body: JSON.stringify(inve),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + token
        },
      })
      fetch(`http://127.0.0.1:8000/api/meeting-initiator/request-doctor/${ID}`, {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + token
        },
      })
    })
}

function checkgroup(mid) {
  var ID = localStorage.getItem('notifiy');
  var token = localStorage.getItem('token');
  var check = document.getElementById('Doc3');
  if (check.checked) {
    fetch(`http://127.0.0.1:8000/api/meeting-initiator/RequestGroup/${ID}/${mid}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + token
      },
    })
      .then(response => {
        // Check if the response is successful
        if (response.ok) {
          alert('تم دعوة المجموعه بنجاح')
        }

        return response.json();
      })
      .then(data => {
        // Process the retrieved data
        console.log(data);
      })
  }
}

function showUser() {
  var ID = localStorage.getItem('notifiy');
  var token = localStorage.getItem('token');
  fetch(`http://127.0.0.1:8000/api/meeting-initiator/User/${ID}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + token
    },
  })
    .then(response => {
      // Check if the response is successful
      return response.json();
    })
    .then(data => {
      // Process the retrieved data
      console.log(data);
      job = data.jobdescription
      localStorage.setItem('job', job);
      if (job != "عميد") {
        document.getElementById("invits").style.display="none";
      }
    })
}

function getmeetingid(){
  var ID = localStorage.getItem('notifiy');
  var token = localStorage.getItem('token');
  fetch(`http://127.0.0.1:8000/api/meeting-initiator/currentMeeting/${ID}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + token
    },
  })
    .then(response => {
      // Check if the response is successful
      return response.json();
    })
    .then(data => {
      // Process the retrieved data
      console.log(data);
      console.log(data.meetingid)
      localStorage.setItem('cm',data.meetingid)
      }
    )
}
