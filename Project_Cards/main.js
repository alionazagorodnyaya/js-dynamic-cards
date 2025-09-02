class Card {
	#title;
	#id;
	constructor(title, id) {
		this.#title = title;
		this.#id = id;
	}
	get title() {
		return this.#title;
	}
	get id() {
		return this.#id;
	}
	render() {
		const cardDiv = document.createElement("div");
		const title = document.createElement("h1");
		const id = document.createElement("p");
		id.textContent = this.id;
		title.textContent = this.title;
		const removeBtn = document.createElement("button");
		removeBtn.textContent = "remove";
		removeBtn.onclick = () => this.remove();
		const collapseBtn = document.createElement("button");
		collapseBtn.textContent = "collapse";
		cardDiv.append(id, title, removeBtn, collapseBtn);
		this.element = cardDiv;
		return cardDiv;
	}

	remove() {
		this.element.remove();
	}
	toggleCollapse() {}
}
class Textcard extends Card {
	#text;
	constructor(title, id, text) {
		super(title, id);
		this.#text = text;
	}
	get text() {
		return this.#text;
	}
	render() {
		const cardDiv = super.render();
		const text = document.createElement("p");
		text.textContent = this.text;
		cardDiv.append(text);
		return cardDiv;
	}
}
class ImageCard extends Card {
	#url;
	constructor(title, id, url) {
		super(title, id);
		this.#url = url;
	}
	get url() {
		return this.#url;
	}
	render() {
		const cardDiv = super.render();
		const img = document.createElement("img");
		img.src = this.url;
		cardDiv.append(img);
		return cardDiv;
	}
}
class TodoCard extends Card {
	#tasks;

	constructor(title, id, tasks) {
		super(title, id);
		this.#tasks = tasks;
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
createBtn.onclick = () => {
	const value = select.value;

	if (value == "Text-card") {
		const title = formCard.querySelector("input").value;
		const text = formCard.querySelector("textarea").value;

		const card = new Textcard(title, value, text);
		const container = document.querySelector("#cards");
		container.append(card.render());
		console.log(text);
	}

	if (value == "Image-card") {
		const title = formCard.querySelector("input").value;
		const url = formCard.querySelector("input").value;

		const card = new ImageCard(title, value, url);
		const container = document.querySelector("#cards");
		container.append(card.render());
	}
};
