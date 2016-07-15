'use strict';

(function () {

   var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   var displayName = document.querySelector('#display-name');
   var apiUrl = appUrl + '/api/:id';

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);
      if (userObject.hasOwnProperty('error')) {
      document.querySelector("#loginButton").innerHTML = '<a href="/login">Login</a>';
      return;
    } else {
       document.querySelector("#loginButton").innerHTML = '<a href="/logout">Logout</a>';
      document.querySelector("#profileLink").innerHTML = '<a href="/profile">Profile</a>';

      if (userObject.displayName !== null && displayName !== null) {
         updateHtmlElement(userObject, displayName, 'displayName');
      } 

      if (profileId !== null) {
         updateHtmlElement(userObject, profileId, 'id');   
      }

      if (profileUsername !== null) {
         updateHtmlElement(userObject, profileUsername, 'username');   
      }
}
     
   }));
})();
