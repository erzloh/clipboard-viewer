// Create the floating button
const button = document.createElement('div');
button.style.position = 'fixed';
button.style.bottom = '20px';
button.style.right = '20px';
button.style.width = '50px';
button.style.height = '50px';
button.style.backgroundColor = 'black';
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

// Create the SVG icon
const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
icon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
icon.setAttribute("height", "24px");
icon.setAttribute("viewBox", "0 -960 960 960");
icon.setAttribute("width", "24px");
icon.setAttribute("fill", "#FFFFFF");
const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("d", "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560h-80v120H280v-120h-80v560Zm280-560q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z");

icon.appendChild(path);
button.appendChild(icon);
document.body.appendChild(button);

// Trigger the button animation
window.addEventListener('load', () => {
  button.style.transform = 'scale(1)';
});

// Draggable functionality
let isDragging = false;
let offsetX, offsetY;

button.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - button.getBoundingClientRect().left;
  offsetY = e.clientY - button.getBoundingClientRect().top;
  button.style.transition = 'none';
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    button.style.left = `${e.clientX - offsetX}px`;
    button.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  button.style.transition = 'all 0.3s';
});

// Mobile support (touch events)
button.addEventListener('touchstart', (e) => {
  isDragging = true;
  offsetX = e.touches[0].clientX - button.getBoundingClientRect().left;
  offsetY = e.touches[0].clientY - button.getBoundingClientRect().top;
  button.style.transition = 'none';
  e.preventDefault();
}, { passive: false });

document.addEventListener('touchmove', (e) => {
  if (isDragging) {
    button.style.left = `${e.touches[0].clientX - offsetX}px`;
    button.style.top = `${e.touches[0].clientY - offsetY}px`;
    e.preventDefault();
  }
}, { passive: false });

document.addEventListener('touchend', () => {
  isDragging = false;
  button.style.transition = 'all 0.3s';
});
