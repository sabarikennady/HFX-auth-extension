// document.addEventListener('DOMContentLoaded', function () {
document.getElementById("hfsubmit").addEventListener("click", function(){
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
chrome.tabs.query({active: true, currentWindow: true }, tabs => {
    let tab = tabs[0].url;
    var pathArray = tab.split( '/' );
    var protocol = pathArray[0];
    var host = pathArray[2];
    var origin = protocol + '//' + host;
    var url = `${origin}/api/v2/staff-login/`
  
  var data = JSON.stringify({
    username: username,
    password: password
  })

  var requestOptions = {
   headers: { "cookie": true,"Content-Type":"application/json"},
   method: 'POST',
   body: data
  };

	fetch(url, requestOptions)
  .then(response => response.json())
  .then(result => {document.getElementById('authtoken').innerHTML= result.auth_token })
  .catch(error => {document.getElementById('error').innerHTML = error.message });

});
});

