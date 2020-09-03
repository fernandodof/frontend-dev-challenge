"use strict";

(function () {
	const count = (str, counterId, limit, btnId) => {
		const length = str.length;
		document.getElementById(counterId).innerHTML = limit - length;
		document.getElementById(btnId).disabled = !length;
	}

	window.charCounter = {
		count: count
	};

})();