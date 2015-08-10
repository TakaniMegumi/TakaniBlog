
function setOperation() {
	if (document.getElementById('signUp_email').value == '') {
		document.getElementById('signUp_email').innerHTML = document.getElementById('signUp_email_error').innerHTML;
		document.getElementById('signUp_email_error').style.display = "block";
		return false;
	} else {
		document.getElementById('signUp_email').innerHTML = document.getElementById('signUp_email').value;
		document.getElementById('signUp_email_error').style.display = "none";
	}
	if (document.getElementById('signUp_username').value == '') {
		document.getElementById('signUp_username').innerHTML = document.getElementById('signUp_username_error').innerHTML;
		document.getElementById('signUp_username_error').style.display = "block";
		return false;
	} else {
		document.getElementById('signUp_username').innerHTML = document.getElementById('signUp_username').value;
		document.getElementById('signUp_username_error').style.display = "none";
	}
	if (document.getElementById('signUp_password').value == '') {
		document.getElementById('signUp_password').innerHTML = document.getElementById('signUp_password_error').innerHTML;
		document.getElementById('signUp_password_error').style.display = "block";
		return false;
	} else {
		document.getElementById('email_error').style.display = "none";
		document.getElementById('username_error').style.display = "none";
		document.getElementById('signUp_password').innerHTML = document.getElementById('signUp_password').value;
		document.getElementById('signUp_password_error').style.display = "none";

		$.post("http://52.26.206.29:3000/users/signUp",	{
				login: document.getElementById('signUp_username').value,
				email: document.getElementById('signUp_email').value,
				password: document.getElementById('signUp_password').value
			})
			.done(function(data){
				localStorage.setItem('authorization', 'Bearer ' + data.token);
				console.log(localStorage.getItem('authorization'));
				document.location.href = ("file:///J:/Takani/Takani_blog/index.html");
				console.log(data);
			})
			.fail(function(data) {
				if (data.responseJSON.email){
					document.getElementById('email_error').style.display = "block";
				} if(data.responseJSON.login){
					document.getElementById('username_error').style.display = "block";
				}
				console.log(data);
			})
	}
	if (document.getElementById('signUp_password').value == document.getElementById('signUp_confirmPassword').value) {
		document.getElementById('signUp_password').style.color = "#00B0B2";
		document.getElementById('signUp_confirmPassword').style.color = "#00B0B2";
		document.getElementById('signUp_confirmPassword_error').style.display = "none";
		return false;
	} else {
		document.getElementById('signUp_confirmPassword').style.color = "#FE0000";
		document.getElementById('signUp_password').style.color = "#00B0B2";
		document.getElementById('signUp_confirmPassword_error').style.display = "block";
	}


}

     document.getElementById('signUp_submit').onclick = setOperation;








