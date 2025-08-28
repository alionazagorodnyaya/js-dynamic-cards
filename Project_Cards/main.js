class Card {
	#title;
	#id;
	constructor(title, id) {
		this.#title = title;
		this.#id = id;
	}
}

const select = document.querySelector("select");
const formCard = document.querySelector("#form-card");
const createBtn = document.querySelector("#createBtn");
select.onchange = () => {
	formCard.innerHTML = "";

	const value = select.value;
	if (value == "Text-card") {
		const textTitle = document.createElement("input");
		textTitle.placeholder = "Add Title";
		const textArea = document.createElement("textarea");
		formCard.append(textTitle);
		formCard.append(textArea);
	}
	if (value == "Image-card") {
		const textTitle = document.createElement("input");
		textTitle.placeholder = "Add Title";
		const imgInput = document.createElement("input");
		imgInput.type = "url";
		imgInput.placeholder = "URL";
		formCard.append(textTitle);
		formCard.append(imgInput);
	}
	if (value == "Todo-card") {
		const textTitle = document.createElement("input");
		textTitle.placeholder = "Add Title";
		const todoInput = document.createElement("input");
		todoInput.placeholder = "Add tasks";
		const todoBtn = document.createElement("button");
		todoBtn.textContent = "Add";
		const todoList = document.createElement("ul");
		todoBtn.onclick = () => {
			const li = document.createElement("li");
			const inputCheck = document.createElement("input");
			inputCheck.type = "checkbox";
			li.append(inputCheck);
			li.append(todoInput.value);
			todoList.append(li);
			todoInput.value = "";
		};
		formCard.append(textTitle);
		formCard.append(todoInput);
		formCard.append(todoBtn);
		formCard.append(todoList);
	}
};
