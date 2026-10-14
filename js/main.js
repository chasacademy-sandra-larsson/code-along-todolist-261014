// Todolist: lägg till, bocka av, ta bort, och spara i localStorage.
//
// Datan är föränderlig (mutable). Vi ändrar arrayen todos direkt med
// push och splice, och vi ändrar objekten i den direkt. Efter varje
// ändring gör vi alltid samma två saker: sparar och ritar om.
//
//   ändra datan  →  spara  →  rendera
//
// Sanningen finns i arrayen, inte i DOM:en. DOM:en är bara en bild
// av arrayen, och den bilden ritas om från början varje gång.
//
// HTML:en och CSS:en är klara. Titta i index.html efter id:n.


// Steg 1: Hämta elementen från DOM:en
// ---------------------------------------------------------------

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const count = document.querySelector("#todo-count");
const clearDoneButton = document.querySelector("#clear-done");

// form, input, list, emptyState, count och clearDoneButton.

// Steg 2: Datan
// ---------------------------------------------------------------
// Varje todo är ett objekt:
//   { id: "3f2a…", text: "Handla mjölk", done: false }
//
// Skapa konstanten STORAGE_KEY och arrayen todos. 
// Kan todos vara const fast vi ska ändra i den?

const todos = [];  // Lever bara i minnet, vi gör Local storage om vi hinner mot slutet



// Steg 3: Spara och ladda med localStorage
// ---------------------------------------------------------------
// loadTodos() returnerar den sparade arrayen, eller [] om inget finns.
// saveTodos() sparar todos.
// localStorage kan bara spara strängar: JSON.stringify och JSON.parse.
// Titta i DevTools → Application → Local Storage medan du testar.



// Steg 4: Rendera listan
// ---------------------------------------------------------------
// renderTodos() tömmer listan och bygger upp den igen från arrayen.
// Visa empty-state bara när listan är tom.

function renderTodos() {

    list.replaceChildren();

    for(const todo of todos) {
        list.append(createTodoItem(todo));
    }


    // TODO: Empty state. Om todos = []

    // TODO: Visa hur många todos de finns
}


// createTodoItem(todo) bygger en rad. Strukturen måste matcha CSS:en:
//
// <li class="todo-item" data-id="…">
//   <label class="todo-item-label">
//     <input class="todo-item-checkbox" type="checkbox">
//     <span class="todo-item-text">Handla mjölk</span>
//   </label>
//   <button class="todo-item-delete" type="button" aria-label="Ta bort: Handla mjölk">✕</button>
// </li>
//
// En klar todo får klassen is-done på li-elementet.
//
// renderCount() skriver "2 kvar" och stänger av "Rensa klara"
// när det inte finns något klart att rensa.

function createTodoItem(todo) {

    const li = document.createElement("li");
    li.className = "todo-item";
    li.classList.toggle("is-done", todo.done);
    li.dataset.id = todo.id;

    const label = document.createElement("label");
    label.className = "todo-item-label";

    const checkbox = document.createElement("input");
    checkbox.className = "toddo-item-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    const text = document.createElement("span");
    text.className = "todo-item-text";
    text.textContent= todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "todo-item-delete";
    deleteButton.type = "button";
    deleteButton.textContent = "x";

    label.append(checkbox, text);
    li.append(label, deleteButton);
    
    return li;
    
}



// Steg 5: Spara och rendera i ett
// ---------------------------------------------------------------
// saveAndRender() anropas efter varje ändring.



// Steg 6: Lägg till en todo
// ---------------------------------------------------------------
// Lyssna på submit. Hoppa över tom text. Skapa ett objekt med ett
// unikt id, push:a det och spara och rendera. Töm fältet.
// Varför duger inte arrayens index som id?

form.addEventListener("submit",  (event) => {
    event.preventDefault();

    const text = input.value.trim();
    if(text === "") {
        return;
    }

    const todo = {
        id:  crypto.randomUUID(),
        text: text,
        done: false,
    }

    todos.push(todo);

    // TODO: Spara till local storage
    
    // Rendera nya listan
    renderTodos();

    input.value = "";

    console.log(todos);

})




// Steg 7: Hitta en todo med id
// ---------------------------------------------------------------
// findIndexById(id) returnerar platsen i arrayen, eller -1.

function findIndexById(id) {
    for(let i = 0; i < todos.length; i++) {
        if(todos[i].id === id) {
            return i;
        }
    }
    return -1;
}



// Steg 8: Bocka av och ta bort, med event delegation
// ---------------------------------------------------------------
// En lyssnare på listan, inte en per rad. Varför?
// - change på en .todo-item-checkbox: ändra todo.done

list.addEventListener("change", (event) => {

    console.log("fire event change")
    if(!event.target.matches(".todo-item-checkbox")) {
        return;
    }
   
    console.log("hittar li", event.target.closest(".todo-item"));
    const id = event.target.closest(".todo-item").dataset.id;


    console.log("hitttar id", id)
    const todo = todos[findIndexById(id)];

    console.log("hitttar todo", todo)

    // Uppdaterar att checkboxen är checked eller inte
    todo.done = event.target.checked;

    console.log("uppdaterat todos", todos);

    renderTodos()

})


// - click på en .todo-item-delete: ta bort med splice

// Ta bort knappen
list.addEventListener("click", (event) => {

 
    const deleteButton = event.target.closest(".todo-item-delete");

    if(deleteButton === null) {
        return;
    }

    const id = deleteButton.closest(".todo-item").dataset.id;

    // Hitta index utifrån id

    const index = findIndexById(id);

    // Ta bort todon från lista
    todos.splice(index, 1);


    // Render om listan
    renderTodos();



})



// Steg 9: Rensa klara
// ---------------------------------------------------------------
// Ta bort alla klara med splice i en loop.
// Testa att loopa framåt först. Vad händer med två klara i rad?


// Steg 10: Rita listan när sidan laddas
// ---------------------------------------------------------------

renderTodos();