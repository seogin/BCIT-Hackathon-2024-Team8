function autoGrow(element) {
    element.style.height = "5px"; // Temporarily shrink to get the correct scrollHeight
    element.style.height = element.scrollHeight + "px";
}

// function thumbsUp() {
//     var thread = db.collection("threads");
//     var user = authResult.user;
//     db.collection("users").doc(user.uid).get().then((doc) => {
//         thread.add({
//             likes: firebase.firestore.FieldValue.arrayUnion(user.uid)
//         });
//     })

// }

// function thumbsUp() {
//     let params = new URL(window.location.href);
//     let ID = params.searchParams.get("docID");
//     var user = firebase.auth().currentUser.uid;
//     var thread = db.collection("threads");
//     thread.doc(ID).update({
//         likes: firebase.firestore.FieldValue.arrayUnion(user),
//     });
// }

function thumbsUp() {
    if (!firebase.auth().currentUser) {
        console.error("No authenticated user found.");
        return;
    }

    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");
    if (!ID) {
        console.error("Document ID not found in URL.");
        return;
    }

    var user = firebase.auth().currentUser.uid;
    var thread = db.collection("threads");

    thread.doc(ID).update({
        likes: firebase.firestore.FieldValue.arrayUnion(user),
    }).then(() => {
        console.log("Document successfully updated!");
    }).catch((error) => {
        console.error("Error updating document: ", error);
    });
}




function displayThreadInfo() {
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");

    db.collection("threads")
        .doc(ID)
        .get()
        .then((doc) => {
            var title = doc.data().title;
            var likes = doc.data().likes.length;
            var dislikes = doc.data().dislikes.length;
            var timestamp = doc.data().timestamp;
            var description = doc.data().description;
            var date = new Date(timestamp.seconds * 1000);

            document.querySelector("#thread-title").innerHTML = title;
            document.querySelector("#thread-timestamp").innerHTML = date
                .toDateString()
                .slice(4);
            document.querySelector("#thread-likes-count").innerHTML = likes;
            document.querySelector("#thread-dislikes-count").innerHTML =
                dislikes;
            document.querySelector("#thread-description").innerHTML =
                description;
        });
}

displayThreadInfo();
