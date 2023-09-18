// const oldsubjectsContainer = document.getElementById('oldsubjects');

// for(var i=1;i<=8;i++)
// {
// // Create the card element
// const cardElement = document.createElement('div');
// cardElement.classList.add('col');
// cardElement.innerHTML = `
//   <div class="card cardArc h-100">
//     <div class="card-body">
//       <h5 class="card-title classSub">محتوى الموضوع : ${i} </h5>
//       <p class="card-text classMeet">اسم الاجتماع :</p>
//       <p class="card-text classDate">التاريخ :</p>
//     </div>
//     <br>
//     <!-- Button trigger modal -->
//     <a href="viewsubject.html" class="btn viewbtn">
//       عرض
//     </a>
//   </div><br>
// `;

// Append the card element to the "oldsubjects" container
// oldsubjectsContainer.appendChild(cardElement);}

function getsearch() {
  form = document.getElementById("arc").addEventListener("submit", function (event) {
    event.preventDefault();
    searchkeyword = document.getElementById("sea").value;
    console.log(searchkeyword)
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/meeting-initiator/search/${searchkeyword}`, {
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
        document.getElementById("oldsubjects").innerHTML = "";
        for (subject of data) {
          var subid = subject.subjecttypeid
          const sid=subject.subjectid
          console.log(sid+"***********")
          fetch(`http://127.0.0.1:8000/api/meeting-initiator/Subjecttype/${subid}`, {
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
              let content = `<div class="card cardArc h-100">
                <div class="card-body" >
                  <p class="card-text classMeet" style="font-size: large;">نوع الموضوع / ${data.name}</p>
                  <p class="card-title classSub" style="font-size: large;">محتوى الموضوع :<br> ${subject.description}</p>
                </div>
                <br>
                <!-- Button trigger modal -->
                <a href="viewsubject.html" onclick="push(${sid})" class="btn viewbtn">
                  عرض
                </a>
              </div><br>`

              document.getElementById("oldsubjects").innerHTML += content;
            }
            )
        }
      })
  })
}

function push(id){
  console.log(id)
  localStorage.setItem('rot',id);
}