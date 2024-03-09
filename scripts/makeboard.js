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

  if (choice == 'School Life'){
    choice = 'schoolLife';
  } else if (choice == 'Career Resources'){
    choice = 'career';
  } else if (choice == 'Buy & Sell'){
    choice = 'buySell';
  } else if (choice == 'General'){
    choice = 'general';
  } else {
    if (title === '' || body === '' || choice === 'CHOOSE') {
      alert('Please fill all the fields');
      return;
    }
  }

  var thread = db.collection("threads");

  thread.add({
    // author: firebase.auth().currentUser.displayName,
    category: choice,
    description: body,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    title: title,
  }).then(function () {
    location.href = choice + '.html';
  });
} // This closing brace was missing


// function submitThread() {
//   var title = document.getElementById('title-input').value;
//   var body = document.getElementById('body-input').value;
//   var choice = document.getElementById('choosedropbtn').textContent;

//   var thread = db.collection("threads");

//   thread.add({
//     // author: firebase.auth().currentUser.displayName,
//     category: choice,
//     description: body,
//     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//     title: title,
//   });
// }
