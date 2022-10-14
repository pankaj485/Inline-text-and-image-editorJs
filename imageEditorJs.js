class imageEditorJs {
	static get toolbox() {
		return {
			title: "Pank Image",
			icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path fill="#7D58E6" d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
		};
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
			customizationContainer.classList.add("customizationContainer");
			imageUrlInput.classList.add("imageUrlInput");
			textContentInput.classList.add("textContentInput");
			imagePositionInput.classList.add("imagePositionInput");
			imageWidthInput.classList.add("imageWidthInput");
		};

		// create elements
		const mainContainer = document.createElement("div");
		const customizationContainer = document.createElement("div");
		const imageUrlInput = document.createElement("input");
		const textContentInput = document.createElement("textarea");
		const imagePositionInput = document.createElement("select");
		const imageWidthInput = document.createElement("input");

		// add classnames to elements
		this.addClassNames();

		// add options on position select option
		this.addOptionsForSelect();

		// add placeholders
		imageUrlInput.placeholder = "Image Url";
		textContentInput.placeholder = "text contents ...";
		imageWidthInput.placeholder = "image width ...";

		// append respective elements in order
		customizationContainer.appendChild(imagePositionInput);
		customizationContainer.appendChild(imageWidthInput);
		mainContainer.appendChild(imageUrlInput);
		mainContainer.appendChild(textContentInput);
		mainContainer.appendChild(customizationContainer);

		return mainContainer;
	}

	save(blockContent) {
		return {
			url: blockContent.value,
		};
	}
}
