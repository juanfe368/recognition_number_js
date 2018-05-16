function playAction() {
    var heightDivOperation = document.getElementById("divJuego").scrollHeight;
    var heightPage = document.body.scrollHeight;
    var totalPosition = heightPage - 690;

    window.scroll({
        top: totalPosition,
        left: 0,
        behavior: 'smooth'
    });
}
