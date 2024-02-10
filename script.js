window.onload = function() {
  var messageChannelValue = new MessageChannel();
  var messageChannelId = new MessageChannel();
  var messageChannelToken = new MessageChannel();
  var messageChannelclientId = new MessageChannel();

  navigator.serviceWorker.controller.postMessage({command:"value"}, [messageChannelValue.port2]);
  navigator.serviceWorker.controller.postMessage({command:"id"}, [messageChannelId.port2]);
  navigator.serviceWorker.controller.postMessage({command:"authorization"}, [messageChannelToken.port2]);
  navigator.serviceWorker.controller.postMessage({command:"clientId"}, [messageChannelclientId.port2]);

  
  messageChannelValue.port1.onmessage = function(event) {
    if(event.data == "1") {
      document.getElementById('active').checked = true;
    };
  };

  messageChannelId.port1.onmessage = function(event) {
    document.getElementById("id").value = event.data;
  };

  messageChannelToken.port1.onmessage = function(event) {
    document.getElementById("token").value = event.data;
  };

  messageChannelclientId.port1.onmessage = function(event) {
    document.getElementById("clientId").value = event.data;
  };
  
  document.getElementById("submit").addEventListener("click", () => {
    navigator.serviceWorker.controller.postMessage({
      command: "active", 
      page: {
        value: document.getElementById('active').checked ? 1 : 0,
        clientId: document.getElementById('clientId').value,
        id: document.getElementById('id').value,
        authorization: document.getElementById('token').value
      }
    });
  });
};
