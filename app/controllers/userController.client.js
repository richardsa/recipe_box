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
            document.querySelector("#uploadLink").innerHTML = '<a href="/add-recipe">Add Recipe</a>';

            if (userObject.displayName !== null && displayName !== null) {
                updateHtmlElement(userObject, displayName, 'displayName');
            }

            if (userObject.id !== null) {
                twitterId = userObject.id;
                /*  if (window.location.pathname === "/profile") {
                    ajaxFunctions.ajaxRequest('GET', appUrl + "/user/" + twitterId, getImages);
                  }*/

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
        ajaxFunctions.ajaxRequest('GET', appUrl + "/recipes/all", getRecipes);

    }

  //  if wall page - load all of user's images by running getImages function
    if (window.location.pathname.slice(0, 6) === "/wall/") {
      var user = window.location.pathname.slice(6)
      ajaxFunctions.ajaxRequest('GET', appUrl + "/user/" + user, getRecipes);
    }

    //  if recipe page - load individual recipe images by running getImages function
      if (window.location.pathname.slice(0, 8) === "/recipe/") {
        var recipe = window.location.pathname.slice(8)
        console.log(recipe)
        ajaxFunctions.ajaxRequest('GET', appUrl + "/recipe-api/" + recipe, getRecipe);
      }
    // get recipe function 
    // get recipe function
    function getRecipe(data) {
        var response = JSON.parse(data);
        console.log(JSON.stringify(response));
        var output = '<h1>' + response[0].recipeName + '</h1>';
        output += "</ul></div>"
        document.querySelector('#recipes').innerHTML = output;
    }
    // main get all images function 
    function getRecipes(data) {
        var response = JSON.parse(data);
        console.log(JSON.stringify(response));
        var output = '';
        if (window.location.pathname.slice(0, 6) === "/wall/") {
          output += '<h1>' + response[0].username + '</h1>';
          output += "<div class='recipeList'>";
        } else {
          output += "<div class='recipeList'>";
        }
        
        output += "<ul class='list-group'>";
        for (var i = 0; i < response.length; i++) {
            var recipeIngredients = response[i].recipeIngredients;
            var recipeName = response[i].recipeName;
            var recipeDirections = response[i].recipeDirections;
            var imageCaption = response[i].imageCaption;
            var user = response[i].username;
            var userID = response[i].twitterID;
            var dbID = response[i]['_id'];

            //  if (userID === twitterId) {
            //output += '<div class="pull-right delete-link"><a href="' + appUrl + '/delete/' + dbID + '">X</a></div>';
            //  output += '<div class="pull-right delete-link" id="' + dbID + '">X</div>';
            //  }
            output += "<li class='list-group-item'>";
            output += '<h3><a href="/recipe/' + dbID + '">' + recipeName + '</a></h3>';
            output += '<p>Created by <a href="/wall/' + userID + '">' + user + '</a><p>';
            output += '<p>' + recipeName + '</p>';
            //output += '<p>Likes:' + likes + '</p>';
            output += "</li>";
        }
        document.querySelector('#recipes').innerHTML = output;
        output += "</ul></div>"
    }

    // jquery add books to collection function
    $("#images").on("click", ".delete-link", function() {
        var deleteUrl = appUrl + '/delete/' + $(this).attr('id');

        ajaxFunctions.ajaxRequest('DELETE', deleteUrl, function() {
            if (window.location.pathname === "/") {
                ajaxFunctions.ajaxRequest('GET', appUrl + "/images/all", getImages);

            } else if (window.location.pathname === "/profile") {
                ajaxFunctions.ajaxRequest('GET', appUrl + "/user/" + twitterId, getImages);

            } else {
                ajaxFunctions.ajaxRequest('GET', appUrl + "/user/" + user, getImages);
            }
        });
    });

  
    //upload form jquery
    $("#uploadForm").bind('submit', function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        var postData = $(this).serialize();
        console.log("post data bruh" + postData);
      //  var recipeName = $("#recipeName").val();
      //  var recipeIngredients = $("#recipeIngredients").val();
      //  var recipeDirections = $("#recipeDirections").val();
       // var uploadURL = appUrl + '/add-recipe/api?recipeName=' + recipeName + '&recipeIngredients=' + recipeIngredients + '&recipeDirections=' + recipeDirections;
        $.ajax(
        {
            url : 'add-recipe/api',
            type: "post",
            data : postData,
            //data: {testing: "testing123"},
            success:function(data, textStatus, jqXHR) 
            {
             $('#uploadForm').trigger("reset");    
              $("#recipeName").val('');
              $("#recipeDirections").val('');
              $("#recipeIngredients").val('');
            },
            error: function(data, textStatus, errorThrown) 
            {
                alert(data);     
            }
        });
      //  console.log(uploadURL)
      /*ajaxFunctions.ajaxRequest('POST', uploadURL, function() {
            $("#recipeName").val('');
            $("#recipeDirections").val('');
            $("#recipeIngredients").val('');
            return false;
        });*/

    });
})();