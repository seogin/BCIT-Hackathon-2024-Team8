function autoGrow(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
}

async function updateFavorite() {
    let params = new URL(window.location.href);
    let threadID = params.searchParams.get("docID");
    if (!threadID) {
        console.error("Document ID not found in URL.");
        return;
    }
    let userID;
    userID = firebase.auth().currentUser.uid;
    var userFavoritesRef = db.collection("users").doc(userID).collection("favorites").doc(threadID);
    const doc = await userFavoritesRef.get();
    if (doc.exists) {
        // If the document exists, remove it from favorites
        await userFavoritesRef.delete();
        console.log("Thread removed from favorites");
        window.location.href = params;
    } else {
        // If the document does not exist, add it to favorites
        await userFavoritesRef.set({ mockData: "something" });
        console.log("Thread added to favorites");
        window.location.href = params;
    }
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

    // Fetch thread information
    db.collection("threads").doc(ID).get().then((doc) => {
        if (!doc.exists) {
            console.error("Thread not found!");
            return;
        }

        var data = doc.data();
        var title = data.title;
        var likes = data.likes.length;
        var dislikes = data.dislikes.length;
        var timestamp = data.timestamp;
        var description = data.description;
        var date = new Date(timestamp.seconds * 1000);

        // Update the DOM with thread information
        document.querySelector("#thread-title").innerHTML = title;
        document.querySelector("#thread-timestamp").innerHTML = date.toDateString().slice(4);
        document.querySelector("#thread-likes-count").innerHTML = likes;
        document.querySelector("#thread-dislikes-count").innerHTML = dislikes;
        document.querySelector("#thread-description").innerHTML = description;

        // Check and update the favorite status of the thread
        checkAndUpdateFavoriteStatus(ID);
    });
}

async function checkAndUpdateFavoriteStatus(threadID) {
    // Ensure the user is logged in
    let user = firebase.auth().currentUser;
    if (!user) {
        console.error("User not logged in");
        // Optionally, handle the UI for not logged in users
        return;
    }

    let userID = user.uid;
    let userFavoritesRef = db.collection("users").doc(userID).collection("favorites").doc(threadID);

    // Check if the thread is in the user's favorites
    const doc = await userFavoritesRef.get();
    if (doc.exists) {
        // If the thread is favorited, change the star color to yellow
        document.querySelector("#star").style.color = "rgb(255,204,0)";
    } else {
        // If the thread is not favorited, change the star color to black
        document.querySelector("#star").style.color = "black";
    }
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
