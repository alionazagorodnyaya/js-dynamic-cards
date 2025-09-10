class Card {
	#title;
	#id;
	#element;
	#body;

	constructor(title, id) {
		this.#title = title;
		this.#id = id;
		this.#element = null;
		this.#body = null;
	}
	get title() {
		return this.#title;
	}
	get id() {
		return this.#id;
	}
	get body() {
		return this.#body;
	}
	render() {
		const cardDiv = document.createElement("div");
		const header = document.createElement("div");
		const title = document.createElement("h1");
		const id = document.createElement("p");
		id.textContent = this.id;
		title.textContent = this.title;
		const removeBtn = document.createElement("button");
		removeBtn.textContent = "remove";
		removeBtn.onclick = () => this.remove();
		const collapseBtn = document.createElement("button");
		collapseBtn.textContent = "collapse";
		collapseBtn.onclick = () => this.toggleCollapse();
		header.append(id, removeBtn, collapseBtn);
		const body = document.createElement("div");
		body.append(title);
		this.#body = body;
		cardDiv.append(header, body);
		this.#element = cardDiv;
		return cardDiv;
	}

	remove() {
		this.#element.remove();
	}
	toggleCollapse() {
		if (this.body.style.display == "none") {
			this.body.style.display = "flex";
		} else {
			this.body.style.display = "none";
		}
	}
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
		this.body.append(text);
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
		this.body.append(img);
		return cardDiv;
	}
}
class TodoCard extends Card {
	#tasks;

	constructor(title, id, tasks) {
		super(title, id);
		this.#tasks = tasks;
	}
	get tasks() {
		return this.#tasks;
	}
	render() {
		const cardDiv = super.render();

		const ul = document.createElement("ul");
		this.#tasks.forEach((task) => {
			const li = document.createElement("li");

			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			const tasksinfo = document.createElement("p");
			tasksinfo.textContent = task;

			li.append(checkbox, tasksinfo);
			ul.append(li);
		});
		this.body.append(ul);
		return cardDiv;
	}
}

const select = document.querySelector("select");
const formCard = document.querySelector("#form-card");
const createBtn = document.querySelector("#createBtn");

class GenerateLayout {
	static createTextCard(formCard) {
		const textTitle = document.createElement("input");
		textTitle.placeholder = "Add Title";
		const textArea = document.createElement("textarea");
		formCard.append(textTitle);
		formCard.append(textArea);
		createBtn.style.display = "flex";
	}
	static createImageCard(formCard) {
		const textTitle = document.createElement("input");
		textTitle.placeholder = "Add Title";
		const imgInput = document.createElement("input");
		imgInput.type = "url";
		imgInput.placeholder = "URL";
		formCard.append(textTitle);
		formCard.append(imgInput);
		createBtn.style.display = "flex";
	}
	static createTodoCard(formCard) {
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
		createBtn.style.display = "flex";
	}
}

select.onchange = () => {
	formCard.innerHTML = "";
	const value = select.value;
	createBtn.style.display = "none";

	switch (value) {
		case "Text-card":
			GenerateLayout.createTextCard(formCard);
			break;

		case "Image-card":
			GenerateLayout.createImageCard(formCard);
			break;

		case "Todo-card":
			GenerateLayout.createTodoCard(formCard);
			break;
	}
};

createBtn.onclick = () => {
	const value = select.value;
	switch (value) {
		case "Text-card": {
			const title = formCard.querySelector("input").value;
			const text = formCard.querySelector("textarea").value;

			const card = new Textcard(title, value, text);
			const container = document.querySelector("#cards");
			container.append(card.render());
			console.log(text);
			formCard.querySelector("input").value = "";
			formCard.querySelector("textarea").value = "";
			break;
		}

		case "Image-card": {
			const title = formCard.querySelector("input").value;
			const url = formCard.querySelector("input").value;

			const card = new ImageCard(title, value, url);
			const container = document.querySelector("#cards");
			container.append(card.render());
			formCard
				.querySelectorAll("input")
				.forEach((input) => (input.value = ""));

			break;
		}
		case "Todo-card": {
			const title = formCard.querySelector("input").value;
			const tasks = [];

			formCard.querySelectorAll("ul li").forEach((li) => {
				tasks.push(li.textContent);
			});

			const card = new TodoCard(title, value, tasks);
			const container = document.querySelector("#cards");
			container.append(card.render());
			formCard.querySelector("input").value = "";
			formCard
				.querySelectorAll("ul")
				.forEach((ul) => (ul.innerHTML = ""));

			break;
		}
	}
};

/*
	1 - кнопка создания только если выбран тип создания
    2 - очищать инпуты закончить 
	3 - Сделать сворачивание
*/
