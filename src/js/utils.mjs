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