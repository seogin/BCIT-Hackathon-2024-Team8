function autoGrow(element) {
    element.style.height = "5px"; // Temporarily shrink to get the correct scrollHeight
    element.style.height = element.scrollHeight + "px";
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

function submitReply() {
    console.log($(this).siblings().text);
}
