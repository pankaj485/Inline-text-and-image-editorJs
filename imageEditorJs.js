class imageEditorJs {
	static get toolbox() {
		return {
			title: "Pank Image",
			icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path fill="#7D58E6" d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
		};
	}

	constructor({ data }) {
		this.data = data;
	}

	render() {
		this.addOptionsForSelect = function () {
			const options = ["left", "right", "top", "bottom"];
			const placeholderOption = document.createElement("option");

			placeholderOption.disabled = true;
			placeholderOption.selected = true;
			placeholderOption.textContent = "Image position";

			imagePositionInput.appendChild(placeholderOption);

			for (
				let currentOption = 0;
				currentOption < options.length;
				currentOption++
			) {
				const createdOption = document.createElement("option");
				createdOption.textContent = options[currentOption];

				imagePositionInput.appendChild(createdOption);
			}
		};

		this.addClassNames = function () {
			mainContainer.classList.add("mainContainer");
			inputsContainer.classList.add("inputsContainer");
			customizationContainer.classList.add("customizationContainer");
			imageUrlInput.classList.add("imageUrlInput");
			textContentInput.classList.add("textContentInput");
			imagePositionInput.classList.add("imagePositionInput");
			imageWidthInput.classList.add("imageWidthInput");

			outputPreviewContainer.classList.add("textContentInput");
			outputTextContainer.classList.add("imagePositionInput");
			outputImageContainer.classList.add("imageWidthInput");
			outputPreviewButton.classList.add("outputPreviewButton");
		};

		// create elements
		const mainContainer = document.createElement("div");
		const inputsContainer = document.createElement("div");
		const customizationContainer = document.createElement("div");
		const imageUrlInput = document.createElement("input");
		const textContentInput = document.createElement("textarea");
		const imagePositionInput = document.createElement("select");
		const imageWidthInput = document.createElement("input");

		const outputPreviewContainer = document.createElement("div");
		const outputTextContainer = document.createElement("p");
		const outputImageContainer = document.createElement("img");
		const outputPreviewButton = document.createElement("button");

		// add classnames to elements
		this.addClassNames();

		// add options on position select option
		this.addOptionsForSelect();

		// add placeholders and values
		imageUrlInput.placeholder = "Image Url";
		textContentInput.placeholder = "text contents ...";
		imageWidthInput.placeholder = "image width ...";
		outputPreviewButton.textContent = "show output";

		// append respective elements in order
		customizationContainer.appendChild(imagePositionInput);
		customizationContainer.appendChild(imageWidthInput);
		inputsContainer.appendChild(imageUrlInput);
		inputsContainer.appendChild(textContentInput);
		inputsContainer.appendChild(customizationContainer);
		inputsContainer.appendChild(outputPreviewButton);
		outputPreviewContainer.append(outputTextContainer);
		outputPreviewContainer.append(outputImageContainer);
		mainContainer.append(inputsContainer);
		mainContainer.append(outputPreviewContainer);

		outputPreviewButton.addEventListener("click", () => {});

		return mainContainer;
	}

	save(blockContent) {
		const imageUrl = blockContent.querySelector(".imageUrlInput").value;
		const textContent = blockContent.querySelector(".textContentInput").value;
		const imagePosition = blockContent.querySelector(
			".imagePositionInput"
		).value;
		const imageWidth = blockContent.querySelector(".imageWidthInput").value;

		return {
			imageUrl: imageUrl,
			textContent: textContent,
			imagePosition: imagePosition,
			imageWidth: imageWidth,
		};
	}
}
