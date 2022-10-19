class editableDiv {
	static get toolbox() {
		return {
			title: "editable Div",
			icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path fill="#7D58E6" d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
		};
	}

	constructor() {
		this.mainContainer = undefined;
	}

	render() {
		this.addClasses = () => {
			mainContainer.classList.add("mainContainer");
			editableDiv.classList.add("editableDiv");
			editableDiv.id = "editableDiv";
		};

		this.configureElements = () => {
			// configure DOM elements, add contents and so on...
			editableDiv.contentEditable = true;
			editableDiv.innerHTML = "<b>Hello there</b>";
		};

		this.manageDOM = () => {
			// create DOM herarchy
			mainContainer.appendChild(editableDiv);
		};

		// create elements
		const mainContainer = document.createElement("div");
		const editableDiv = document.createElement("div");

		this.addClasses();
		this.configureElements();
		this.manageDOM();

		// create new editorJs instance and use it inside editableDiv element
		let editorjs_instance = new EditorJS({
			autofocus: true,
			holder: "editableDiv",
			tools: {},
		});

		console.log(editorjs_instance);

		this.mainContainer = mainContainer;
		return this.mainContainer;
	}

	save(blockContent) {
		return {
			imageUrl: "imageUrl",
			caption: "captionElement.innerHTML",
			imagePosition: "imagePosition",
			imageWidthPercentage: "imageWidthPercentage",
			isCaptionEmpty: 'captionElement.textContent === ""',
		};
	}

	validate(savedData) {
		return true;
	}
}
