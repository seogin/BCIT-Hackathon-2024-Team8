function toggleDropdown() {
  document.getElementById('dropdown').classList.toggle('hidden');
}


function changeButtonText(text) {
  document.getElementById('choosedropbtn').textContent = text;
  toggleDropdown();
}


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
  var inputFile = document.getElementById('myFile').value;


  if (choice == 'School Life') {
    choice = 'schoolLife';
    var thread = db.collection("threads");

    thread.add({
      author: firebase.auth().currentUser.displayName,
      category: choice,
      description: body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      title: title,
      image: inputFile,
    }).then(function () {
      location.href = choice + '.html';
    });
  } else if (choice == 'Career Resources') {
    choice = 'career';
    var thread = db.collection("threads");

    thread.add({
      author: firebase.auth().currentUser.displayName,
      category: choice,
      description: body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      title: title,
      image: inputFile,
    }).then(function () {
      location.href = choice + '.html';
    });
  } else if (choice == 'Buy & Sell') {
    choice = 'buySell';
    var thread = db.collection("threads");

    thread.add({
      author: firebase.auth().currentUser.displayName,
      category: choice,
      description: body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      title: title,
      image: inputFile,
    }).then(function () {
      location.href = choice + '.html';
    });
  } else if (choice == 'General') {
    choice = 'general';
    var thread = db.collection("threads");

    thread.add({
      author: firebase.auth().currentUser.displayName,
      category: choice,
      description: body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      title: title,
      image: inputFile,
    }).then(function () {
      location.href = choice + '.html';
    });
  } else {
    alert('Please fill all the fields');
    return;
  }
}

