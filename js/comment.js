/**
 * TODO: post comment to server!
 *
 * Posts comment to server, updates current comment list
 */

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
			data: '{"article_id":1, "text": "' + document.getElementById('comments').value  +'"}',
			dataType: 'json',

			success: function(responseData) {
				var creatorUl = document.getElementById('creatorUl');
				var text = '<ul>';
				 {
					text += '<li class="styleLogin">' + responseData.profile.login + '</li>';
					text += '<li class="styleDate">' + formatDate(responseData.created_at) + '</li>';
					text += '<li class="styleUserPic">' + '<img width=35 height=30 src="' + responseData.profile.userpic + '"/></li>';
					text += '<li class="styleText">' + responseData.text + '</li>';
				}
				text += '</ul>';
				document.getElementById('creatorUl').innerHTML += text;
			},
			error: function (responseData) {
				console.log('POST failed');
			}
		});
	} else {
		localStorage.setItem('referenceLink', 'file:///J:/Takani/Takani_blog/page/page_1.html');
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



function showForm (id) {
/*
		globalId = id;
		console.log(id);

		var creatorDiv = document.getElementById('creatorDiv');
		var text = '<li class="styleText">';
		{

				text += '<textarea id="newText" >' + '</textarea>';
				text += '<input  id="buttonNewTextCancel" onclick="exitForm ()" type="button" value="Cancel" ">' + '</input >';
				text += '<input  id="buttonNewTextOk" onclick="sendPut()" type="button" value="Ok">' + '</input >';

		}
		text += '</li>';
		document.getElementById('creatorDiv').innerHTML += text;

*/
}




function exitForm (){
	document.getElementById('newText').style.display = "none";
	document.getElementById('buttonNewTextOk').style.display = "none";
	document.getElementById('buttonNewTextCancel').style.display = "none";
	}





	 function sendPut(){
	$.ajax({
		beforeSend: function(xhr) {
			console.log(localStorage.getItem('authorization'));
			xhr.setRequestHeader('Authorization', localStorage.getItem('authorization'));
			xhr.setRequestHeader('Content-Type', 'application/json');
		},
		type: 'PUT',
		url: 'http://52.26.206.29:3000/comments/'  + globalId,

		crossDomain: true,
	    data: '{ "text": "' + document.getElementById('newText').value  + '"}',
		dataType: 'json',

		success: function(responseData) {
				document.getElementById('styleText').innerHTML = document.getElementById('newText').value;
		},
		error: function (responseData){

		}
	})
	}


	$.ajax({
		beforeSend: function (xhr) {
			console.log(localStorage.getItem('authorization'));
			xhr.setRequestHeader('Authorization', localStorage.getItem('authorization'));
			xhr.setRequestHeader('Content-Type', 'application/json');
		},
		type: 'GET',
		url: 'http://52.26.206.29:3000/comments?article_id=1&limit=10&offset=10',
		crossDomain: true,
		dataType: 'json',

		success: function (responseData) {
			var creatorUl = document.getElementById('creatorUl');
			var text = '<ul>';

			for (var i = 0; i < responseData.length; i++) {
				text += '<li class="styleLogin">' + responseData[i].profile.login + '</li>';
				text += '<li class="styleDate">' + formatDate(responseData[i].created_at) + '</li>';
				text += '<li class="styleUserPic">' + '<img width=35 height=30 src="' + responseData[i].profile.userpic + '"/></li>';
				text += '<li id="' + responseData[i].id + '"  class="styleText">' + responseData[i].text + '</li>';
				text += '<li id="TextId"  class="styleText" commentId="' + responseData[i].id + '" >' + '<img class="pencilImg"  style="cursor: pointer;" src="../image/icon.png/pencil.png" alt="">' + '</li>';
				text += '<hr size=0 width=500px color=#DCDCDC style="margin-left: 30px; margin-bottom: -0.5px">';
			}
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
/*
$('#comment-wrapper').on('click', function() {
	console.log('wrapper active');
});
*/
$('body').on('click', '#TextId', function() {
	//<li id="TextId" class="styleText" commentid="409"><img class="pencilImg" style="cursor: pointer;" src="../image/icon.png/pencil.png" alt=""></li>
	globalId = $(this).attr('commentId');

	$(this).replaceWith('<li class="styleText"><textarea id="newText" >' + '</textarea> <input  id="buttonNewTextCancel" onclick="exitForm ()" type="button" value="Cancel" ">' + '</input ><input  id="buttonNewTextOk" onclick="sendPut()" type="button" value="Ok">' + '</input ></li>');

	/*
	var creatorDiv = document.getElementById('creatorDiv');
	var text = '<li class="styleText">';
	{

		text += '<textarea id="newText" >' + '</textarea>';
		text += '<input  id="buttonNewTextCancel" onclick="exitForm ()" type="button" value="Cancel" ">' + '</input >';
		text += '<input  id="buttonNewTextOk" onclick="sendPut()" type="button" value="Ok">' + '</input >';

	}
	text += '</li>';
	document.getElementById('creatorDiv').innerHTML += text;
	*/

});


















