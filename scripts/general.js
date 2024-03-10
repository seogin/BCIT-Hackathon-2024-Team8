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
                newThread.querySelector("#timestamp").textContent = timestamp.toLocaleString();
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

// Display threads for the 'general' category
displayCardsDynamically("threads", "General");


