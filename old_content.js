// constants
const TEXT_BOX_HEIGHT = 100;

(async function () {
    const button = document.createElement("div");
	const icon = document.createElement("img");
	icon.src = chrome.runtime.getURL("icons/content_paste.svg"); // Load from local folder
	icon.style.width = "24px";
	icon.style.height = "24px";
	icon.style.filter = "invert(100%)";

	button.appendChild(icon);
	button.style.position = "fixed";
	button.style.bottom = "20px";
	button.style.right = "20px";
	button.style.background = "#007bff";
	button.style.padding = "15px";
	button.style.borderRadius = "50%";
	button.style.cursor = "pointer";
	button.style.zIndex = "1000";
	button.style.display = "flex";
	button.style.alignItems = "center";
	button.style.justifyContent = "center";
	button.style.width = "50px";
	button.style.height = "50px";

	document.body.appendChild(button);


    let displayBox = null;
    let textContainer = null;

    async function updateClipboardText() {
        try {
            const text = await navigator.clipboard.readText();
            if (textContainer) {
                textContainer.innerText = text || "Clipboard is empty";
            }
        } catch (err) {
            console.error("Failed to read clipboard contents: ", err);
        }
    }

    button.addEventListener("click", async () => {
        try {
            if (!displayBox) {
                displayBox = document.createElement("div");
                displayBox.style.position = "fixed";
                displayBox.style.bottom = "0";
                displayBox.style.left = "0";
                displayBox.style.width = "100%";
                displayBox.style.height = `${TEXT_BOX_HEIGHT}px`;
				// transparent
                displayBox.style.background = "rgba(0, 0, 0, 0.8)";
                displayBox.style.color = "white";
                displayBox.style.padding = "20px";
                displayBox.style.textAlign = "center";
                displayBox.style.display = "flex";
                displayBox.style.alignItems = "center";
                displayBox.style.justifyContent = "space-between";
                displayBox.style.zIndex = "999";
                displayBox.style.overflow = "auto";
                displayBox.style.whiteSpace = "nowrap";

                textContainer = document.createElement("div");
                textContainer.style.flexGrow = "1";
                textContainer.style.overflow = "auto";
                textContainer.style.whiteSpace = "nowrap";

				// move button to the top right of the display box and put a close icon inside it
				// when the close icon is clicked, remove the display box and show the button again
				button.style.bottom = TEXT_BOX_HEIGHT + 20 + "px";
				const closeButton = document.createElement("img");
				closeButton.src = chrome.runtime.getURL("icons/close.svg"); // Load from local folder
				closeButton.style.width = "24px";
				closeButton.style.height = "24px";
				closeButton.style.filter = "invert(100%)";
				closeButton.style.cursor = "pointer";
				closeButton.addEventListener("click", () => {
					document.body.removeChild(displayBox);
					document.body.appendChild(button);
					displayBox = null;
					textContainer = null;
				}
				);

                // const closeButton = document.createElement("div");
                // closeButton.innerText = "❌";
                // closeButton.style.cursor = "pointer";
                // closeButton.style.marginLeft = "20px";
                // closeButton.style.fontSize = "20px";
                // closeButton.style.color = "red";

                // closeButton.addEventListener("click", () => {
                //     document.body.removeChild(displayBox);
                //     document.body.appendChild(button);
                //     displayBox = null;
                //     textContainer = null;
                // });

                displayBox.appendChild(textContainer);
                displayBox.appendChild(closeButton);
                document.body.appendChild(displayBox);
                document.body.removeChild(button);
            }
            await updateClipboardText();
        } catch (err) {
            console.error("Failed to read clipboard contents: ", err);
        }
    });

    document.addEventListener("copy", updateClipboardText);
})();