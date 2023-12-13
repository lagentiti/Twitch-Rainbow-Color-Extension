self.addEventListener('message', async event => {
  if (event.data && event.data.command === 'active') {
    chrome.storage.local.set({
      value: event.data.page.value,
      clientId: event.data.page.clientId,
      id: event.data.page.id,
      authorization: event.data.page.authorization
    });
  };
  if (event.data && event.data.command === 'value') {
    let value = await new Promise((resolve) => {
      chrome.storage.local.get(['value'], function(result) {
        resolve(result.value);
      });
    });

    event.ports[0].postMessage(value);
  };
  if (event.data && event.data.command === 'id') {
    let id = await new Promise((resolve) => {
      chrome.storage.local.get(['id'], function(result) {
        resolve(result.id);
      });
    });

    event.ports[0].postMessage(id);
  };
  if (event.data && event.data.command === 'authorization') {
    let authorization = await new Promise((resolve) => {
      chrome.storage.local.get(['authorization'], function(result) {
        resolve(result.authorization);
      });
    });

    event.ports[0].postMessage(authorization);
  };
  if (event.data && event.data.command === 'clientId') {
    let clientId = await new Promise((resolve) => {
      chrome.storage.local.get(['clientId'], function(result) {
        resolve(result.clientId);
      });
    });

    event.ports[0].postMessage(clientId);
  };
});

async function changeColor({ id, authorization, clientId }) {
  let colorChar = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
  let result = '';
  
  for(let i=1; i<=6; i++) {
    result += colorChar[Math.floor(Math.random() * colorChar.length)];
  };

  var randomColor = '%23' + result;
  var url = `https://api.twitch.tv/helix/chat/color?user_id=${id}&color=${randomColor}`;

  let response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': "Bearer " + authorization,
      'Client-Id': clientId,
      'Content-Type': 'application/json'
    }
  });

  if (response.status == 204) {
    console.log('La couleur du chat a été changée avec succès.');
  } else {
    console.log('Une erreur est survenue lors du changement de la couleur du chat.');
  };
};

setInterval(async () => {
  let value = await new Promise((resolve) => {
    chrome.storage.local.get(['value'], function(result) {
      resolve(result.value);
    });
  });

  if(value == "1") {
    let id = await new Promise((resolve) => {
      chrome.storage.local.get(['id'], function(result) {
        resolve(result.id);
      });
    });

    let authorization = await new Promise((resolve) => {
      chrome.storage.local.get(['authorization'], function(result) {
        resolve(result.authorization);
      });
    });

    let clientId = await new Promise((resolve) => {
      chrome.storage.local.get(['clientId'], function(result) {
        resolve(result.clientId);
      });
    });

    return changeColor({
      id: id,
      authorization: authorization,
      clientId: clientId,
    });
  };
}, 500);