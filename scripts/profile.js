function displaySaved() {
  let saveTemplate = document.getElementById("saveTemplate");
  let ID = firebase.auth().currentUser.uid;


  db.collection("users")
    .doc(ID)
    .collection("favorites")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var data = doc.data();
            var title = data.title;
            var likes = data.likes.length;
            var dislikes = data.dislikes.length;

            let newThread = threadTemplate.content.cloneNode(true);

            newThread.querySelector("#title").textContent = title;
            newThread.querySelector("#likeCount").textContent = likes;
            newThread.querySelector("#dislikeCount").textContent = dislikes;

            document.getElementById(`placeholderForSaved`).appendChild(newCard);
    });});
  }

displaySaved()


// function displayThreadInfo() {
//   let params = new URL(window.location.href);
//   let ID = params.searchParams.get("docID");

//   db.collection("threads")
//       .doc(ID)
//       .get()
//       .then((doc) => {
//           var title = doc.data().title;
//           var likes = doc.data().likes.length;
//           var dislikes = doc.data().dislikes.length;
//           var description = doc.data().description;

//           document.querySelector("#thread-title").innerHTML = title;
//           document.querySelector("#thread-likes-count").innerHTML = likes;
//           document.querySelector("#thread-dislikes-count").innerHTML =
//               dislikes;
//           document.querySelector("#thread-description").innerHTML =
//               description;
//       });
// }
