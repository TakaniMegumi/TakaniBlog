/**
 * TODO: post comment to server!
 *
 * Posts comment to server, updates current comment list
 */

var $body = $('body');
var commentNumber = document.getElementById('commentValue').value;
console.log(document.getElementById('commentValue').value);
var currentLocation = window.location.href;

function submitComment() {
	if (localStorage.getItem('authorization')) {
		$.ajax({
			beforeSend: function(xhr) {
				xhr.setRequestHeader('Authorization', localStorage.getItem('authorization'));
				xhr.setRequestHeader('Content-Type', 'application/json');
			},
			type: 'POST',
			url: 'http://52.26.206.29:3000/comments',
			crossDomain: true,
			data: '{"article_id": '+commentNumber+', "text": "' + document.getElementById('comments').value  +'"}',
			dataType: 'json',

			success: function(responseData) {
				var creatorUl = document.getElementById('creatorUl');
				var text = '<ul>';
				text += commentNew(responseData);
				text += '</ul>';
				document.getElementById('creatorUl').innerHTML += text;
				document.getElementById('contactForm').reset();
			},
			error: function (responseData) {
				console.log('POST failed');
			}
		});
	} else {
		localStorage.setItem('referenceLink',currentLocation);
		document.location.href = ('file:///J:/Takani/Takani_blog/page/loginForm.html');
		return false;
	}
}
document.getElementById('enterComment').onclick = submitComment;

function formatDate(dateObject) {
	var date = new Date(dateObject);
	return  date.toLocaleDateString() + ' in ' + date.getHours() + ':' + date.getMinutes();
}

var globalId;

    function exitForm (){
		$('.editMode').replaceWith(pencilExitForm());
	}

	 function sendPut(){
	$.ajax({
		beforeSend: function(xhr) {
			xhr.setRequestHeader('Authorization', localStorage.getItem('authorization'));
			xhr.setRequestHeader('Content-Type', 'application/json');
		},
		type: 'PUT',
		url: 'http://52.26.206.29:3000/comments/'  + globalId,
		crossDomain: true,
	    data: '{ "text": "' + document.getElementById('newText').value  + '"}',
		dataType: 'json',

		success: function(responseData) {
			$('#' + responseData.id).html(responseData.text);
			$('#newText').val('');
		},
		error: function (responseData){
		}
	})
	}

     function makeDelete(callback){
	$.ajax({
		beforeSend: function(xhr) {
			xhr.setRequestHeader('Authorization', localStorage.getItem('authorization'));
			xhr.setRequestHeader('Content-Type', 'application/json');
		},
		type: 'DELETE',
		url: 'http://52.26.206.29:3000/comments/'  + globalId,
		crossDomain: true,
		dataType: 'json',

		success: function(responseData) {
			callback();
		},
		error: function (responseData){
		}
	})
}
	$.ajax({
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', localStorage.getItem('authorization'));
			xhr.setRequestHeader('Content-Type', 'application/json');
		},
		type: 'GET',
		url: 'http://52.26.206.29:3000/comments?article_id=' +commentNumber + '&limit=10&offset=0',
		crossDomain: true,
		dataType: 'json',

		success: function (responseData) {
			var creatorUl = document.getElementById('creatorUl');
			var tmpComment = '';
			var text = '<ul>';
			for (var i = 0; i < responseData.length; i++) {
				tmpComment += commentNew(responseData[i]);
			}
			text += tmpComment;
			text += '</ul>';
			document.getElementById('creatorUl').innerHTML = text;
			var nameComments = document.getElementById('nameComments');
			var textElem = '<div class="wordComments">';
			textElem += '<p>' + 'Comments' + '</p>';
			textElem += '<img class="thinkPic" src="../image/img.jpg/Mysli_materialqny.jpg">';
			textElem += '</div>';
			document.getElementById('nameComments').innerHTML = textElem;
		},
		error: function (responseData) {
			console.log('POST failed');
		}
	});

$body.on('click', '#TextId', function() {
	$currentElement = $(this);
	globalId = $(this).attr('commentId');
	$(this).replaceWith(getEditArea());
});

/*This one deletes comment*/
$body.on('click', '#DeleteText', function () {
			globalId = $(this).attr('deleteId');
			thisCopy = $(this).parent();
			$(thisCopy).animate({'margin-left': "350px"}, 200);
			makeDelete(function () {
				thisCopy.animate({'margin-left': "350px", 'opacity': 0.1}, 100, function () {
					thisCopy.remove();
				});
			});
});

$body.on('click', '#backToTop', function(){
	$body.animate( {scrollTop: 0}, 200);
});

/* TODO: use this code at refactoring.
$body.on('click', '#pencilImg', function() {
	console.log($(this).parent().attr('commentid'));
});
*/


function getEditArea() {
	return '<li class="styleText editMode"><textarea id="newText" >'
	+ '</textarea> <input  id="buttonNewTextCancel" onclick="exitForm ()" type="button" value="Cancel">'
	+ '</input><input  id="buttonNewTextOk" onclick="sendPut()" type="button" value="Ok">' + '</input ></li>';
}
function pencilExitForm() {
	return '<li id="TextId"  class="styleText" commentId="' + globalId + '" >'
	+ '<img id="pencilImg" class="pencilImg" src="../image/icon.png/pencil.png" alt="">' + '</li>';
}

function commentNew(responseData){
	var text = '';
		text += '<div id="opacityDiv">';
		text += '<li class="styleLogin">' + responseData.profile.login + '</li>';
		text += '<li class="styleDate">' + formatDate(responseData.created_at) + '</li>';
		text += '<li class="styleUserPic">' + '<img width=35 height=30 src="'
		+ responseData.profile.userpic + '"/></li>';
		if (responseData.is_author == 1) {
			text += '<li id="DeleteText"  deleteId="' + responseData.id + '">'
			+ '<img class="deleteImg"  src="../image/icon.png/delete_32x32.png" alt="">' + '</li>';
		}
		text += '<li id="' + responseData.id + '" class="styleText">' + responseData.text + '</li>';
		if (responseData.is_author == 1){
			text += '<li id="TextId"  class="styleText " commentId="' + responseData.id + '" >'
			+ '<img id="pencilImg" class="pencilImg" src="../image/icon.png/pencil.png" alt="">' + '</li>';
		}
		text += '<hr size=0 width=500px color=#DCDCDC style="margin-left: 30px; margin-bottom: -0.5px">';
		text += '</div>';

	return text;
}
