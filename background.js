const channelId = "UCZTSIyQI4jnh_fZItGqFF1A";
const channelName = "akaruu";
const key = "AIzaSyD8oIpPF8x5pnyFde9o4tdUTAAc6hvCeRw";
const first = chrome.storage.local.get("first");
const lastVideoId = chrome.storage.local.get("id");

async function videosYoutube(max) {
  let videoLists = [];
  var url = 'https://www.googleapis.com/youtube/v3/search?key=' + key + '&channelId=' + "UCIvKNDxhxOawEegxUR-G1DA" + '&part=snippet,id&order=date&maxResults=' + max;
  
  let response = await fetch(url);
  if (response.ok) {
    let data = await response.json();
    if(max == 3) {
      for (var i in data.items) {
        var item = data.items[i];
        var video = {
          'Title': item.snippet.title,
          'Video Id': item.id.videoId,
          'Published At': item.snippet.publishedAt,
          'Description': item.snippet.description
        };
        videoLists.push(video);
      };
    } else {
      let videoTitle = data.items[0].snippet.title;
      let videoId = data.items[0].id.videoId;
  
      chrome.storage.local.get(['first'], function(result) {
        if(result.first !== undefined) {
          chrome.storage.local.get(['id'], function(result) {
            if(result.id !== videoId) {
              notifyYoutube(videoTitle);
              chrome.storage.local.set({id: videoId});
            };
          });
        } else {
          chrome.storage.local.set({first: "1"});
        };
      });
    };
  } else {
    console.log("Erreur HTTP: " + response.status);
  }

  return videoLists;
};

function notifyYoutube(title) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "src/img/youtube-1.png",
    title: "Akaruu - Nouvelle vidéo !",
    message: title
  });
};

setInterval(() => {
  videosYoutube(1);
  console.log("interval");
}, 60000);