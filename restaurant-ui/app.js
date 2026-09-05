
window.onload = () => {
    showMenu();
};

function setActive(btn) {
    document.querySelectorAll(".sidebar button")
        .forEach(b => b.style.background = "none");

    btn.style.background = "#e19c3c";
}