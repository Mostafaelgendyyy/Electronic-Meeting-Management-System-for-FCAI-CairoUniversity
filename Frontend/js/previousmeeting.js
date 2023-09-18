const attendeeContainer = document.getElementById('attendeecontainer');
for(var i=1; i<=8 ;i++)
{
const row = document.createElement('div');
row.classList.add('row');

const col1 = document.createElement('div');
col1.classList.add('col-md-4');

const card1 = document.createElement('div');
card1.classList.add('card', 'border-0', 'h-100');

const cardBody1 = document.createElement('div');
cardBody1.classList.add('card-body');

const image1 = document.createElement('img');
image1.src = 'logos/avatar.png';
image1.setAttribute('height', '70');
image1.setAttribute('width', '70');

cardBody1.appendChild(image1);
card1.appendChild(cardBody1);
col1.appendChild(card1);

const col2 = document.createElement('div');
col2.classList.add('col-md-8');

const card2 = document.createElement('div');
card2.classList.add('card', 'border-0', 'h-100');

const cardBody2 = document.createElement('div');
cardBody2.classList.add('card-body');

const text1 = document.createElement('p');
text1.classList.add('card-text');
text1.style.textAlign = 'right';
text1.textContent = 'الاسم: '+i;

const text2 = document.createElement('p');
text2.classList.add('card-text');
text2.style.textAlign = 'right';
text2.textContent = 'القسم: ';

cardBody2.appendChild(text1);
cardBody2.appendChild(document.createElement('br'));
cardBody2.appendChild(text2);
card2.appendChild(cardBody2);
col2.appendChild(card2);

row.appendChild(col1);
row.appendChild(col2);

attendeeContainer.appendChild(row);

attendeeContainer.appendChild(document.createElement('hr'));
}

var container1 = document.getElementById("meetingtable");
for(var i = 1; i<=8 ; i++)
{
var row = document.createElement("div");
row.className = "row";
row.id= `r${i}`;
var col1 = document.createElement("div");
col1.className = "col-md-3";
var card1 = document.createElement("div");
card1.className = "card border-0 h-100";
var cardBody1 = document.createElement("div");
cardBody1.className = "card-body";
var link1 = document.createElement("a");
link1.className = "btn btn-transparent";
link1.href = "btn1.html";
link1.style.backgroundColor = "transparent";
link1.style.border = "0px";
var img1 = document.createElement("img");
img1.src = "img/file.png";
img1.height = "50";
img1.width = "50";
link1.appendChild(img1);
cardBody1.appendChild(link1);
card1.appendChild(cardBody1);
col1.appendChild(card1);
row.appendChild(col1);

var col2 = document.createElement("div");
col2.className = "col-md-6";
var card2 = document.createElement("div");
card2.className = "card border-0 h-100";
var cardBody2 = document.createElement("div");
cardBody2.className = "card-body";
var texts = [`عن: ${i}`];
texts.forEach(function(text) {
  var cardText = document.createElement("p");
  cardText.textContent = text;
  cardText.className = "card-text";
  cardText.style.textAlign = "right";
  cardBody2.appendChild(cardText);
});
card2.appendChild(cardBody2);
col2.appendChild(card2);
row.appendChild(col2);

var col3 = document.createElement("div");
col3.className = "col-md-3";
var card3 = document.createElement("div");
card3.className = "card border-0 h-100";
var cardBody3 = document.createElement("div");
cardBody3.className = "card-body";
card3.appendChild(cardBody3);
col3.appendChild(card3);
row.appendChild(col3);

container1.appendChild(row);

var hr = document.createElement("hr");
container1.appendChild(hr);
}