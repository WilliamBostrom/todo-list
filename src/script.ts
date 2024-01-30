import circleSvg from "/circle.svg";
import checkedSvg from "/checked.svg";
import trashSvg from "/trash.svg";
import editSvg from "/edit.svg";

import {
  getAuth,
  signInWithEmailAndPassword,
  Auth,
  UserCredential,
  User,
  onAuthStateChanged,
} from "firebase/auth";
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

import { closeLogin } from "./login";

console.log(app, data, dbRef);

// ------------------------
// Lyssnar efter om inloggad/utloggad
// ------------------------
const auth: Auth = getAuth(app);
console.log(auth);
const btnOpenLogin: HTMLButtonElement | null = document.getElementById(
  "signin"
) as HTMLButtonElement;
const btnOpenLogout: HTMLButtonElement | null = document.getElementById(
  "signout"
) as HTMLButtonElement;

const content: HTMLElement | null = document.querySelector(
  ".user-content"
) as HTMLUnknownElement;
const noUserContent: HTMLElement | null = document.querySelector(
  ".nouser-content"
) as HTMLUnknownElement;

onAuthStateChanged(auth, (user: User | null) => {
  if (user) {
    // const userId = user.uid;
    console.log("inloggad");

    btnOpenLogin.style.display = "none";
    btnOpenLogout.style.display = "block";
    content.style.display = "block";
    noUserContent.style.display = "none";
  } else {
    console.log("Utloggad");
    btnOpenLogin.style.display = "block";
    btnOpenLogout.style.display = "none";
    content.style.display = "none";
    noUserContent.style.display = "flex";
  }
});

// ----------------------
// To-Do Login
// ----------------------

const loginEmail: HTMLInputElement | null = document.getElementById(
  "login-email"
) as HTMLInputElement;
const loginPassword: HTMLInputElement | null = document.getElementById(
  "login-password"
) as HTMLInputElement;
const formSignin: HTMLFormElement | null = document.getElementById(
  "signin-form"
) as HTMLFormElement;

formSignin?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email: string = loginEmail?.value || "";
  const password: string = loginPassword?.value || "";

  try {
    const cred: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(cred.user);
    closeLogin();
  } catch (error: unknown) {
    console.log((error as Error).message);
    showError(loginEmail, "Ogiltig email eller lösenord"); // Passera in det relevanta input-elementet
  }
});

function showError(input: HTMLInputElement | null, message: string) {
  if (input) {
    const formControl: HTMLElement | null = input.parentElement;

    if (formControl) {
      formControl.className = "form-control error";
      const small = formControl.querySelector("small");

      if (small) {
        small.innerText = message;
      }
    }
  }
}

// ----------------------
// To-Do Logout
// ----------------------
btnOpenLogout.addEventListener("click", () => {
  auth.signOut();
});
// ----------------------
// To-Do btn & To-Do input
// ----------------------

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
        <img class="circle-imgs" src="${circleSvg}" alt="circle"
       />
      </button>
      <div class="todo-text" data-p-id="${item.id}"><p>${item.todo}</p></div>
      <div class="todo-btns">
        <div class="todo-edit-del">
          <button class="delete">
            <img
              class="delete-img"
              src="${trashSvg}"
              alt="delete button"
            />
          </button>
          <button class="edit">
            <img
              class="edit-img"
              src="${editSvg}"
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
  } else if ((event.target as HTMLElement).classList.contains("circle-imgs")) {
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
    console.log("Todo deleted");
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
    `[data-todo-id="${todoId}"] .circle-imgs`
  );
  const todoParagraph: HTMLParagraphElement | null = document.querySelector(
    `[data-p-id="${todoId}"] p`
  );

  if (circleImg && todoParagraph) {
    if (!checked) {
      circleImg.src = circleSvg;
      circleImg.alt = "circle";
      todoParagraph.style.textDecoration = "none";
    } else {
      circleImg.src = checkedSvg;
      circleImg.alt = "circle checked";
      todoParagraph.style.textDecoration = "line-through";
    }
  } else {
    console.error("Circle image or paragraph not found");
  }
};
