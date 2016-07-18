'use strict';

(function() {

    var profileId = document.querySelector('#profile-id') || null;
    var profileUsername = document.querySelector('#profile-username') || null;
    var displayName = document.querySelector('#display-name');
    
    var apiUrl = appUrl + '/api/:id';
    var twitterId;

    function updateHtmlElement(data, element, userProperty) {
        element.innerHTML = data[userProperty];
    }

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {
        var userObject = JSON.parse(data);
        if (userObject.hasOwnProperty('error')) {
            document.querySelector("#loginButton").innerHTML = '<a href="/login">Login</a>';
            return;
        } else {
            document.querySelector("#loginButton").innerHTML = '<a href="/logout">Logout</a>';
            document.querySelector("#profileLink").innerHTML = '<a href="/profile">Profile</a>';
            document.querySelector("#uploadLink").innerHTML = '<a href="/upload">Upload</a>';

            if (userObject.displayName !== null && displayName !== null) {
                updateHtmlElement(userObject, displayName, 'displayName');
            }

            if (profileId !== null) {
                twitterId = profileId;
                updateHtmlElement(userObject, profileId, 'id');
            }

            if (profileUsername !== null) {
                updateHtmlElement(userObject, profileUsername, 'username');
            }
        }

    }));

    // if home page - load all community images by running getImages function
  if (window.location.pathname === "/") {
        ajaxFunctions.ajaxRequest('GET', appUrl + "/images/all" , getImages);
       
      }
     
     // main get all images function 
     function getImages (data){
          var response = JSON.parse(data);
          console.log(JSON.stringify(response));
          var output = "";
           for (var i = 0; i < response.length; i++) {
               var imageURL = response[i].imageURL; 
               var imageCaption = response[i].imageCaption; 
               var user = response[i].twitterID; ;
               var likes = response[i].likes; ;
               output += '<img src="' + imageURL +'" class="img-rounded img-book" alt="...">';
               output += '<h3>' + imageCaption + '</h3>'
               output += '<p>' + user + '<p>';
               output += '<p>Likes:' + likes + '</p>'
               console.log(output);
           }
           document.querySelector('#images').innerHTML = output;
     }
      

    //upload form jquery
    $("#uploadForm").bind('submit', function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        var imageURL = $("#imageURL").val();
        var imageCaption = $("#imageCaption").val();
        var uploadURL = appUrl + '/upload/api?imageURL=' + imageURL + '&imageCaption=' + imageCaption;
        ajaxFunctions.ajaxRequest('POST', uploadURL, function() {
             $("#imageCaption").val('');
        $("#imageURL").val('');
        return false;
        });
        
    });
})();