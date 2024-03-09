function autoGrow(element) {
    element.style.height = "5px";
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
        });
        $(element).siblings().val("");

        alert("Reply posted, refrech page to view reply.");
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
