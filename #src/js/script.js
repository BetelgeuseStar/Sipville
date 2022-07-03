"use strict";
@@include('webpTest.js')
@@include('swiper-bundle.min.js')
@@include('mobile_check.js')
@@include('functions.js')
@@include('dynamic_adapt.js')
@@include('form.js')
@@include('swiper.js')
@@include('spoiler.js')
@@include('hystmodal.js')
@@include('you_tube_api.js')
@@include('lazy_load.js')

window.onload = function () {
	const myModal = new HystModal({
		linkAttributeName: "data-hystmodal",
		// настройки (не обязательно), см. API
	});
}

if (document.querySelector('.burger-icon')) {
	const burgerIcon = document.querySelector('.burger-icon');
	const inner = document.querySelector('.header__inner');
	const list = document.querySelector('.nav__list');
	burgerIcon.addEventListener('click', function (e) {
		document.querySelector('body').classList.toggle('lock');
		burgerIcon.classList.toggle('active');
		inner.classList.toggle('active');
		list.classList.toggle('active');
	})
};

function loadModalContent(link) {
	if (link.classList.contains('grid-gallery__item')) {
		const parent = link;
		const modalWindow = document.getElementById('img').querySelector('.hystmodal__window');
		let clone = parent.cloneNode(true);
		clone.className = 'grid-gallery__item_modal';
		clone.removeAttribute('data-hystmodal');
		clone.querySelector('.grid-gallery__img').className = 'grid-gallery__img_modal';
		modalWindow.prepend(clone);
	} else {
		const parent = link.closest('.team__item');
		const modalWindow = document.getElementById('img').querySelector('.hystmodal__window');
		let clone = parent.cloneNode(true);
		clone.className = 'team__item_modal';
		clone.querySelector('.team__img-button').remove();
		clone.querySelector('.team__img-wrapper').className = 'team__img-wrapper_modal';
		clone.querySelector('.team__img').className = 'team__img_modal';
		let wrapper = document.createElement('div');
		wrapper.setAttribute('class', 'team__text-wrapper');
		wrapper.appendChild(clone.querySelector('.team__name'));
		wrapper.appendChild(clone.querySelector('.team__post'));
		clone.appendChild(wrapper);
		clone.querySelector('.team__name').className = 'team__name_modal';
		clone.querySelector('.team__post').className = 'team__post_modal';
		modalWindow.prepend(clone);
	}
}

function deleteModalContent() {
	const modalWindow = document.getElementById('img').querySelector('.hystmodal__window');
	modalWindow.childNodes.forEach(e => {
		if (e.classList === undefined) { return; }
		if (!e.classList.contains('hystmodal__close')) {
			e.remove();
		}

	});
}
