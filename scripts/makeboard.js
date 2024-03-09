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

