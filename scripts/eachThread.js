function autoGrow(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
}


function updateFavorite() {
    let params = new URL(window.location.href);
    let threadID = params.searchParams.get("docID");
    if (!threadID) {
        console.error("Document ID not found in URL.");
        return;
    }

    var userID = firebase.auth().currentUser.uid;
    var userFavoritesRef = db.collection("users").doc(userID).collection("favorites").doc(threadID)
    if () {
        userFavoritesRef.delete()
            .then(() => {
                console.log("Thread removed from favorites")
                // window.location.href = params;
            })
            .catch((error) => { console.error("Error removing thread from favorites: ", error) });
    }
    }

    // userFavoritesRef.get().then((allThreads) => {
    //     removed = false;
    //     allThreads.forEach((doc) => {
    //         console.log(doc.id)
    //         if (doc.id == threadID) {
    //             userFavoritesRef.doc(doc.id).delete()
    //                 .then(() => {
    //                     console.log("Thread removed from favorites")
    //                     removed = true;
    //                     window.location.href = params;
    //                 })
    //                 .catch((error) => { console.error("Error removing thread from favorites: ", error) });
    //         }
    //     });
    //     if (!removed) {
    //         userFavoritesRef.doc(threadID).set({}) // You might want to store additional info here
    //             .then(() => {
    //                 console.log("Thread added to favorites")
    //                 window.location.href = params;
    //             })
    //             .catch((error) => { console.error("Error adding thread to favorites: ", error) });
    //     }
    // });
}


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
    var thread = db.collection("threads").doc(ID);

    thread.get().then((doc) => {
        if (doc.data().likes.includes(user)) {
            console.log("something")
            thread
                .update({
                    likes: firebase.firestore.FieldValue.arrayRemove(user),
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    window.location.href = params;
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        }
        else {
            thread
                .update({
                    likes: firebase.firestore.FieldValue.arrayUnion(user),
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    window.location.href = params;
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        }
    })
}

function thumbsDown() {
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
    var thread = db.collection("threads").doc(ID);

    thread.get().then((doc) => {
        if (doc.data().dislikes.includes(user)) {
            console.log("something")
            thread
                .update({
                    dislikes: firebase.firestore.FieldValue.arrayRemove(user),
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    window.location.href = params;
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        }
        else {
            thread
                .update({
                    dislikes: firebase.firestore.FieldValue.arrayUnion(user),
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    window.location.href = params;
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        }
    })
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

function submitReply(element) {
    let params = new URL(window.location.href);
    let threadID = params.searchParams.get("docID");

    text = $(element).siblings().val();
    console.log(text);
    if (text) {
        db.collection("threads").doc(threadID).collection("replies").add({
            author: firebase.auth().currentUser.uid,
            likes: [],
            dislikes: [],
            content: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
            .then(() => {
                console.log("Reply successfully uploaded!")
                window.location.href = params;
            });
    } else {
        alert("The textfield is empty.");
    }
}

function displayRepliesDynamically() {
    let replyTemplate = document.getElementById("replyTemplate");
    let params = new URL(window.location.href);
    let threadID = params.searchParams.get("docID");

    db.collection("threads")
        .doc(threadID)
        .collection("replies")
        .get()
        .then((allThreads) => {
            allThreads.forEach((doc) => {
                var content = doc.data().content;
                var likes = doc.data().likes.length;
                var dislikes = doc.data().dislikes.length;
                var timestamp = doc.data().timestamp;
                var date = new Date(timestamp.seconds * 1000);
                let newReply = replyTemplate.content.cloneNode(true);

                newReply.querySelector("#reply-content").innerHTML = content;
                newReply.querySelector("#reply-timestamp").innerHTML = date
                    .toDateString()
                    .slice(4);
                newReply.querySelector("#reply-likes-count").innerHTML = likes;
                newReply.querySelector("#reply-dislikes-count").innerHTML =
                    dislikes;

                document
                    .getElementById(`replyPlaceholder`)
                    .appendChild(newReply);
            });
        });
}

displayRepliesDynamically();
