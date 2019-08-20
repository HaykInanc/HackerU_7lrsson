/*https://www.instagram.com/graphql/query/?query_hash=f12c9ec5e46a3173b2969c712ad84744&variables={%22tag_name%22:%22%D1%86%D0%B2%D0%B5%D1%82%D1%8B%22,%22first%22:1000}*/

function loadData(query){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       AJAXHandler(this.responseText);
    }
  };
  xhttp.open("GET", `https://www.instagram.com/graphql/query/?query_hash=f12c9ec5e46a3173b2969c712ad84744&variables={"tag_name":"${query.toLowerCase()}","first":1000}`, true);
  xhttp.send();
}

function AJAXHandler(jsonData){
  var contentElem = document.querySelector('.content');
  contentElem.innerHTML = '';
  var ulElem = document.createElement('ul');

  var data = JSON.parse(jsonData);
  var dataArr = data["data"]["hashtag"]["edge_hashtag_to_media"]["edges"];
  console.log(dataArr[0])
  for (let i=0; i<dataArr.length; i++){
    var liElem = document.createElement('li');
    var display_urlElem = document.createElement('div');
    var accessibility_captionElem = document.createElement('p');

    display_urlElem.classList.add('image');
    display_urlElem.style.backgroundImage = `url("${dataArr[i]["node"]['display_url']}")`
    accessibility_captionElem.innerText = dataArr[i]["node"]['accessibility_caption'];
    
    liElem.appendChild(display_urlElem);
    liElem.appendChild(accessibility_captionElem);
    ulElem.appendChild(liElem);
  }
  contentElem.appendChild(ulElem);
}

function buttonHandler(){
  var inputData = document.querySelector('.searchBlock input').value;
  loadData(inputData);
}

document.querySelector('.searchBlock .button').addEventListener('click', function(){buttonHandler();})