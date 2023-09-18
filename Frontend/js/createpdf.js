document.addEventListener("DOMContentLoaded", function () {
    generatepdf();
  });
  
  async function generatepdf() {
    var pdfname;
    const doc = document.implementation.createHTMLDocument();
    const htmlContent = doc.createElement('html');
    const head = doc.createElement('head');
    const metaCharset = doc.createElement('meta');
    metaCharset.setAttribute('charset', 'UTF-8');
    head.appendChild(metaCharset);
    const metaXUACompatible = doc.createElement('meta');
    metaXUACompatible.setAttribute('http-equiv', 'X-UA-Compatible');
    metaXUACompatible.setAttribute('content', 'IE=edge');
    head.appendChild(metaXUACompatible);
    const metaViewport = doc.createElement('meta');
    metaViewport.setAttribute('name', 'viewport');
    metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    head.appendChild(metaViewport);
    const Style = doc.createElement('style');
    Style.innerHTML = `.outer {
    border: 5px solid #000; 
    padding: 5px; 
    margin-right: 1%;
    margin-top: 1%;
  }
  
  .inner {
    border: 2px solid #000; 
    padding: 20px; 
  }
  .header{
    border: 7px double black;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 157px;
  }
  img{
    margin-top: 0px;
    padding-top: 5px;
    left: 50%;
    right: 50%;
    height: 45px;
    position: absolute;
  }
  .arabicheader{
    direction: rtl;
    position: absolute;
    right: 10px;
  }
  .arabic{
    direction: rtl;
  }
  #attend,#absent,#invited {
    direction: rtl;
    border-collapse: collapse;
    width: 100%;
  }
  #attend td,#absent td,#invited td {
    border: none;
    padding: 5px;
    text-align: right;
  }
  .english
  { 
    position: absolute;
    left: 10px;
  }
  h2{font-size: 95%;}
  .table-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: center;
  }
  .content{height: 845.938px; position: relative; direction:rtl;}
  .footer{padding-block-start: 6%;   direction:rtl;}
  .Signature {
    position: absolute;
    width: 80%;
    padding: 10px;
    align-items: center;
    display:flex;
  }
  
  .Signature p {
    margin: 0;
    font-size: 15px;
  }
  li
{
    direction: rtl;
    text-align: right;
    padding-bottom: 20px;
}
ul{
    list-style-type: none;
}
  .topic{margin-top: 25px;width:100% ;height:auto;}`;
    head.appendChild(Style);
    const title = doc.createElement('title');
    title.textContent = 'DownloadMeeting';
    head.appendChild(title);
    htmlContent.appendChild(head);
    const body = doc.createElement('body');
    try { 
        var token = localStorage.getItem('token');
                var id = localStorage.getItem('notifiy');
              const response = await fetch(`http://127.0.0.1:8000/api/meeting-initiator/InitPDFData/${id}`,{
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      console.log(response.status);
      const data = await response.json();
      const meeting = data.information;
      pdfname=`Meeting`;
      const subjects= data.meetingsubject;
      const attendlist =data.attendeeData;
      const absentlist =data.absenceData;
      const inviteds=data.invitedData;
      function getSeason(date) {
        let parts = date.split("-");
        let convertedDate = new Date(parts[0], parts[1] - 1, parts[2]);
  
        const month = convertedDate.getMonth() + 1;
        const year = convertedDate.getFullYear();
      
        if (month > 8) {
          return year + '/' + (year + 1);
        } else {
          return (year - 1) + '/' + year;
        }
      } 
      function getDayOfWeek(date) {
        let parts = date.split("-");
        let convertedDate = new Date(parts[0], parts[1] - 1, parts[2]);
  
  
        const daysOfWeek = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        const dayIndex = convertedDate.getDay(); 
        return daysOfWeek[dayIndex];
      }
      function getDistinctNames() {
        const namesSet = new Set(subjects.map(item => item.name));
        return Array.from(namesSet);
      }  
      const subjecttypes= getDistinctNames();  
      const meetingseason = getSeason(meeting.date);
      const meetingdayofweek = getDayOfWeek(meeting.date);
  
      function createpage() {
        const innerDiv = doc.createElement('div');
        innerDiv.className = "inner";
  
        const headerDiv = doc.createElement('div');
        headerDiv.className = "header";
  
        const img = doc.createElement('img');
        img.src = 'img\\Capture.JPG';
        headerDiv.appendChild(img);
  
        const arabicHeaderDiv = doc.createElement('div');
        arabicHeaderDiv.className = "arabicheader";
        arabicHeaderDiv.innerHTML = `
          <h2 style="padding-right: 20%" class="arabic">جامعة القاهرة</h2>
          <h2 style="padding-right: 10%" class="arabic">كلية الحاسبات والذكاء الإصطناعى</h2>
          <h2 style="padding-right: 11%" class="arabic">(الحاسبات و المعلومات سابقا)</h2>
          <h2 style="padding-right: 15px" class="arabic">
            كلية معتمدة من الهيئة القومية لضمان جودة التعليم والإعتماد
          </h2>
        `;
  
        const EnglishHeaderDiv = doc.createElement('div');
        EnglishHeaderDiv.className = "english";
        EnglishHeaderDiv.innerHTML = `
          <h2 style="padding-left: 25%">Cairo University</h2>
          <h2 style="padding-left: 10px">
            Faculty of Computers & Artificial Intelligence
          </h2>
          <h2 style="padding-left: 13%">
            Faculty of Computers & Information
          </h2>
          <h2 style="padding-left: 20%">Accredited by NAQAAE</h2>
          `;
          if(meeting.jobdescription==='رئيس قسم')
          {
            arabicHeaderDiv.innerHTML +=` <h2 style="padding-right: 17%" class="arabic">قسم ${meeting.arabicname} </h2>`;
            EnglishHeaderDiv.innerHTML += `        <h2 style="padding-left: 16%">Dept. of ${meeting.englishname}</h2>`;
          }     
         headerDiv.appendChild(arabicHeaderDiv);
        headerDiv.appendChild(EnglishHeaderDiv);
  
        const content = doc.createElement('div');
        content.className = "content";
        content.style.height=846;
  
        innerDiv.appendChild(headerDiv);
        innerDiv.appendChild(content);
  
        return innerDiv;
      }
      function firstpage() {
        const outerDiv = doc.createElement('div');
        outerDiv.className = 'outer';
        const innerDiv = createpage();
        outerDiv.appendChild(innerDiv);
        const content =innerDiv.lastElementChild;
        content.innerHTML =
          `     <p style="text-align: center" class="arabic">
        <strong>اجتماع ${meeting.meetingtype}</strong>
      </p>
      <p style="text-align: center" class="arabic">
        <strong>الجلسة رقم ( ${meeting.meetingid} ) بتاريخ &nbsp;&nbsp;</strong
        ><strong> ${meeting.date} </strong>
      </p>
      <p style="text-align: center"><strong>====================</strong></p>
      <p style="text-align: right" class="arabic">
      اجتمع ${meeting.meetingtype} الجلسة رقم ( ${meeting.meetingid} ) للعام الدراسى
        الجامعى  ${meetingseason}  وذلك يوم ${meetingdayofweek} الموافق <span style="direction:ltr;">${meeting.date}</span>
        الساعة ${meeting.startedtime} 
      </p>
      <br>
      <p style="text-align: right">
        <strong class="arabic">برئاسة ${meeting.name}</strong>
        <strong class="arabic"
          >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          ${meeting.jobdescription}
        </strong>
      </p>
      <p style="text-align: right"><strong>&nbsp;</strong></p>
      <p style="text-align: right" class="arabic">
        <strong> و حضور كل من السادة </strong><strong> : </strong>&nbsp;
        <br>
          <strong>ـــــــــــــــــــــــــــــــــــــــ</strong>
      </p>
      <table id="attend">
   
      </table>
      ${(absentlist.length!=0)? `
      <br>
      <br>
      <p style="text-align: right" class="arabic">
        <strong> و اعتذر عن عدم الحضور </strong><strong> : </strong>&nbsp;  
        <br>
        <strong>ــــــــــــــــــــــــــــــــــــــــــــــ</strong>
      </p>
      <table id="absent">
    
      </table>`:''}
      ${(inviteds.length!=0)? `
      <br>
      <br>
      <p style="text-align: right" class="arabic">
        <strong> و دُعي كل من</strong><strong> : </strong>  
        <br>
        <strong>ـــــــــــــــــــــــــــــــ</strong>
      </p>
      <ul id="invited">
      </ul>`:''}`;
        const attend=content.getElementsByTagName('table')[0];
        const absent=content.getElementsByTagName('table')[1];
        let newRow1 = doc.createElement('tr');
        let newRow2 = doc.createElement('tr');
        for (let i = 0; i <attendlist.length ; i++) {
          const listdata=doc.createElement('td');
          listdata.className="arabic";
          listdata.innerHTML=attendlist[i].name;
            newRow1.appendChild(listdata);
            if ((i + 1) % 3 === 0 || i ===  attendlist.length-1) {
                attend.appendChild(newRow1);
                newRow1 = doc.createElement('tr');
            }
        }
        for (let i = 0; i <absentlist.length ; i++) {
          const listdata=doc.createElement('td');
          listdata.className="arabic";
          listdata.innerHTML=absentlist[i].name;
            newRow2.appendChild(listdata);
            if ((i + 1) % 3 === 0 || i ===  absentlist.length-1) {
                absent.appendChild(newRow2);
                newRow2 = doc.createElement('tr');
            }
        }
        if(inviteds.length!=0)
        {
            const spcialguest=content.getElementsByTagName('ul')[0];
            for (let i = 0; i <inviteds.length ; i++) {
                const listdata=doc.createElement('li');
                listdata.className="arabic";
                listdata.innerHTML=inviteds[i].name;
                  spcialguest.appendChild(listdata);
              }
            // const spcialguest=content.getElementsByTagName('table')[2];
            // spcialguest.style.minWidth="50%";
            //  spcialguest.style.width="auto";
            // for (let i = 0; i < inviteds.length; i++) {
            //     let newRow3 = doc.createElement('tr');
            //     const invitename = doc.createElement('td');  
            //     const invitejob = doc.createElement('td');
            //     invitename.className = "arabic";
            //     invitename.innerHTML = inviteds[i].name;
            //     invitejob.innerHTML = `<bdi>${inviteds[i].jobdescription} </bdi> `;
            //     newRow3.appendChild(invitename);
            //     newRow3.appendChild(invitejob);
            //     spcialguest.appendChild(newRow3);
            // }
        }
        innerDiv.appendChild(content);
        body.appendChild(outerDiv);
        const pagebreak = doc.createElement('div');
        pagebreak.className = 'html2pdf__page-break';
        body.appendChild(pagebreak);
      }
  
      function lastpage() {
        const footer = doc.createElement('div');
        footer.className = 'footer';
        footer.style.height=127;
        footer.innerHTML = `
        <h2 style="text-align: center;" class="arabic">هذا وقد إنتهى الاجتماع فى تمام الساعة ${meeting.endedtime}</h2>
        <div class="Signature">
          <div style="right: 0;text-align: center;">
            <h2 class="arabic">${meeting.jobdescription}</h2>
            <h3>......................</h3>
          </div>
        </div>
      `;
        return footer;
      }
      function createTopic(subject) {
        const topic = doc.createElement("div");
        topic.className = "topic";
        topic.style.height=250;
  
        const subjectDiv = document.createElement('div');
        subjectDiv.className = 'subject';
        const index = subjecttypes.indexOf(subject.name);
        if (index !== -1) {
          subjecttypes.splice(index, 1);
          const subjectHeading = document.createElement('h1');
          subjectHeading.style.textAlign = 'center';
          subjectHeading.style.fontSize = '20px';
          subjectHeading.className = 'arabic';
          subjectHeading.innerHTML = `<strong>${subject.name}</strong>`;
          subjectDiv.appendChild(subjectHeading);
        }
        const subjectContent = document.createElement('p');
        subjectContent.style.textAlign = 'right';
        subjectContent.style.fontSize = '16px';
        subjectContent.textContent = `${subject.description}`;
  
          
        subjectDiv.appendChild(subjectContent);
  
        const decisionDiv = document.createElement('div');
        decisionDiv.className = 'decision';
  
        const decisionHeading = document.createElement('p');
        decisionHeading.style.textAlign = 'center';
        decisionHeading.style.fontSize = '20px';
        decisionHeading.innerHTML = `<strong>القرار</strong><br><strong>ــــــــــــــ</strong>`;
  
        const decisionSubheading = document.createElement('h3');
        decisionSubheading.style.textAlign = 'center';
        decisionSubheading.style.fontSize = '15px';
        decisionSubheading.className = 'arabic';
        decisionSubheading.textContent = `${subject.decision}`;
  
        decisionDiv.appendChild(decisionHeading);
        decisionDiv.appendChild(decisionSubheading);
  
        topic.appendChild(subjectDiv);
        topic.appendChild(decisionDiv);
        return topic;
  
      }
      firstpage();
      var currenttopic = 0;
      const totaltopic=subjects.length;
      const totalpage=20;
      for (var i = 1; i < totalpage; i++) {
        let topicsperpage = 0;
        const outerDiv = doc.createElement('div');
        outerDiv.className = 'outer';
  
        const innerDiv = createpage();
        outerDiv.appendChild(innerDiv);
  
        const content = innerDiv.lastElementChild;
        body.appendChild(outerDiv);
        const contentheight= 845.9;
        console.log("contentheight",contentheight);
        if (i != totalpage-1) {
  
          while (currenttopic < totaltopic-1) {
          
          const topic = createTopic(subjects[currenttopic]);
          const topicheight = 250;
            console.log("topicheight",topicheight);
            if ((topicheight + topicsperpage )< contentheight) {
              content.appendChild(topic);
              topicsperpage += topicheight;
              currenttopic++;
            }
            else {
              const pagebreak = doc.createElement('div');
              pagebreak.className = 'html2pdf__page-break';
              body.appendChild(pagebreak);
              break;
            }
          }
        }
        if(currenttopic===totaltopic-1)
        {
          const topic = createTopic(subjects[currenttopic]);
         var topicheight=250;
                  const footer = lastpage();
                  const footerheight=130;
                  if(topicheight+topicsperpage<contentheight)
                  {
                    content.appendChild(topic);
                    topicsperpage+=topicheight;
                    content.appendChild(footer);
                    body.appendChild(outerDiv);
                  }
                  break;
                }
      }
      htmlContent.appendChild(body);
    }
    catch (error) {
      console.error(`${error}`);
    }
    finally {
      const arabicElements = htmlContent.getElementsByClassName('arabic');
      for (let i = 0; i < arabicElements.length; i++) {
        arabicElements[i].innerHTML = arabicElements[i].innerHTML.replace(/ /g, '&nbsp;');
      }
      html2pdf().set({
        filename: `${pdfname}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, scrollY: 0, letterRendering: true },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      }).from(htmlContent).save();
      setTimeout(() => {
        window.close();
      }, 10000);
      };
    }
  
  
  
  
  
  