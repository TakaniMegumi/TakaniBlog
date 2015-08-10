function exitOperation() {
	localStorage.clear();
	window.event.returnValue = false;
	document.location.href = ("file:///J:/Takani/Takani_blog/index.html");
}
document.getElementById('exit').onclick = exitOperation;