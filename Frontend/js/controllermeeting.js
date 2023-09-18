const selceteattendcontainer = document.getElementById("selcetattendee");
for(var i =1; i<=8 ; i++)
{
const form = document.createElement('form');
form.classList.add('formbody');
form.action="/action_page.php";
form.innerHTML = `
<label class="header" for="Doc${i}">${i} </label>
<br>
<label class="header" for="Doc${i}">القسم </label>
<div class="clearr"></div>
<input class="chbox" type="checkbox" id="Doc${i}" name="Doc${i}" value="Doc${i}">
`;

selceteattendcontainer.appendChild(form);
var hr = document.createElement("hr");
selceteattendcontainer.appendChild(hr);
}

function validateForm() {
    const startInput = document.getElementById('start');
    const endInput = document.getElementById('end');
    const dateInput = document.getElementById('datepicker');
    const location = document.getElementById('Location');
    const subjectname = document.getElementById('textinput');

    if (!startInput.value || !endInput.value || !dateInput.value || !location.value || !subjectname.value) {
        alert('يرجى ملء جميع الحقول المطلوبة.');
        return;
      }

    // Validate date
    const today = new Date().toISOString().split('T')[0];
    if (dateInput.value < today) {
      alert('تاريخ غير صالح. يجب أن يكون بعد اليوم الحالي.');
      return;
    }

    // Validate time
    const startTime = startInput.value;
    const endTime = endInput.value;
    if (startTime >= endTime) {
      alert('وقت الانتهاء يجب أن يكون أكبر من وقت البدء.');
      return;
    }
    else if (startTime <= endTime) {
        alert('وقت البداية يجب أن يكون اقل من وقت النهاية.');
        return;
      }

    // Form is valid
    alert('تم الإنشاء بنجاح.');
  }
  var donebutton=document.getElementById("selectDoneBtn");
  donebutton.addEventListener("click",validateForm);