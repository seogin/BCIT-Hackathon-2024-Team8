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

if (title === '' || body === '' || choice === 'CHOOSE') {
  alert('Please fill all the fields');
  return;
}

location.href = 'general.html';
}


function submitForm() {
// Get the input fields
var fields = document.getElementsByTagName('input');
}
// Loop through the fields
for (var i = 0; i < fields.length; i++) {
  // If a field is empty
  if (fields[i].value === '') {
    // Alert the user and return to stop the function
    alert('Please fill all the fields');
    return;
  }

// If all fields are filled, navigate to general.html
location.href = 'general.html';
}
