function update() {
    selectElement = document.getElementById('edit');
    editvalue = selectElement.value;
    let role;
    if(editvalue=="عميد" || editvalue == "وكيل" || editvalue == "رئيس قسم" ){
        role = 3;
    }else if(editvalue=="أستاذ"){
        role = 2
    }else if(editvalue=="مسؤل النظام"){
        role = 1;
    }
    var token = localStorage.getItem('token');
    var editid = localStorage.getItem('upatedid')
    console.log(editvalue)
    console.log(editid)
    console.log(role)

    fetch(`http://127.0.0.1:8000/api/admin/UpdateUSER/${editid}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            "role":role,
            "jobdescription":editvalue
            // "adminstrationid": deptid
        }),
    }).then(response => {
        if (response.ok) {
            alert("تم تعديل المستخدم بنجاج")
        } else {
            // Handle error case
            console.error('هناك خطاء في تعديل المستخدم');
        }
    })
}