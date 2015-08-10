function enterLogIn() {
	if (document.getElementById('logIn_email').value == '') {
		document.getElementById('logIn_email').innerHTML = document.getElementById('logIn_email_error').innerHTML;
		document.getElementById('logIn_email_error').style.display = "block";
		return false;
	} else {
		document.getElementById('logIn_email').innerHTML = document.getElementById('logIn_email').value;
		document.getElementById('logIn_email_error').style.display = "none";
	}
	if (document.getElementById('logIn_password').value == '') {
		document.getElementById('logIn_password').innerHTML = document.getElementById('logIn_password_error').innerHTML;
		document.getElementById('logIn_password_error').style.display = "block";
		return false;
	} else {
		document.getElementById('logIn_error').style.display = "none";
		document.getElementById('password_logIn_error').style.display = "none";
		document.getElementById('logIn_password').innerHTML = document.getElementById('logIn_password').value;
		document.getElementById('logIn_password_error').style.display = "none";
}

	$.post("http://52.26.206.29:3000/users/login", {
		email: document.getElementById('logIn_email').value,
		password: document.getElementById('logIn_password').value
	})
		.done(function(data){
			localStorage.setItem('authorization', 'Bearer ' + data.token);
			if (localStorage.getItem('referenceLink')){
				document.location.href = (localStorage.getItem('referenceLink'));
			} else {
				document.location.href = ("file:///J:/Takani/Takani_blog/index.html");
			}

		})
		.fail(function(data) {
			if (!data.responseJSON.email){
				document.location.href = ("file:///J:/Takani/Takani_blog/page/toRegister.html");
			} if(!data.responseJSON.password) {
				document.location.href = ("file:///J:/Takani/Takani_blog/page/toRegister.html");
			}
			console.log(data);
		})
}
 document.getElementById('logIn_submit').onclick = enterLogIn;
