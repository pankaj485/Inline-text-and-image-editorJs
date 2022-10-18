class imageEditorJs {
	static get toolbox() {
		return {
			title: "Pank Image",
			icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path fill="#7D58E6" d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
		};
	}

	constructor({ data }) {
		this.data = data;
		this.mainContainer = undefined;
	}

	render() {
		this.addOptionsForSelect = function () {
			const options = ["left", "right"];
			const imageWidthOption = ["10%", "20%", "30%", "40%", "50%"];

			for (
				let currentOption = 0;
				currentOption < options.length;
				currentOption++
			) {
				const createdOption = document.createElement("option");
				createdOption.textContent = options[currentOption];

				imagePositionInput.appendChild(createdOption);
			}

			for (
				let currentOption = 0;
				currentOption < imageWidthOption.length;
				currentOption++
			) {
				const createdOption = document.createElement("option");
				createdOption.textContent = imageWidthOption[currentOption];
				imageWidthInputOption.appendChild(createdOption);
			}
		};

		this.addClassNames = function () {
			mainContainer.classList.add("mainContainer");
			inputsContainer.classList.add("inputsContainer");
			customizationContainer.classList.add("customizationContainer");
			imageUrlInput.classList.add("imageUrlInput");
			textContentInput.classList.add("textContentInput");
			imagePositionInput.classList.add("imagePositionInput");
			outputPreviewButton.classList.add("outputPreviewButton");
			imageWidthInputOption.classList.add("imageWidthInputOption");
			imagePositionLabel.classList.add("imagePositionLabel");
			imageWidthLabel.classList.add("imageWidthLabel");
			imageWidthContainer.classList.add("imageWidthContainer");
			imagePositionContainer.classList.add("imagePositionContainer");
		};

		// create elements
		const mainContainer = document.createElement("div");
		const inputsContainer = document.createElement("div");
		const customizationContainer = document.createElement("div");
		const imageUrlInput = document.createElement("input");
		const textContentInput = document.createElement("div");
		const imagePositionInput = document.createElement("select");
		const imageWidthInputOption = document.createElement("select");
		const imagePositionContainer = document.createElement("div");
		const imageWidthContainer = document.createElement("div");
		const imagePositionLabel = document.createElement("label");
		const imageWidthLabel = document.createElement("label");
		const outputPreviewButton = document.createElement("button");

		// add classnames to elements
		this.addClassNames();

		// add options on position select option
		this.addOptionsForSelect();

		// add placeholders and values
		imageUrlInput.placeholder = "Image Url";
		textContentInput.placeholder = "text contents ...";
		imageUrlInput.value =
			this.data && this.data.imageUrl ? this.data.imageUrl : "";
		textContentInput.innerHTML =
			this.data && this.data.caption ? this.data.caption : "";
		textContentInput.contentEditable = true;
		outputPreviewButton.textContent = "show output";
		imageWidthLabel.textContent = "Width ";
		imagePositionLabel.textContent = "Position ";

		// append respective elements in order
		imageWidthContainer.appendChild(imageWidthLabel);
		imageWidthContainer.appendChild(imageWidthInputOption);
		imagePositionContainer.appendChild(imagePositionLabel);
		imagePositionContainer.appendChild(imagePositionInput);
		customizationContainer.appendChild(imagePositionContainer);
		customizationContainer.appendChild(imageWidthContainer);
		inputsContainer.appendChild(imageUrlInput);
		inputsContainer.appendChild(customizationContainer);
		inputsContainer.appendChild(textContentInput);
		inputsContainer.appendChild(outputPreviewButton);
		mainContainer.append(inputsContainer);

		outputPreviewButton.addEventListener("click", () => {
			const imageUrl = imageUrlInput.value;
			const textContent = textContentInput.innerHTML;
			const imagePosition = imagePositionInput.value;
			const imageWidthOption = imageWidthInputOption.value;

			this._createImage(imageUrl, imagePosition, textContent, imageWidthOption);
		});

		this.mainContainer = mainContainer;
		return mainContainer;
	}

	_createImage(imageUrl, imagePosition, textContent, imageWidthOption) {
		console.log(imageUrl, imagePosition, textContent, imageWidthOption);

		this.setImageWidth = (imageWidthOption) => {
			let imageWidthInPercentage = Number(imageWidthOption.split("%")[0]);
			let contentWidthInPercentage = 100 - imageWidthInPercentage;

			outputImageContainer.style.width = `${imageWidthInPercentage}%`;
			outputTextContainer.style.width = `${contentWidthInPercentage}%`;
		};

		const outputPreviewContainer = document.createElement("div");
		const outputTextContainer = document.createElement("p");
		const outputImageContainer = document.createElement("img");

		outputPreviewContainer.classList.add("outputPreviewContainer");
		outputTextContainer.classList.add("outputTextContainer");
		outputImageContainer.classList.add("outputImageContainer");

		outputImageContainer.src = imageUrl;
		this.setImageWidth(imageWidthOption);
		outputTextContainer.textContent = textContent;

		switch (imagePosition) {
			case "right":
				outputPreviewContainer.append(outputTextContainer);
				outputPreviewContainer.append(outputImageContainer);
				break;
			case "left":
				outputPreviewContainer.append(outputImageContainer);
				outputPreviewContainer.append(outputTextContainer);
				break;
		}

		this.mainContainer.append(outputPreviewContainer);
	}

	save(blockContent) {
		const imageUrl = blockContent.querySelector(".imageUrlInput").value.trim();
		const caption = blockContent.querySelector(".textContentInput").innerHTML;
		const imagePosition = blockContent.querySelector(
			".imagePositionInput"
		).value;
		const imageWidthPercentage = blockContent.querySelector(
			".imageWidthInputOption"
		).value;
		return {
			imageUrl: imageUrl,
			caption: caption,
			imagePosition: imagePosition,
			imageWidthPercentage: imageWidthPercentage,
		};
	}

	validate(savedData) {
		const { imageUrl, caption, imagePosition, imageWidthPercentage } =
			savedData;
		const isValidated =
			imageUrl &&
			caption &&
			imagePosition !== "Image position" &&
			imageWidthPercentage;

		if (!isValidated) {
			return false;
		}

		return true;
	}
}
