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
    console.log(JSON.stringify(userObject));
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
    
      if (userObject.id !== null) {
        twitterId = userObject.id;
      }
      if (profileId !== null) {
      //  twitterId = profileId;
        updateHtmlElement(userObject, profileId, 'id');
      }

      if (profileUsername !== null) {
        updateHtmlElement(userObject, profileUsername, 'username');
      }
    }

  }));

  // if home page - load all community images by running getImages function
  if (window.location.pathname === "/") {
    ajaxFunctions.ajaxRequest('GET', appUrl + "/images/all", getImages);

  }
  
  // if wall page - load all of user's images by running getWall function
  if (window.location.pathname.slice(0,6) === "/wall/"){
    var user = window.location.pathname.slice(6)
    ajaxFunctions.ajaxRequest('GET', appUrl + "/user/" + user, getImages);
  }


  function getWall(data){
    console.log(data);
    
  }

  // main get all images function 
  function getImages(data) {
    var response = JSON.parse(data);
  
    var output = "<div class='grid'>";
    for (var i = 0; i < response.length; i++) {
      output += "<div class='grid-item text-center'>"
      var imageURL = response[i].imageURL;
      var imageCaption = response[i].imageCaption;
      var user = response[i].username;
      var likes = response[i].likes;
      var userID = response[i].twitterID;
    
      var dbID = response[i]['_id'];
      
      if(userID === twitterId){
        output += '<div class="pull-right delete-link"><a href="' + appUrl + '/delete/' + dbID + '">X</a></div>';
      }
      output += '<div class="img-space">';
      output += '<img src="' + imageURL + '" class="img-rounded img-main" alt="...">';
      output += '</div>';
      output += '<h3>' + imageCaption + '</h3>';
      output += '<p><a href="/wall/' + userID + '">' + user + '</a><p>';
      output += '<p>Likes:' + likes + '</p>';
      output += "</div>";
    
    }
    output += "</div>"
    document.querySelector('#images').innerHTML = output;
    $('.grid').masonry({
      // options
      itemSelector: '.grid-item',
      columnWidth: 200
    });
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