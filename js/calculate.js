    var num1;
	var num2;
	var operation;
    var replyClick;

    replyClick = function () {
		if (!operation) {
			if (!num1) {
				num1 = this.id;
			} else {
				num1 = num1 + this.id;
			}
			document.getElementById('inputLine').value = num1;

		} else {
			if (!num2) {
				num2 = this.id;
			} else {
				num2 = num2 + this.id;
			}
			document.getElementById('inputLine').value = num2;
		}
		if (!num1) {
			if (!operation) {
				operation = num1;
			} else {
				operation = num2;
			}
			document.getElementById('inputLine').value = num2;
			console.log(num2);
		}
		};
    setOperation = function() {
		document.getElementById('inputLine').value = '0';
        operation = this.id;
    };
    calculate = function () {
		if (operation == 'plus') {
			document.getElementById('inputLine').value = Number(num1) + Number(num2);
		}
		if (operation == 'minus') {
			document.getElementById('inputLine').value = Number(num1) - Number(num2);
		}
		if (operation == 'multiply') {
			document.getElementById('inputLine').value = Number(num1) * Number(num2);
		}
		if (operation == 'divide') {
			document.getElementById('inputLine').value = Math.round((Number(num1) / Number(num2))*1000)/1000;
		}
		console.log(num2);
		if (!num2) {
			document.getElementById('inputLine').value = num1;
		}
		num1 = document.getElementById('inputLine').value;
		num2 = NaN;
		operation = NaN;
	};
    clearData = function () {
        num1 = NaN;
        num2 = NaN;
        operation = NaN;
    };
    function getTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();

        document.getElementById('dateTime').value = h + ':' + m + ':' + s;
    }

    setInterval(getTime, 10);

 for (i = 0; i < 10; i++) {
     document.getElementById(String(i)).onclick = replyClick;
}

document.getElementById('plus').onclick = setOperation;
document.getElementById('minus').onclick = setOperation;
document.getElementById('divide').onclick = setOperation;
document.getElementById('multiply').onclick = setOperation;
document.getElementById('equals').onclick = calculate;
document.getElementById('reset').onclick = clearData;

//infiniteDate();


