const serverUrl = "https://c6381217f11e.ngrok.io/plugins";

/* 
[{
title: string
fileName: string
type: string
data: string
}]
*/
function saveCollection(data) {
  fetch(`${serverUrl}/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      collection: data,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .catch((err, uu) => {
      console.log(err);
    });
}

function saveFiles(formElement) {
  const data = new URLSearchParams();
  for (const pair of new FormData(formElement)) {
    data.append(pair[0], pair[1]);
  }

  fetch(`${serverUrl}/files`, {
    method: "post",
    body: data,
  })
    .then(function (response) {
      return response.json();
    })
    .catch((err, uu) => {
      console.log(err);
    });
}

function getSourceCode() {
  fetch(`${serverUrl}/files`, {
    method: "get",
    body: JSON.stringify({
      code: pluginData,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .catch((err, uu) => {
      console.log(err);
    });
}

function downloadCode() {
  var link = document.createElement("a");
  link.setAttribute("href", "https://alekseydemshin.github.io/zip/bundle.zip");
  link.setAttribute("download", "download");
  link.click();
}
