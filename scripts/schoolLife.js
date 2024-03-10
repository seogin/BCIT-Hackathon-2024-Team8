function sortAndDisplay(arr) {
    time = Array();
    let threadPlaceholder = document.getElementById("threadPlaceholder");

    for (let i = 0; i < arr.length; i++) {
        time.push(arr[i][1]);
    }

    for (let i = 1; i < time.length; i++) {
        let current = time[i];
        let j = i - 1;

        while (j >= 0 && time[j] < current) {
            time[j + 1] = time[j];
            j--;
        }
        time[j + 1] = current;
    }

    nodes = Array();
    for (let i = 0; i < time.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (time[i] == arr[j][1]) {
                nodes.push(arr[j][0]);
                break;
            }
        }
    }

    for (let i = 0; i < nodes.length; i++) {
        threadPlaceholder.appendChild(nodes[i]);
    }
}

function displayCardsDynamically(collection, category) {
    let threadTemplate = document.getElementById("threadTemplate");
    let threadPlaceholder = document.getElementById("threadPlaceholder");

    // Clear previous threads
    threadPlaceholder.innerHTML = "";

    // Fetch threads from the specified collection and category
    db.collection(collection)
        .where("category", "==", category) // Filter by category
        .get()
        .then((querySnapshot) => {
            arr = Array();
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
                newThread.querySelector("#timestamp").textContent =
                    timestamp.toLocaleString();
                newThread.querySelector("#likes-count").textContent = likes;
                newThread.querySelector("#dislikes-count").textContent =
                    dislikes;
                newThread.querySelector(
                    "a"
                ).href = `eachThread.html?docID=${docID}`;

                // Append the new thread to the placeholder
                arr.push([newThread, timestamp]);
            });
            sortAndDisplay(arr);
        })
        .catch((error) => {
            console.error("Error fetching threads:", error);
        });
}

// Display threads for the 'general' category
displayCardsDynamically("threads", "School Life");
