import circleSvg from "/circle.svg";
import checkedSvg from "/checked.svg";

console.log(checkedSvg);
console.log(checkedSvg);

const btnOpenLogin = document.getElementById("signin") as HTMLButtonElement;
const signInOverlay = document.querySelector(".signin-overlay") as HTMLElement;
const signInContainer = document.querySelector(
  ".signin-container"
) as HTMLElement;
const checkLogin = document.querySelector(".nouser-check") as HTMLButtonElement;
const circleImg1 = document.querySelector(
  `.nouser-check .circle-img`
) as HTMLImageElement;
const noUserParagraph = document.querySelector(
  ".nouser-text p"
) as HTMLParagraphElement;

if (btnOpenLogin) {
  btnOpenLogin.addEventListener("click", () => {
    openLogin();
  });
}

async function openLogin() {
  if (signInContainer) signInContainer.classList.remove("hidden-signin");
  if (signInOverlay) signInOverlay.classList.remove("hidden-signin");
  document.body.classList.add("modal-open");
}

// Stänger logga in
export async function closeLogin() {
  if (signInContainer) signInContainer.classList.add("hidden-signin");
  if (signInOverlay) signInOverlay.classList.add("hidden-signin");
  document.body.classList.remove("modal-open");
  if (circleImg1 && circleImg1.src.includes(circleSvg)) {
    circleImg1.src = circleSvg;
  }
  if (noUserParagraph) {
    noUserParagraph.style.textDecoration = "none";
  }
}

// Om man trycker utanför rutan stängs den
if (signInOverlay) {
  signInOverlay.addEventListener("click", async function () {
    await closeLogin();
  });
}

// Om man trycker Escape stängs login
document.addEventListener("keydown", async function (e) {
  if (
    e.key === "Escape" &&
    signInContainer &&
    !signInContainer.classList.contains("hidden-signin")
  ) {
    await closeLogin();
  }
});

if (circleImg1) {
  circleImg1.src = circleSvg;
}

if (checkLogin) {
  checkLogin.addEventListener("click", async () => {
    if (circleImg1) {
      circleImg1.src = circleImg1.src.includes(circleSvg)
        ? checkedSvg
        : circleSvg;

      if (noUserParagraph) {
        noUserParagraph.style.textDecoration = "line-through";
      }
      setTimeout(async () => {
        await openLogin();
      }, 1000);
    }
  });
}
