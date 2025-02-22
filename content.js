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
button.style.transition = 'transform 0.3s ease';
button.style.padding = '10px';
button.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';

const pasteIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560h-80v120H280v-120h-80v560Zm280-560q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z"/></svg>`;

const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;

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
popup.style.bottom = '-300px';
popup.style.left = '0';
popup.style.width = '100%';
popup.style.height = 'auto';
popup.style.maxHeight = '300px';
popup.style.backgroundColor = 'rgb(50, 50, 50)';
popup.style.transition = 'bottom 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
popup.style.zIndex = '9998';
popup.style.display = 'flex';
popup.style.flexDirection = 'column';
popup.style.alignItems = 'center';
popup.style.justifyContent = 'flex-start';
popup.style.color = 'white';
popup.style.fontSize = '18px';
popup.style.fontFamily = 'Arial, sans-serif';
popup.style.padding = '50px';
popup.style.overflowY = 'auto';
popup.style.boxSizing = 'border-box';

document.body.appendChild(popup);

window.addEventListener('load', () => {
  button.style.transform = 'scale(1)';
});

let isPopupOpen = false;
let isDragging = false;
let wasDragging = false;
let offsetX, offsetY;

function togglePopup() {
  if (wasDragging) {
    wasDragging = false;
    return;
  }
  if (isPopupOpen) {
    popup.style.bottom = '-300px';
    popup.style.boxShadow = 'none';
    icon.innerHTML = pasteIcon;
  } else {
    popup.style.bottom = '0px';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    icon.innerHTML = closeIcon;
  }
  isPopupOpen = !isPopupOpen;
}

button.addEventListener('mousedown', (e) => {
  isDragging = true;
  wasDragging = false;
  offsetX = e.clientX - button.getBoundingClientRect().left;
  offsetY = e.clientY - button.getBoundingClientRect().top;
  button.style.transition = 'none';
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    wasDragging = true;
    button.style.left = `${e.clientX - offsetX}px`;
    button.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  button.style.transition = 'all 0.3s';
});

button.addEventListener('touchstart', (e) => {
  isDragging = true;
  wasDragging = false;
  offsetX = e.touches[0].clientX - button.getBoundingClientRect().left;
  offsetY = e.touches[0].clientY - button.getBoundingClientRect().top;
  button.style.transition = 'none';
  e.preventDefault();
}, { passive: false });

document.addEventListener('touchmove', (e) => {
  if (isDragging) {
    wasDragging = true;
    button.style.left = `${e.touches[0].clientX - offsetX}px`;
    button.style.top = `${e.touches[0].clientY - offsetY}px`;
    e.preventDefault();
  }
}, { passive: false });

document.addEventListener('touchend', () => {
  isDragging = false;
  button.style.transition = 'all 0.3s';
});

button.addEventListener('click', togglePopup);
button.addEventListener('touchend', togglePopup);

document.addEventListener('copy', async () => {
  try {
    const clipboardText = await navigator.clipboard.readText();
    popup.textContent = clipboardText || 'Clipboard is empty';
  } catch (err) {
    popup.textContent = 'Clipboard access denied';
  }
});
