//===================================== IBG ==============================================
function ibg() {
	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if(ibg[i].querySelector('img')){
			ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
		}
	}
}
ibg();
//========================================================================================
//================================= BURGER MENU ==========================================
document.addEventListener("DOMContentLoaded", function () {
	document.querySelector('.header__burger').onclick = function (event) {
		document.querySelector('.header__burger').classList.toggle('active')
		document.querySelector('.header__menu').classList.toggle('active')
		// document.querySelector('.top-bar').classList.toggle('hidden')
		document.querySelector('body').classList.toggle('lock')
    }
})
//========================================================================================
//================================= SCROLL HEADER ========================================
// document.addEventListener("DOMContentLoaded", function () {
// 	document.querySelector('.header').scrollTop = function (event) {
// 		document.querySelector('.header').classList.toggle('fixed')
// 	};
// )};
//========================================================================================
//================================= SCROLL HEADER ========================================
document.addEventListener("DOMContentLoaded", function () {
	document.querySelector('.recent-donors__most-amount').onclick = function (event) {
		document.querySelector('.recent-donors__recent-donors').classList.remove('_active')
		document.querySelector('.recent-donors__most-amount').classList.add('_active')
		document.querySelector('.recent-donors__list_a').classList.remove('_active')
		document.querySelector('.recent-donors__list_h').classList.remove('_hidden')
		document.querySelector('.recent-donors__list_h').classList.add('_active')
	}

})

document.addEventListener("DOMContentLoaded", function () {
	document.querySelector('.recent-donors__recent-donors').onclick = function (event) {
		document.querySelector('.recent-donors__recent-donors').classList.add('_active')
		document.querySelector('.recent-donors__most-amount').classList.remove('_active')
		document.querySelector('.recent-donors__list_a').classList.add('_active')
		document.querySelector('.recent-donors__list_h').classList.remove('_active')
		document.querySelector('.recent-donors__list_h').classList.add('_hidden')
	}
})
//========================================================================================

//=================================== FORM SEND ==========================================
'use strict'
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form')
	form.addEventListener('submit', formSend)

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form)
		let formData = new FormData(form)

		if (error === 0) {
			form.classList.add('_sending')
			let responce = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			})
			if (responce.ok) {
				let result = await responce.json()
				alert(result.message)
				form.reset()
			form.classList.remove('_sending')
			} else {
				alert('error')
			form.classList.remove('_sending')

			}
		}else {
			alert('заполните обязательные поля!')
		}
	}

	function formValidate(form) {
		let error = 0
		let formReq = document.querySelectorAll('._req')

		for (let index = 0; index < formReq.length; index++) {
			const input	= formReq[index]
			formRemoveError(input)
			
			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input)
					error++
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
					formAddError(input)
					error++
			}else {
				if (input.value === '') {
					formAddError(input)
					error++
				}
			}
		}
		return error
	}
	
	function formAddError(input) {
		input.parentElement.classList.add('_error')
		input.classList.add('_error')
	}
	
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error')
		input.classList.remove('_error')
	}

	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
	}
})
//========================================================================================