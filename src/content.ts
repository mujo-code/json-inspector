import { renderContent } from "./components/InspectorApp";

(function startInspector() {
  let json: any;
  const maybePre = document.body.firstElementChild;
  if (maybePre && maybePre.tagName === "PRE") {
    try {
      const rawJSON = maybePre?.textContent;
      json = JSON.parse(rawJSON);
    } catch (e) {
      console.warn(`Unable to startup JSON inspector: ${e.message}`);
      return;
    }

    renderContent(json);
  }
})();
