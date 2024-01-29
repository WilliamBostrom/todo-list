import {
  app,
  data,
  dbRef,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  DocumentReference,
} from "./firebase";
console.log(app, data, dbRef);

const addTodoBtn = document.getElementById(
  "add-todo-form"
) as HTMLButtonElement | null;
const todoInput = document.getElementById(
  "todo-input"
) as HTMLInputElement | null;

if (addTodoBtn && todoInput) {
  addTodoBtn.addEventListener("submit", async (e) => {
    e.preventDefault();
    const todoValue: string | undefined = getTodo();
    console.log(todoValue);

    const todoId = todoInput.getAttribute("todo-id");

    if (todoId !== null) {
      const docRef = doc(data, "todos", todoId);

      try {
        await updateDoc(docRef, {
          todo: todoValue,
        });
        todoInput.value = "";
        todoInput.removeAttribute("todo-id");
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await addDoc(dbRef, {
          todo: todoValue,
        });
        todoInput.value = "";
      } catch (err) {
        console.log(err);
      }
    }
  });
}

const getTodo = (): string | undefined => {
  if (!todoInput) {
    return undefined;
  }

  const trimmedValue = todoInput.value.trim();
  if (trimmedValue === "") {
    return undefined;
  }

  return trimmedValue;
};

// ----------------------
// Hämtar datan
// ----------------------

interface Todo {
  id: string;
  todo: string;
}

let todos: Todo[] = [];

const getTodos = async () => {
  try {
    await onSnapshot(dbRef, (docsSnap) => {
      todos = [];
      docsSnap.forEach((doc) => {
        const todo = doc.data();
        todo.id = doc.id;
        todos.push({ id: doc.id, todo: todo.todo });
      });
      showTodos(todos);
    });
  } catch (err) {
    console.log("Hämtar to do =" + err);
  }
};

getTodos();

// ----------------------
// Visar datan
// ----------------------
const showTodos = (todos: Todo[]) => {
  const displayTodos = document.getElementById(
    "todo-list"
  ) as HTMLElement | null;

  if (displayTodos) {
    displayTodos.innerHTML = "";

    todos.forEach((item) => {
      const li = ` <li class="todo-item" id="${item.id}">
      <button class="todo-check" data-todo-id="${item.id}">
        <img class="circle-img" src="./src/img/circle.svg" alt="circle"
       />
      </button>
      <div class="todo-text" data-p-id="${item.id}"><p>${item.todo}</p></div>
      <div class="todo-btns">
        <div class="todo-edit-del">
          <button class="delete">
            <img
              class="delete-img"
              src="./src/img/trash-svgrepo-com.svg"
              alt="delete button"
            />
          </button>
          <button class="edit">
            <img
              class="edit-img"
              src="./src/img/edit-3-svgrepo-com.svg"
              alt="edit button"
            />
          </button>
        </div>
      </div>
    </li>`;

      displayTodos.innerHTML += li;
    });
  }
};

// ----------------------
// Finding Edit & Delete btns
// ----------------------

const todoListPressed = (event: Event): void => {
  const id: string | null =
    (event.target as HTMLElement).closest("li")?.getAttribute("id") || null;

  if ((event.target as HTMLElement).classList.contains("edit-img")) {
    editButtonPressed(id);
    console.log("edit knappen", id);
  } else if ((event.target as HTMLElement).classList.contains("delete-img")) {
    deleteButtonPressed(id);
    console.log("fungerar", id);
  } else if ((event.target as HTMLElement).classList.contains("circle-img")) {
    circleButtonPressed(id);
    console.log("circle", id);
  } else {
    return undefined;
  }
};

const listedTodo = document.getElementById("todo-list") as HTMLElement | null;
listedTodo?.addEventListener("mousedown", todoListPressed);

// ----------------------
// Edit To do
// ----------------------
const editButtonPressed = (id: string | null): void => {
  if (!id) {
    console.error("Invalid todo ID");
    return;
  }

  const todoToEdit = todos.find((todo) => todo.id === id);

  if (todoToEdit) {
    todoInput!.value = todoToEdit.todo;
    todoInput!.setAttribute("todo-id", todoToEdit.id);
  } else {
    console.error("Todo not found");
  }
};

// ----------------------
// Delete To do
// ----------------------
const deleteButtonPressed = async (id: string | null): Promise<void> => {
  if (!id) {
    console.error("Invalid todo ID");
    return;
  }

  const docRef: DocumentReference = doc(data, "todos", id);

  try {
    await deleteDoc(docRef);
    console.log("Todo deleted successfully");
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
};

// ----------------------
// Checkbox To do
// ----------------------
let checked: boolean = false;
const circleButtonPressed = (todoId: string | null): void => {
  if (!todoId) {
    console.error("Invalid todo ID");
    return;
  }

  checked = !checked;

  const circleImg: HTMLImageElement | null = document.querySelector(
    `[data-todo-id="${todoId}"] .circle-img`
  );
  const todoParagraph: HTMLParagraphElement | null = document.querySelector(
    `[data-p-id="${todoId}"] p`
  );

  if (circleImg && todoParagraph) {
    if (!checked) {
      circleImg.src = "./src/img/circle.svg";
      circleImg.alt = "circle";
      todoParagraph.style.textDecoration = "none";
    } else {
      circleImg.src = "./src/img/circle-checked.svg";
      circleImg.alt = "circle checked";
      todoParagraph.style.textDecoration = "line-through";
    }
  } else {
    console.error("Circle image or paragraph element not found");
  }
};
