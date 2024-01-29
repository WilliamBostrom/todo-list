const btnOpenLogin: HTMLButtonElement | null = document.getElementById(
  "signin"
) as HTMLButtonElement;
const signInOverlay: HTMLElement | null =
  document.querySelector(".signin-overlay");
const signInContainer: HTMLElement | null =
  document.querySelector(".signin-container");
const checkLogin: HTMLButtonElement | null = document.querySelector(
  ".nouser-check"
) as HTMLButtonElement;
const circleImg1: HTMLImageElement | null = document.querySelector(
  `.nouser-check .circle-img`
);
const noUserParagraph: HTMLParagraphElement | null =
  document.querySelector(".nouser-text p");

if (btnOpenLogin) {
  btnOpenLogin.addEventListener("click", () => {
    openLogin();
  });
}

function openLogin() {
  if (signInContainer) signInContainer.classList.remove("hidden-signin");
  if (signInOverlay) signInOverlay.classList.remove("hidden-signin");
  document.body.classList.add("modal-open");
}

// Stänger logga in
export function closeLogin() {
  if (signInContainer) signInContainer.classList.add("hidden-signin");
  if (signInOverlay) signInOverlay.classList.add("hidden-signin");
  document.body.classList.remove("modal-open");
  if (circleImg1 && circleImg1.src.includes("circle-checked.svg")) {
    circleImg1.src = "./src/img/circle.svg";
  }
  if (noUserParagraph) {
    noUserParagraph.style.textDecoration = "none";
  }
}

// Om man trycker utanför rutan stängs den
if (signInOverlay) {
  signInOverlay.addEventListener("click", function () {
    closeLogin();
  });
}

// Om man trycker Escape stängs login
document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    signInContainer &&
    !signInContainer.classList.contains("hidden-signin")
  ) {
    closeLogin();
  }
});

if (checkLogin) {
  checkLogin.addEventListener("click", () => {
    console.log("heejsan");

    if (circleImg1) {
      circleImg1.src = circleImg1.src.includes("circle.svg")
        ? "./src/img/circle-checked.svg"
        : "./src/img/circle.svg";

      if (noUserParagraph) {
        noUserParagraph.style.textDecoration = "line-through";
      }
      setTimeout(() => {
        openLogin();
      }, 1000);
    }
  });
}
