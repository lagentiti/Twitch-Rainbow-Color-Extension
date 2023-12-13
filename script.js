window.onload = function() {
  if(localStorage.getItem("value") == "1") {
    document.getElementById('active').checked = true;
  };

  if(localStorage.getItem("id") !== null) {
    document.getElementById("id").value = localStorage.getItem("id");
  };

  if(localStorage.getItem("authorization") !== null) {
    document.getElementById("token").value = localStorage.getItem("authorization");
  };

  if(localStorage.getItem("clientId") !== null) {
    document.getElementById("clientId").value = localStorage.getItem("clientId");
  };

  document.getElementById("submit").addEventListener("click", active);

  setInterval(() => {
    if(localStorage.getItem("value") == "1") {
      return changeColor({
        id: localStorage.getItem("id"),
        authorization: localStorage.getItem("authorization"),
        clientId: localStorage.getItem("clientId"),
      });
    };
  }, 500);
}

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
  localStorage.setItem('value',  check);
  localStorage.setItem('clientId', document.getElementById('clientId').value);
  localStorage.setItem('id', document.getElementById('id').value);
  localStorage.setItem('authorization', document.getElementById('token').value);
};
