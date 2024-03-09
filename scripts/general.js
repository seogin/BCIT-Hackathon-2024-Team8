function displayCardsDynamically(collection) {
    let threadTemplate = document.getElementById("threadTemplate");

    db.collection(collection)
        .get()
        .then((allThreads) => {
            allThreads.forEach((doc) => {
                var title = doc.data().title;
                var likes = doc.data().likes.length;
                var dislikes = doc.data().dislikes.length;
                var timestamp = doc.data().timestamp;
                var date = new Date(timestamp.seconds * 1000);
                var docID = doc.id;
                let newThread = threadTemplate.content.cloneNode(true);

                newThread.querySelector("#title").innerHTML = title;
                newThread.querySelector("#timestamp").innerHTML = date
                    .toDateString()
                    .slice(4);
                newThread.querySelector("#likes-count").innerHTML = likes;
                newThread.querySelector("#dislikes-count").innerHTML = dislikes;
                newThread.querySelector("a").href =
                    "eachThread.html?docID=" + docID;

                document
                    .getElementById(`threadPlaceholder`)
                    .appendChild(newThread);
            });
        });
}

displayCardsDynamically("threads");
