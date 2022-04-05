let myLibrary = [];

function Book(name, author, pages, status) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary() {
  document.getElementById("add").style.opacity = 0;
  let i = myLibrary.length + 1;
  let title = document.getElementById("title").value;
  let writer = document.getElementById("author").value;
  let pageCount = document.getElementById("pages").value;
  let readStat = document.querySelector('input[type=radio]:checked').value;
  const book = new Book(title, writer, pageCount, readStat);
  myLibrary.push(book);
}

function showBook() {
  for (let i = myLibrary.length - 1; i < myLibrary.length; i++) {
    const container = document.createElement("div")
    const title = document.createElement("p");
    const writer = document.createElement("p");
    const page = document.createElement("p");
    const read = document.createElement("button");
    const removal = document.createElement("button");

    container.className = "book";
    container.setAttribute("data-book", i)
    read.setAttribute("type", "button")
    removal.innerHTML = "Remove";
    removal.setAttribute("type", "button");
    removal.setAttribute("class", "remove")
    title.innerHTML = myLibrary[i].name;
    writer.innerHTML = myLibrary[i].author;
    page.innerHTML = myLibrary[i].pages;
    read.innerHTML = myLibrary[i].status;

    if (read.innerHTML == "read") {
      read.setAttribute("class", "read");
    } else if (read.innerHTML == "unread") {
      read.setAttribute("class", "unread");
    }

    container.append(title, writer, page, read, removal);
    document.getElementById("main").appendChild(container)
    document.querySelectorAll(".remove").forEach(function (item) {
      item.addEventListener("click", removeBook);
    });

    document.querySelectorAll(".read, .unread").forEach(function (e) {
      e.addEventListener("click", mark);
    })
  }
}

function removeBook(event) {
  event.target.parentNode.remove();
  myLibrary.splice(event.target.parentNode.getAttribute('data-book'), 1)
  document.querySelectorAll("[data-book]").forEach(function (data) {
    data.removeAttribute("data-book");
  })
  update()
}

function update() {
  let i = 0
  document.querySelectorAll(".book").forEach(function (btn) {
    btn.setAttribute("data-book", i);
    i = i + 1;
  });
}

function mark(event) {
  if (event.target.textContent == "read") {
    event.target.classList.remove("read");
    event.target.classList.add("unread");
    myLibrary[event.target.parentNode.getAttribute('data-book')].status = "unread";
    event.target.textContent = "unread";
  } else if (event.target.textContent == "unread") {
    event.target.classList.remove("unread");
    event.target.classList.add("read");
    myLibrary[event.target.parentNode.getAttribute('data-book')].status = "read";
    event.target.textContent = "read";
  }
}

document.getElementById("new").addEventListener("click", function () {
  document.getElementById("add").style.opacity = 1;
})

document.getElementById("add").addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
  document.getElementById("add").reset();
  showBook();
});

document.querySelector(".cancel").addEventListener("click", function(e) {
  e.target.parentNode.style.opacity = 0;
})


