// Wait for Firebase to initialize
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in, call your function to display saved documents
    displaySavedDoc();
  } else {
    // User is signed out, you can handle this case if needed
    console.log("User is not signed in.");
  }
});

// Function to display saved documents
function displaySavedDoc() {
  let saveTemplate = document.getElementById("saveTemplate");
  let userID = firebase.auth().currentUser.uid;
  let docRef = db.collection("users").doc(userID).collection("favorites");

  docRef.get()
    .then(querySnapshot => {
      const savedData = []; // Define savedData array

      querySnapshot.forEach(doc => {
        const docID = doc.id;
        const data = doc.data();
        savedData.push(docID);
        console.log("Document ID:", docID);
        console.log("Data:", data);
      });
      console.log(savedData);

      savedData.forEach((docID) => {
        db.collection("threads")
          .doc(docID)
          .get()
          .then((doc) => {
            const data = doc.data();
            const { title, category, likes, dislikes } = data;
            
            const newThread = saveTemplate.content.cloneNode(true);
            newThread.querySelector("#category").textContent = category;
            newThread.querySelector("#title").textContent = title;
            newThread.querySelector("#likeCount").textContent = Array.isArray(likes) ? likes.length : 0;
            newThread.querySelector("#dislikeCount").textContent = Array.isArray(dislikes) ? dislikes.length : 0;

            document.getElementById("placeholderForSaved").appendChild(newThread);
          })
          .catch(error => {
            console.error("Error getting thread document:", error);
          });
      });
    })
    .catch(error => {
      console.error("Error getting favorites collection:", error);
    });
}
