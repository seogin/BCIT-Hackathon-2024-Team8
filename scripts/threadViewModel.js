function load() {
    $(`#threadViewModel`).load(`./components/threadViewModel.html`);
}

load();

function displayThreadInfo() {
    template = document.getElementById(`threadTemplate`);
    id = params.searchParams.get("docID");

    db.collection(`threads`)
        .doc(id)
        .get()
        .then((doc) => {});
}
