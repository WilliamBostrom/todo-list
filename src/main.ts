import "./css/style.css";
import "./css/login.css";
import "./css/queries.css";
import "./css/general.css";
import "./script.ts";
import "./firebase.ts";
import "./login.ts";

const svgContext: Record<string, () => Promise<{ default: string }>> =
  import.meta.glob("./img/*.svg") as Record<
    string,
    () => Promise<{ default: string }>
  >;

const svgPaths: string[] = Object.keys(svgContext);

svgPaths.forEach(async (path: string) => {
  const svgModule = await svgContext[path]();
  const svgElement = new DOMParser().parseFromString(
    svgModule.default,
    "image/svg+xml"
  ).documentElement;

  document.body.appendChild(svgElement);
});
