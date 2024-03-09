function autoGrow(element) {
    element.style.height = "5px"; // Temporarily shrink to get the correct scrollHeight
    element.style.height = element.scrollHeight + "px";
}
