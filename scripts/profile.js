function displaySaved() {
  let saveTemplate = document.getElementById("saveTemplate");
  db.collection("threads").get()
    .then(allThreads => {
      var 
}