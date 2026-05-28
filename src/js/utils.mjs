// wrapper for querySelector
export function qs(
  selector,
  parent = document
) {
  return parent.querySelector(
    selector
  );
}

// retrieve data from localstorage
export function getLocalStorage(
  key
) {
  return (
    JSON.parse(
      localStorage.getItem(key)
    ) || []
  );
}

// save data to local storage
export function setLocalStorage(
  key,
  data
) {
  let currentData =
    getLocalStorage(key);

  if (
    !Array.isArray(currentData)
  ) {
    currentData = [];
  }

  // flatten nested arrays
  if (Array.isArray(data)) {
    currentData.push(...data);
  } else {
    currentData.push(data);
  }

  localStorage.setItem(
    key,
    JSON.stringify(currentData)
  );
}

// set a listener for both touchend and click
export function setClick(
  selector,
  callback
) {
  qs(selector).addEventListener(
    "touchend",
    (event) => {
      event.preventDefault();
      callback();
    }
  );

  qs(selector).addEventListener(
    "click",
    callback
  );
}

export function getParam(param) {
  const url =
    new URL(window.location);

  return url.searchParams.get(param);
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

export function renderWithTemplate(
  template,
  parentElement,
  position = "afterbegin",
  callback
) {
  parentElement.insertAdjacentHTML(position, template);

  if (callback) {
    callback();
  }
}

export async function loadHeaderFooter() {

  try {

    const header =
      await loadTemplate(
        "/partials/header.html"
      );

    const footer =
      await loadTemplate(
        "/partials/footer.html"
      );

    const headerElement =
      document.querySelector(
        "#main-header"
      );

    const footerElement =
      document.querySelector(
        "#main-footer"
      );

    renderWithTemplate(
      header,
      headerElement
    );

    renderWithTemplate(
      footer,
      footerElement
    );

  } catch (error) {

    console.error(
      "Header/Footer Error:",
      error
    );
  }
}