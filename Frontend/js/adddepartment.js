function adddept() {
    const form = document.getElementById('admin-form');
    deptAr = document.getElementById('textinput').value;
    deptEn = document.getElementById('textinput2').value;
    console.log(deptAr)
    console.log(deptEn)
    if(deptAr == ""){
        return alert("من فضلك ادخل اسم القسم ب اللغه العربيه")
    }
    if(deptEn == ""){
        return alert("من فضلك ادخل اسم القسم ب اللغه الانجليزيه")
    }
    var token = localStorage.getItem('token');
    fetch('http://127.0.0.1:8000/api/admin/addAdminstration', {
        method: 'POST',
        body: JSON.stringify({
            "ar_name": deptAr,
            "eng_name": deptEn
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {
                alert("تم اضافة قسم " + deptAr+' / '+deptEn + " بنجاح")
                location.reload();
            }
        }).catch(error => {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
}
function getdepartments() {
    var token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:8000/api/admin/adminstrations`, {   
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
            document.getElementById("dept").innerHTML = "";
            for (dept of data) {
                let content = `<option value=${dept.id}> ${dept.ar_name} / ${dept.eng_name}</option>`
                document.getElementById("dept").innerHTML += content;
            }
        })
}
function fun() {
    selectElement = document.getElementById('dept');
    deptId = selectElement.value;
    const form = document.getElementById('admin-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const result = confirm("هل تريد مسح هذا القسم");
        if (result) {
            deletedept(deptId);
        }
    })
    form.reset();
}

function deletedept(deptId) {

    var token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:8000/api/admin/deleteAdminstration/${deptId}`, {
        method: 'DElETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => {
            if (response.ok) {
                alert('تم حذف القسم بنجاح')
                location.reload()
            } else {
                console.error('Failed to delete meetingtype.');
            }
        })
}