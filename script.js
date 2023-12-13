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
