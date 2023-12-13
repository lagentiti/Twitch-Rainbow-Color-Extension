function setCookieValue(value) {
  return localStorage.setItem('value', value);
};

function setCookieId(id) {
  return localStorage.setItem('id', id);
};

function setCookieClientId(clienId) {
  return localStorage.setItem('clientId', clienId);
};

function setCookieAuthorization(Authorization) {
  return localStorage.setItem('authorization', Authorization);
};

function changeColor({ id, authorization, clientId }) {
  var xhr = new XMLHttpRequest();

  let colorChar = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
  let result = '';
  
  for(let i=1; i<=6; i++) {
    result += colorChar[Math.floor(Math.random() * colorChar.length)];
  };

  var randomColor = '%23' + result;

  xhr.open('PUT', `https://api.twitch.tv/helix/chat/color?user_id=${clientId}&color=${randomColor}`, true);
  xhr.setRequestHeader('Authorization', "Bearer " + authorization);
  xhr.setRequestHeader('Client-Id', id);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 204) {
      console.log('La couleur du chat a été changée avec succès.');
    } else if (xhr.readyState == 4) {
      console.log('Une erreur est survenue lors du changement de la couleur du chat.');
    };
  };
  
  return xhr.send();
};

function active() {
  if(document.getElementById('active').checked == true) {
    var check = 1;
  } else {
    var check = 0;
  };
  setCookieValue(check);
  setCookieClientId(document.getElementById('clientId').value);
  setCookieId(document.getElementById('id').value);
  setCookieAuthorization(document.getElementById('token').value);
  return 0;
};

setInterval(() => {
  if(localStorage.getItem("value") == "1") {
    return changeColor({
      id: localStorage.getItem("id"),
      authorization: localStorage.getItem("authorization"),
      clientId: localStorage.getItem("clientId"),
    });
  };
}, 500);