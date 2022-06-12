const getBtn = document.getElementById("get");
const postBtn = document.getElementById("post");
const putBtn = document.getElementById("put");
const delBtn = document.getElementById("del");

const ol = document.getElementById("ol");
const postForm = document.getElementById("postForm");
const putForm = document.getElementById("putForm");
const delForm = document.getElementById("delForm");

const url = "https://jsonplaceholder.typicode.com/posts";

let count = 100;

const clearPage = () => {
	while (ol.firstChild) {
		ol.removeChild(ol.lastChild);
	}
	while (postForm.firstChild) {
		postForm.removeChild(postForm.lastChild);
	}
	while (putForm.firstChild) {
		putForm.removeChild(putForm.lastChild);
	}
	while (delForm.firstChild) {
		delForm.removeChild(delForm.lastChild);
	}
};

const getResponse = response => response.json();

const processArray = json => {
	for (const objElement of json) {
		processJSON(objElement);
	}
};

const processJSON = json => {
	let li = document.createElement("li");
	let content = document.createElement("div");
	let title = document.createElement("div");
	let text = document.createElement("div");
	let userId = document.createElement("span");
	let id = document.createElement("span");
	
	li.classList.add("list-group-item");
	li.classList.add("d-flex");
	li.classList.add("justify-content-between");
	li.classList.add("align-items-start");
	
	content.classList.add("ms-2");
	content.classList.add("me-auto");
	
	title.classList.add("fw-bold");
	
	userId.classList.add("badge");
	userId.classList.add("bg-primary");
	userId.classList.add("rounded-pill");
	userId.classList.add("me-1");
	
	id.classList.add("badge");
	id.classList.add("bg-success");
	id.classList.add("rounded-pill");
	
	title.innerHTML = json.title;
	text.innerHTML = json.body;
	userId.innerHTML = json.userId;
	id.innerHTML = json.id;
	
	content.appendChild(title);
	content.appendChild(text);
	li.appendChild(content);
	li.appendChild(userId);
	li.appendChild(id);
	
	ol.appendChild(li);
};

const showPostForm = () => {
	clearPage();
	
	postForm.innerHTML =
		`
		<label class="form-label" for="userIDInput">User Id:</label>
		<input class="form-control" type="text" placeholder="Your user ID" id="userIDInput">
		
		<label class="form-label" for="titleInput">Title</label>
		<input class="form-control" type="text" placeholder="The title of your post" id="titleInput">
		
		<label class="form-label" for="bodyInput">Body</label>
		<input class="form-control mb-3" type="text" placeholder="The text of your post" id="bodyInput">
		
		<input class="btn btn-outline-success" type="button" id="postBtn" value="submit">
		`;
	
	document.getElementById("postBtn").addEventListener("click", postData);
};

const showPutForm = () => {
	clearPage();
	
	putForm.innerHTML =
		`
		<label class="form-label" for="postIDInput">Post Id:</label>
		<input class="form-control" type="text" placeholder="The ID of the post" id="postIDInput">
		
		<label class="form-label" for="titleInput">Title</label>
		<input class="form-control" type="text" placeholder="New title" id="titleInput">
		
		<label class="form-label" for="bodyInput">Body</label>
		<input class="form-control mb-3" type="text" placeholder="new text" id="bodyInput">
		
		<input class="btn btn-outline-warning" type="button" id="putBtn" value="submit">
		`;
	
	document.getElementById("putBtn").addEventListener("click", putData);
};

const showDeleteForm = () => {
	clearPage();
	
	putForm.innerHTML =
		`
		<label class="form-label" for="postIDInput">Post Id:</label>
		<input class="form-control mb-3" type="text" placeholder="The ID of the post" id="postIDInput">
		
		<input class="btn btn-outline-danger" type="button" id="delBtn" value="delete">
		`;
	
	document.getElementById("delBtn").addEventListener("click", deleteData);
}

const postData = () => {
	let userID = document.getElementById("userIDInput").value;
	let title = document.getElementById("titleInput").value;
	let text = document.getElementById("bodyInput").value;
	
	const data = {
		id: ++count,
		userId: userID,
		title: title,
		body: text,
	};
	
	fetch(url, {method: "POST", body: JSON.stringify(data)})
	.then(getResponse)
	.then(processJSON);
};

const putData = () => {
	let postID = document.getElementById("postIDInput").value;
	let title = document.getElementById("titleInput").value;
	let text = document.getElementById("bodyInput").value;
	
	const data = {
		title: title,
		body: text,
	}
	
	fetch(url + "/" + postID, {method: "PUT", body: JSON.stringify(data)})
	.then(getResponse)
	.then(processJSON);
};

const deleteData = () => {
	let postID = document.getElementById("postIDInput").value;
	
	fetch(url + "/" + postID, {method: "DELETE"})
	.then(getResponse)
	.then(processJSON);
}

const getData = () => {
	clearPage();
	
	fetch(url, {method: "GET"})
	.then(getResponse)
	.then(processArray);
};

getBtn.addEventListener("click", getData);
postBtn.addEventListener("click", showPostForm);
putBtn.addEventListener("click", showPutForm);
delBtn.addEventListener("click", showDeleteForm);
