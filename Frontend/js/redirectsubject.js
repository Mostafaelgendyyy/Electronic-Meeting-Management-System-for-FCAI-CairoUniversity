var checkboxIds = [];
for(var i =1; i<= 7;i++)
{
  var id= `c${i}`;
var card = document.createElement("div");
card.className = "card crdsize";
var cardBody = document.createElement("div");
cardBody.className = "card-body";
var blockquote = document.createElement("blockquote");
blockquote.className = "blockquote mb-0 ";

var label1 = document.createElement("label");
label1.setAttribute("for", id);
label1.innerText =  `قرار : ${i}`;
blockquote.appendChild(label1);
blockquote.appendChild(document.createElement("br"));
var label2 = document.createElement("label");
label2.setAttribute("for", id);
label2.innerText = "موضوع :";
blockquote.appendChild(label2);
blockquote.appendChild(document.createElement("br"));

var checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.className = "checkbox22";
checkbox.id = id;
blockquote.appendChild(checkbox);

cardBody.appendChild(blockquote);

card.appendChild(cardBody);

var container = document.getElementById("MeetingContainer1");
container.appendChild(card);
checkboxIds.push(id);
}
function handleCheckboxChange(checkboxId) {
    var checkbox = document.getElementById(checkboxId);
    var label = checkbox.parentNode.querySelectorAll("label");
    var container = document.getElementById("MeetingContainer2");
  
    if (checkbox.checked) {

      var card = document.createElement("div");
      card.className = "card crdsize";
      card.id = checkboxId;
      var cardbody = document.createElement("div");
      cardbody.className = "card-body";
      var blockquote = document.createElement("blockquote");
      blockquote.className = "blockquote mb-0";
      var unorderedlist = document.createElement("ul");
      unorderedlist.style = "list-style-type: none;";
      var listItem1 = document.createElement("li");
      var listItem2 = document.createElement("li");
      listItem1.innerHTML = label[0].innerHTML;
      unorderedlist.appendChild(listItem1);
      listItem2.innerHTML = label[1].innerHTML;
      unorderedlist.appendChild(listItem2);
  
      blockquote.appendChild(unorderedlist);
      cardbody.appendChild(blockquote);
      card.appendChild(cardbody);
      container.appendChild(card);
    } else {
      var cards = container.getElementsByClassName("card crdsize2");
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].id === checkboxId) {
          container.removeChild(cards[i]);
          break;
        }
      }
    }
  }
  
  
  checkboxIds.forEach(function(checkboxId) {
    document.getElementById(checkboxId).addEventListener("change", function() {
      handleCheckboxChange(checkboxId);
    });
  });
  