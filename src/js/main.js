const photos = document.querySelectorAll('.gallery__photo img');
const popup = document.querySelector('.popup');
const close = document.querySelector('.popup__close');
const body = document.querySelector('body');
const next = document.querySelector('.popup__next');
const back = document.querySelector('.popup__back');
const popupInfo = document.querySelector('.popup__info');

const popupImg = document.createElement('img');
let popupImgName;
let indexImg;
////////////////////////////////////////////////////////
photos.forEach((photo, index) => {
	photo.addEventListener('click', (e) => {
		body.classList.add('scrollNone'); // blokujemy stronę
		popup.classList.add('show'); //otwieramy nasz popup - zmienia display none na flex
		popupImg.setAttribute('src', ''); // tworzymy atrybut src w img
		popupImg.classList.add('popup__img'); // dodajemy klase z scc zmieającą szerokość i wysokość zdjęcia
		popup.appendChild(popupImg);
		popupImg.src = e.target.src;
		indexImg = index;
		popupImgName = e.target.alt;
		next.addEventListener('click', nextPhoto);
		back.addEventListener('click', backPhoto);
		popupImg.addEventListener('mouseenter', () => {
			popupInfo.classList.add('showInfo');
			showNameImg();
		});
		popupImg.addEventListener('mouseleave', () => {
			popupInfo.classList.remove('showInfo');
		});
	});
});

const showNameImg = () => {
	const textName = document.querySelector('.popup__info__name');
	const popupInfoNumberOne = document.querySelector(
		'.popup__info__number__one'
	);
	const popupInfoNumberTwo = document.querySelector(
		'.popup__info__number__two'
	);
	textName.textContent = popupImgName;
	popupInfoNumberOne.textContent = indexImg + 1;
	popupInfoNumberTwo.textContent = photos.length;
};

document.addEventListener('keydown', (e) => {
	if (popup.classList.contains('show')) {
		if (e.code === 'ArrowRight' || e.keyCode === 39) {
			nextPhoto();
			showNameImg();
		} else if (e.code === 'ArrowLeft' || e.keyCode === 37) {
			backPhoto();
			showNameImg();
		} else if (e.code === 'Escape' || e.keyCode === 27) {
			closePopup();
		}
	}
});

const nextPhoto = () => {
	if (indexImg == photos.length - 1) {
		indexImg = 0;
	} else {
		indexImg++;
	}
	popupImg.src = photos[indexImg].src;
	popupImgName = photos[indexImg].alt;
};

const backPhoto = () => {
	if (indexImg == 0) {
		indexImg = photos.length - 1;
	} else {
		indexImg--;
	}
	popupImg.src = photos[indexImg].src;
	popupImgName = photos[indexImg].alt;
};

const closePopup = () => {
	popup.classList.remove('show');
	body.classList.remove('scrollNone');
	popup.removeChild(popupImg);
};

close.addEventListener('click', closePopup);
