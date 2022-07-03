document.addEventListener('DOMContentLoaded', function () {
	const forms = document.querySelectorAll('form');
	forms.forEach(el => {
		el.addEventListener('submit', formSend);
		async function formSend(e) {
			e.preventDefault();

			let error = formValidate(el);
			let errorClass = el.querySelector('.form__error');
			errorClass.style.display = 'none';
			//let formData = new FormData(form);// загрузка всех введенных в форму данных в переменную
			//formData.append('image', formImage.files[0]);// добавление картинки в переменную
			// если ошибок нет
			if (error.value === 0) {
				/* form.classList.add('_sending'); // добавление класса отправки сообщения, для стилизации ожидания
				let response = await fetch('sendmail.php', { // отправка сообщения на почту
					method: 'POST',
					body: formData
				});
				// если нет ошибок при отправке
				if (response.ok) {
					let result = await response.json();
					alert(result.message);
					// очистка формы
					formPreview.innerHTML = '';
					form.reset();
					form.classList.remove('_sending'); 
				// если ошибки есть
			} else {
				alert('ошибка');
				form.classList.remove('_sending');
			} */
				// если ошибки есть
			} else {
				if (errorClass) {
					errorClass.style.display = 'block';
				} else {
					alert('Заполните обязательные поля');
				}
				console.log(error.type);
				if (error.type === 'checkbox') {
					errorClass.innerText = 'Вы должны подтвердить что согласны на обработку персональных данных';
				}
				if (error.type === 'tel') {
					errorClass.innerText = 'Некорректно введен номер телефона';
				}
				if (error.type === 'email') {
					errorClass.innerText = 'Некорректно введен номер адрес электронной почты';
				}
				if (error.type === 'empty') {
					errorClass.innerText = 'Заполните обязательные поля';
				}

			}
		}


		//функция для проверки формы на ошибки
		function formValidate(form) {
			let error = { value: 0, type: 'none' };
			let formReq = form.querySelectorAll('._req'); // необходимо присвоить класс _req всем input которые должны быть обязательно заполнены, в том числе пустые чекбоксы!!!
			for (let i = 0; i < formReq.length; i++) {
				const input = formReq[i];
				formRemoveError(input);
				if (input.value === '') {
					formAddError(input);
					error = { value: 1, type: 'empty' }
				} else if (input.classList.contains('_email')) { // необходимо присвоить класс _email для input в котором будет вводится email!!!
					if (emailTest(input)) {
						formAddError(input);
						error = { value: 1, type: 'email' };
					}
				} else if (input.classList.contains('_tel')) {
					if (telTest(input)) {
						formAddError(input);
						error = { value: 1, type: 'tel' };
					}
				} else if (input.getAttribute('type') === 'checkbox' && input.checked === false && error.type === 'none') {
					formAddError(input);
					error = { value: 1, type: 'checkbox' };
				};
			}
			return error;
		}

		//функции добавления класс _error на input непрошедшие валидацию, эти классы можно использовать для стилизации ошибок
		function formAddError(input) {
			input.parentElement.classList.add('_error');
			input.classList.add('_error');
		}
		function formRemoveError(input) {
			input.parentElement.classList.remove('_error');
			input.classList.remove('_error');
		}
		//Функция теста email
		function emailTest(input) {
			return !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(input.value);
		}

		function telTest(input) {
			return !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value);
		}

		if (document.getElementById('formImage')) {
			// получаем input с выбором картинки в переменную
			const formImage = document.getElementById('formImage');
			// получаем div для превью картинки в переменную
			const formPreview = document.getElementById('formPreview');
			// слушаем изменения в input файле
			formImage.addEventListener('change', () => {
				uploadFile(formImage.files[0]);
			});

			function uploadFile(file) {
				// проверяем тип файла ( так же можно установать accept='.jpg, .png, .gif' внутри самого input)
				if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
					alert('Разрешены только изображения');
					formImage.value = '';
					return;
				}
				// проверка размера файла (<2 Мб)
				if (file.size > 2 * 1024 * 1024) {
					alert('Файл должен быть менее 2 Мб.');
					return;
				}
				// установка превью картинки
				var reader = new FileReader();
				reader.onload = function (e) {
					formPreview.innerHTML = `<img src="$(e.target.result)" alt="Фото"`;
				};
				reader.onerror = function (e) {
					alert('Ошибка');
				};
				reader.readAsDataURL(file);
			}
		}
	});
});


































