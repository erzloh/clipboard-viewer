const pasteIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560h-80v120H280v-120h-80v560Zm280-560q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z"/></svg>`;
const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;
const changeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m389-92-56-56 372-372h-64v-80h200v200h-80v-64L389-92Zm-60-224L135-744l56-56 428 196-54 54-106-52-126 126 50 106-54 54Zm-26-222 94-92-174-84-2 2 82 174Z"/></svg>`

const buttonChange = document.createElement('div');
buttonChange.style.position = 'fixed';
buttonChange.style.bottom = '20px';
buttonChange.style.right = '100px';
buttonChange.style.width = '50px';
buttonChange.style.height = '50px';
buttonChange.style.backgroundColor = 'rgb(50, 50, 50)';
buttonChange.style.borderRadius = '50%';
buttonChange.style.cursor = 'pointer';
buttonChange.style.zIndex = '9999';
buttonChange.style.display = 'flex';
buttonChange.style.alignItems = 'center';
buttonChange.style.justifyContent = 'center';
buttonChange.style.userSelect = 'none';
buttonChange.style.transition = 'all 0.3s ease';
buttonChange.style.padding = '10px';
buttonChange.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
buttonChange.style.transform = 'scale(0)';

const iconChange = document.createElement('div');
iconChange.innerHTML = changeIcon;
iconChange.style.display = 'flex';
iconChange.style.alignItems = 'center';
iconChange.style.justifyContent = 'center';
iconChange.style.width = '100%';
iconChange.style.height = '100%';
buttonChange.appendChild(iconChange);
document.body.appendChild(buttonChange);

let isVertical = false;

function toggleTextOrientation() {
  isVertical = !isVertical;
  popup.style.writingMode = isVertical ? 'vertical-rl' : 'horizontal-tb';
}

buttonChange.addEventListener('click', toggleTextOrientation);
buttonChange.addEventListener('touch', toggleTextOrientation);

const button = document.createElement('div');
button.style.position = 'fixed';
button.style.bottom = '20px';
button.style.right = '20px';
button.style.width = '50px';
button.style.height = '50px';
button.style.backgroundColor = 'rgb(50, 50, 50)';
button.style.borderRadius = '50%';
button.style.cursor = 'pointer';
button.style.zIndex = '9999';
button.style.display = 'flex';
button.style.alignItems = 'center';
button.style.justifyContent = 'center';
button.style.userSelect = 'none';
button.style.transform = 'scale(0)';
button.style.transition = 'transform 0.3s ease, bottom 0.3s ease, right 0.3s ease';
button.style.padding = '10px';
button.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';

const icon = document.createElement('div');
icon.innerHTML = pasteIcon;
icon.style.display = 'flex';
icon.style.alignItems = 'center';
icon.style.justifyContent = 'center';
icon.style.width = '100%';
icon.style.height = '100%';
button.appendChild(icon);
document.body.appendChild(button);

const popup = document.createElement('div');
popup.style.position = 'fixed';
popup.style.bottom = '-600px';
popup.style.left = '0';
popup.style.width = '100%';
popup.style.height = 'auto';
popup.style.maxHeight = '600px';
popup.style.backgroundColor = 'rgb(50, 50, 50)';
popup.style.transition = 'bottom 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
popup.style.zIndex = '9998';
popup.style.display = 'flex';
popup.style.flexDirection = 'column';
popup.style.alignItems = 'center';
popup.style.justifyContent = 'flex-start';
popup.style.color = 'white';
popup.style.fontSize = '24px';
popup.style.fontFamily = 'Arial, sans-serif';
popup.style.padding = '50px';
popup.style.overflowY = 'auto';
popup.style.boxSizing = 'border-box';

document.body.appendChild(popup);

window.addEventListener('load', () => {
  button.style.transform = 'scale(1)';
});

let isPopupOpen = false;

function togglePopup() {
  if (isPopupOpen) {
    popup.style.bottom = '-600px';
    popup.style.boxShadow = 'none';
    icon.innerHTML = pasteIcon;
    button.style.bottom = '20px';;
	buttonChange.style.transform = 'scale(0)';
	buttonChange.style.bottom = '20px';
  } else {
    popup.style.bottom = '0px';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    icon.innerHTML = closeIcon;
    button.style.bottom = `${popup.offsetHeight + 20}px`;
	buttonChange.style.bottom = `${popup.offsetHeight + 20}px`;
	buttonChange.style.transform = 'scale(1)';

    readClipboard();
  }
  isPopupOpen = !isPopupOpen;
}

button.addEventListener('click', togglePopup);
button.addEventListener('touch', togglePopup);

// Clipboard copy feature
const readClipboard = async () => {
  try {
    const clipboardText = await navigator.clipboard.readText();
    popup.textContent = clipboardText || 'Clipboard is empty';
    // Update button position if the popup is open
    if (isPopupOpen) {
      button.style.bottom = `${popup.offsetHeight + 20}px`;
    }
  } catch (err) {
    popup.textContent = 'Clipboard access denied';
  }
};

document.addEventListener('copy', readClipboard);

// Listen for changes to the popup's height in case the content changes
const resizeObserver = new ResizeObserver(() => {
  if (isPopupOpen) {
    button.style.bottom = `${popup.offsetHeight + 20}px`;
	buttonChange.style.bottom = `${popup.offsetHeight + 20}px`;
  }
});
resizeObserver.observe(popup);
