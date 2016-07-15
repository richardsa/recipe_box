'use strict';

(function() {

    var profileId = document.querySelector('#profile-id') || null;
    var profileUsername = document.querySelector('#profile-username') || null;
    var displayName = document.querySelector('#display-name');
    var apiUrl = appUrl + '/api/:id';

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
                updateHtmlElement(userObject, profileId, 'id');
            }

            if (profileUsername !== null) {
                updateHtmlElement(userObject, profileUsername, 'username');
            }
        }

    }));



    //upload form jquery
    $("#uploadForm").bind('submit', function(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        var imageURL = $("#imageURL").val();
        var imageCaption = $("#imageCaption").val();
        var uploadURL = appUrl + '/upload/api?imageURL=' + imageURL + '&imageCaption=' + imageCaption;
        ajaxFunctions.ajaxRequest('POST', uploadURL, function() {
            var redirectUrl = appUrl + "/profile";
            window.location = redirectUrl;
            return false;
        });
        $("#imageCaption").val('');
        $("#imageURL").val('');
        return false;
    });
})();