function toggleDropdown() {
  document.getElementById('dropdown').classList.toggle('hidden');
}

function changeButtonText(text) {
  document.getElementById('choosedropbtn').textContent = text;
  toggleDropdown();
}

function submitForm() {
  var title = document.getElementById('title-input').value;
  var body = document.getElementById('body-input').value;
  var choice = document.getElementById('choosedropbtn').textContent;

  if (choice == 'School Life') {
    choice = 'schoolLife';
    choicezz = 'School Life';
    var thread = db.collection("threads");

    thread.add({
    author: firebase.auth().currentUser.uid,
    category: choicezz,
    description: body,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    title: title,
    likes: [],
    dislikes: [],
    }).then(function () {
      location.href = choice + '.html';
    });
  } else if (choice == 'Career Resources') {
    choice = 'career';
    choicezz = 'Career';
    var thread = db.collection("threads");

    thread.add({
    author: firebase.auth().currentUser.uid,
    category: choicezz,
    description: body,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    title: title,
    likes: [],
    dislikes: [],
    }).then(function () {
      location.href = choice + '.html';
    });
  } else if (choice == 'Buy & Sell') {
    choice = 'buySell';
    choicezz = 'Buy & Sell';
    var thread = db.collection("threads");

    thread.add({
    author: firebase.auth().currentUser.uid,
    category: choicezz,
    description: body,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    title: title,
    likes: [],
    dislikes: [],
    }).then(function () {
      location.href = choice + '.html';
    });
  } else if (choice == 'General') {
    choice = 'general';
    choicezz = 'General';
    var thread = db.collection("threads");

    thread.add({
    author: firebase.auth().currentUser.uid,
    category: choicezz,
    description: body,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    title: title,
    likes: [],
    dislikes: [],
    }).then(function () {
      location.href = choice + '.html';
    });
  } else {
    alert('Please fill all the fields');
    return;
  }
}


function autoGrow(element) {
  element.style.height = "5px"; // Temporarily shrink to get the correct scrollHeight
  element.style.height = (element.scrollHeight) + "px";
}
