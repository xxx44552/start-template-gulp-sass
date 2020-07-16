window.onload = function showMenu() {
	let btn = document.getElementById('menu-btn');
	btn.onclick = function () {
		var menu = document.querySelectorAll('.main-menu ul')[0];
		menu.classList.toggle("hide");
	};
};

function dev() {
	let place = document.querySelectorAll('footer')[0];
	let a = document.createElement('a');
	a.innerHTML = 'Разработчик сайта';
	a.setAttribute('href', 'http://webinme.ru/');
	a.setAttribute('target', '_blank');
	a.setAttribute('rel', 'nofollow');
	a.style.cssText = "color: #777;\
	display: block;\
	margin: 25px auto 20px;\
	text-align: center;\
	text-decoration: underline;\
	text-transform: uppercase;\
	font-size: 12px;\
	";
	place.appendChild(a);
};

dev();