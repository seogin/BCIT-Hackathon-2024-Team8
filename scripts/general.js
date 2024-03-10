// function displayCardsDynamically(collection) {
//     let threadTemplate = document.getElementById("threadTemplate");

//     db.collection(collection)
//         .get()
//         .then((allThreads) => {
//             allThreads.forEach((doc) => {
//                 var title = doc.data().title;
//                 var likes = doc.data().likes.length;
//                 var dislikes = doc.data().dislikes.length;
//                 var timestamp = doc.data().timestamp;
//                 var date = new Date(timestamp.seconds * 1000);
//                 var docID = doc.id;
//                 let newThread = threadTemplate.content.cloneNode(true);

//                 newThread.querySelector("#title").innerHTML = title;
//                 newThread.querySelector("#timestamp").innerHTML = date
//                     .toDateString()
//                     .slice(4);
//                 newThread.querySelector("#likes-count").innerHTML = likes;
//                 newThread.querySelector("#dislikes-count").innerHTML = dislikes;
//                 newThread.querySelector("a").href =
//                     "eachThread.html?docID=" + docID;

//                 document
//                     .getElementById(`threadPlaceholder`)
//                     .appendChild(newThread);
//             });
//         });
// }

// displayCardsDynamically("threads");


function displayCardsDynamically(collection, category) {
    let threadTemplate = document.getElementById("threadTemplate");
    let threadPlaceholder = document.getElementById("threadPlaceholder");

    // Clear previous threads
    threadPlaceholder.innerHTML = '';

    // Fetch threads from the specified collection and category
    db.collection(collection)
        .where("category", "==", category) // Filter by category
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                var title = data.title;
                var likes = data.likes.length;
                var dislikes = data.dislikes.length;
                var timestamp = data.timestamp.toDate(); // Assuming timestamp is a Firestore Timestamp
                var docID = doc.id;
                let newThread = threadTemplate.content.cloneNode(true);

                // Populate the thread data
                newThread.querySelector("#title").textContent = title;
                newThread.querySelector("#timestamp").textContent = timestamp.toDateString().slice(4);
                newThread.querySelector("#likes-count").textContent = likes;
                newThread.querySelector("#dislikes-count").textContent = dislikes;
                newThread.querySelector("a").href = `eachThread.html?docID=${docID}`;

                // Append the new thread to the placeholder
                threadPlaceholder.appendChild(newThread);
            });
        })
        .catch((error) => {
            console.error("Error fetching threads:", error);
        });
}

// Example usage: Display threads for the 'general' category
displayCardsDynamically("threads", "general");


