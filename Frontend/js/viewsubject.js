function getsubjectdata() {
  var subid = localStorage.getItem('rot')
  console.log(subid);
  var token = localStorage.getItem('token');
  var IDD = localStorage.getItem('notifiy')
  fetch(`http://127.0.0.1:8000/api/meeting-initiator/Archived/${IDD}`, {
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
      for (topic of data) {
        let subjectt;
        let meetingt;
        let i = 1;
        for (st of topic.subjecttype) {
          subjectt = st.name
        }
        for (mt of topic.meetingtypename) {
          meetingt = mt.name
        }
        if (topic.subjectData.subjectid == subid) {
          document.getElementById("viw").innerHTML = "";
          let content = `
          <div class="row">
          <div class="col-md-8">
            <br>
            <label style="font-size: x-large;">التاريخ :${topic.meetingdata.date}</label>
            <br>
            <label style="font-size: x-large;">نوع الموضوع : ${subjectt}</label>
            <br>
            <label style="font-size: x-large;">اجتماع :${meetingt}</label>
            <br>
            <br>
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
            <br>
            <textarea name="Decision" placeholder="قرار" id="" cols="100" rows="5" disabled>${topic.decision}</textarea>
            <br>
            <br>
            <textarea name="Subject" placeholder="موضوع" id="" cols="150" rows="9"
              disabled>${topic.subjectData.description}</textarea>
          </div>
          `
          document.getElementById("viw").innerHTML += content;
        }

      }
    })
}


function attach(id,i) {
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
          for(att of data){
              const link = att.id
              const file = att.file
              let content =`
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