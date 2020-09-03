"use strict";

(function () {

	class LoadImages {
		constructor() {
			this.page = 1;
			this.getData();
		}

		async getData() {
			let response = await fetch(`https://picsum.photos/v2/list?page=${this.page}&limit=4`);

			if (response.ok) {
				const images = await response.json();
				this._renderImages(images);
				// increment page for next call
				this.page++;
			} else {
				console.log(`Error ${response.status}`);
			}
		}

		_renderImages(images) {
			const imageListElem = document.getElementById('image-list');
			imageListElem.appendChild(this._createImage(images));
		}

		_createImage(images) {
			// temporary container to hold all images
			const imageContainer = document.createDocumentFragment();

			for (const image of images) {
				// element to hold each image/caption block
				const div = document.createElement('div');

				const figure = document.createElement('figure');
				const caption = document.createElement('caption');
				const img = document.createElement('img');

				img.src = image.download_url;
				caption.innerHTML = `By: ${image.author}`;

				figure.appendChild(img);
				figure.appendChild(caption);

				div.appendChild(figure);

				imageContainer.appendChild(div);
			}

			return imageContainer;
		}

	}

	window.loadImages = new LoadImages();

})();