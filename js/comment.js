/**
 * TODO: post comment to server!
 *
 * Posts comment to server, updates current comment list
 */

function submitComment() {
	if (localStorage.getItem('authorization')) {
		/*
		$.post("http://52.26.206.29:3000/comments", {
			async: false,
			headers: {
				'Authorization': localStorage.getItem('authorization')
			},
			crossDomain: true,
			text: document.getElementById('comments').value,
			article_id: 1

		});
*/

		$.ajax({
			beforeSend: function(xhr) {
				xhr.setRequestHeader('Authorization', localStorage.getItem('authorization'));
				xhr.setRequestHeader('Content-Type', 'application/json');
			},
			type: 'POST',
			url: 'http://52.26.206.29:3000/comments',
			crossDomain: true,
			data: '{"article_id":1, "text": "' + document.getElementById('comments').value   +'"}',
			dataType: 'json',

			success: function(responseData) {
				console.log(responseData.text);
			},
			error: function (responseData) {
				alert('POST failed.');
			}
		});



		console.log(localStorage.getItem('authorization'));
	} else {
		localStorage.setItem('referenceLink', 'file:///J:/Takani/Takani_blog/page/page_1.html');
		document.location.href = ('file:///J:/Takani/Takani_blog/page/loginForm.html');
		return false;
	}
	var textAreaContent = document.getElementById('comments').value;  	//user's comment text
	var parentUl = document.getElementById('parentUl');				  //parent ul, where li should be attached.

	var liNode = document.createElement('li');			//create inner li element where user avatar will be stored.
	var liTextNode = document.createElement('li');		//create inner li element where user comment text will be stored

	//setting up li attributes for both user avatar & user text...
	liTextNode.innerHTML = textAreaContent;
	liNode.innerHTML = '<img src="../image/img.jpg/avatar.jpg">';
	liTextNode.style.margin = "-50px 0 20px 90px";

	//this part appends li to existing UL element
	parentUl.appendChild(liNode);
	parentUl.appendChild(liTextNode);
}
document.getElementById('enterComment').onclick = submitComment;


