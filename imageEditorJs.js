class imageEditorJs {
	static get toolbox() {
		return {
			title: "Inline Text And Image",
			icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path fill="#7D58E6" d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
		};
	}

	constructor({ data }) {
		this.data = data;
		this.mainContainer = undefined;
		this.outputPreviewContainer = undefined;
		this.outputTextContainer = undefined;
		this.outputImageContainer = undefined;
		this.layoutEditorJs = undefined;
		this.textContent = undefined;
	}

	render() {
		const randomIndex = (Math.random() + 1).toString(36).substring(7);

		const data = {
			blocks: [
				{
					type: "layout",
					data: {
						itemContent: {
							1: {
								blocks: [
									{
										type: "header",
										data: {
											text: "Start with editing this header",
										},
									},
								],
							},
						},
					},
				},
			],
		};

		const editorJSConfig = {
			tools: {
				header: {
					class: Header,
					config: {
						placeholder: "Enter a header",
						levels: [2, 3, 4],
						defaultLevel: 3,
					},
				},
				list: {
					class: List,
					inlineToolbar: true,
					config: {
						defaultStyle: "unordered",
					},
				},
				// nestedList: {
				// 	class: NestedList,
				// 	inlineToolbar: true,
				// },
			},
		};

		const tools = {
			layout: {
				class: EditorJSLayout.LayoutBlockTool,
				config: {
					EditorJS,
					editorJSConfig,
					enableLayoutEditing: false,
					enableLayoutSaving: true,
					initialData: {
						itemContent: {
							1: {
								blocks: [],
							},
						},
						layout: {
							type: "container",
							id: "",
							className: "",
							style: "",
							children: [
								{
									type: "item",
									id: "",
									className: "hello",
									style:
										"display: inline-block; width:100%; box-sizing: border-box; ",
									itemContentId: "1",
								},
							],
						},
					},
				},
			},
		};

		this.useNestedEditorJs = () => {
			// create new editorJs instance and use it inside editableDiv element
			let textContentInput_editorjs_instance = new EditorJS({
				holder: "textContentInput" + randomIndex,
				autofocus: true,
				tools: tools,
				data: data,
				defaultBlock: "layout",
			});

			this.layoutEditorJs = textContentInput_editorjs_instance;
		};

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
			imageUrlInputContainer.classList.add("imageUrlInputContainer");
			imageUrlLabel.classList.add("imageUrlLabel");
			imageUrlInput.classList.add("imageUrlInput");
			textContentInput.classList.add("textContentInput");
			textContentInput.id = "textContentInput" + randomIndex;
			imagePositionInput.classList.add("imagePositionInput");
			showOutputPreviewButton.classList.add("showOutputPreviewButton");
			outputControllers.classList.add("outputControllers");
			hideOutputPreviewButton.classList.add("hideOutputPreviewButton");
			saveTextContentsButton.classList.add("saveTextContentsButton");
			imageWidthInputOption.classList.add("imageWidthInputOption");
			imagePositionLabel.classList.add("imagePositionLabel");
			imageWidthLabel.classList.add("imageWidthLabel");
			imageWidthContainer.classList.add("imageWidthContainer");
			imagePositionContainer.classList.add("imagePositionContainer");
			outputPreviewContainer.classList.add("outputPreviewContainer");
			outputPreviewContainer.id = "outputPreviewContainer" + randomIndex;
			outputTextContainer.classList.add("outputTextContainer");
			outputImageContainer.classList.add("outputImageContainer");
		};

		// create elements
		const mainContainer = document.createElement("div");
		const inputsContainer = document.createElement("div");
		const customizationContainer = document.createElement("div");
		const imageUrlInputContainer = document.createElement("div");
		const imageUrlLabel = document.createElement("p");
		const imageUrlInput = document.createElement("input");
		const textContentInput = document.createElement("div");
		const imagePositionInput = document.createElement("select");
		const imageWidthInputOption = document.createElement("select");
		const imagePositionContainer = document.createElement("div");
		const imageWidthContainer = document.createElement("div");
		const imagePositionLabel = document.createElement("label");
		const imageWidthLabel = document.createElement("label");
		const outputControllers = document.createElement("div");
		const showOutputPreviewButton = document.createElement("button");
		const hideOutputPreviewButton = document.createElement("button");
		const saveTextContentsButton = document.createElement("button");

		// create UI for showing output and populate them globally
		const outputPreviewContainer = document.createElement("div");
		const outputTextContainer = document.createElement("div");
		const outputImageContainer = document.createElement("img");
		this.outputPreviewContainer = outputPreviewContainer;
		this.outputTextContainer = outputTextContainer;
		this.outputImageContainer = outputImageContainer;

		// add classnames to elements
		this.addClassNames();

		// add options on position select option
		this.addOptionsForSelect();

		// add placeholders and values
		imageUrlLabel.textContent = "Image Url:";
		imageUrlInput.placeholder = "add image url...";
		imageUrlInput.value =
			this.data && this.data.imageUrl ? this.data.imageUrl : "";
		// textContentInput.contentEditable = true;
		// textContentInput.setAttribute("placeholder", "Content...");
		textContentInput.innerHTML =
			this.data && this.data.caption ? this.data.caption : "";
		saveTextContentsButton.textContent = "save contents";
		showOutputPreviewButton.textContent = "show output";
		hideOutputPreviewButton.textContent = "hide output";
		imageWidthLabel.textContent = "Image Width ";
		imagePositionLabel.textContent = "Image Position ";

		// use nested editor js on textInput
		this.useNestedEditorJs();

		// append respective elements in order
		imageWidthContainer.appendChild(imageWidthLabel);
		imageWidthContainer.appendChild(imageWidthInputOption);
		imagePositionContainer.appendChild(imagePositionLabel);
		imagePositionContainer.appendChild(imagePositionInput);
		customizationContainer.appendChild(imagePositionContainer);
		customizationContainer.appendChild(imageWidthContainer);

		imageUrlInputContainer.appendChild(imageUrlLabel);
		imageUrlInputContainer.appendChild(imageUrlInput);
		inputsContainer.appendChild(imageUrlInputContainer);
		inputsContainer.appendChild(customizationContainer);
		inputsContainer.appendChild(textContentInput);
		outputControllers.appendChild(saveTextContentsButton);
		outputControllers.appendChild(showOutputPreviewButton);
		outputControllers.appendChild(hideOutputPreviewButton);
		inputsContainer.appendChild(outputControllers);
		mainContainer.append(inputsContainer);

		showOutputPreviewButton.addEventListener("click", () => {
			const imageUrl = imageUrlInput.value;
			const textContent = textContentInput.innerHTML;
			const imagePosition = imagePositionInput.value;
			const imageWidthOption = imageWidthInputOption.value;
			const outputPreviewContainer = this.outputPreviewContainer;
			const outputTextContainer = this.outputTextContainer;
			const outputImageContainer = this.outputImageContainer;

			outputPreviewContainer.style.display = "flex";

			this._createImage(
				imageUrl,
				imagePosition,
				textContent,
				imageWidthOption,
				outputPreviewContainer,
				outputTextContainer,
				outputImageContainer
			);
		});

		hideOutputPreviewButton.addEventListener("click", () => {
			document.getElementById(
				"outputPreviewContainer" + randomIndex
			).style.display = "none";
		});

		saveTextContentsButton.addEventListener("click", () => {
			this.layoutEditorJs
				.save()
				.then((outputData) => {
					this.textContent = outputData;
				})
				.catch((error) => {
					console.log("Saving failed: ", error);
				});
		});

		this.mainContainer = mainContainer;
		return mainContainer;
	}

	_createImage(
		imageUrl,
		imagePosition,
		textContent,
		imageWidthOption,
		outputPreviewContainer,
		outputTextContainer,
		outputImageContainer
	) {
		this.setImageWidth = (imageWidthOption) => {
			let imageWidthInPercentage = Number(imageWidthOption.split("%")[0]);
			let contentWidthInPercentage = 100 - imageWidthInPercentage;
			outputImageContainer.style.width = `${imageWidthInPercentage}%`;
			outputTextContainer.style.width = `${contentWidthInPercentage}%`;
		};

		outputImageContainer.src = imageUrl;
		this.setImageWidth(imageWidthOption);
		outputTextContainer.innerHTML = textContent;

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
		const imagePosition = blockContent.querySelector(
			".imagePositionInput"
		).value;
		const imageWidthPercentage = blockContent.querySelector(
			".imageWidthInputOption"
		).value;

		return {
			imageUrl: imageUrl,
			textContent: this.textContent,
			imagePosition: imagePosition,
			imageWidthPercentage: imageWidthPercentage,
		};
	}

	validate(savedData) {
		const { imageUrl, imagePosition, imageWidthPercentage } = savedData;

		let isValidated = false;

		if (imageUrl.length > 0 && imagePosition && imageWidthPercentage)
			isValidated = true;

		if (!isValidated) {
			return false;
		}

		return true;
	}
}
