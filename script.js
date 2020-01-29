const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {
  const formEl = input.parentElement;
  formEl.className = 'form-control error';
  const small = formEl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formEl = input.parentElement;
  formEl.className = 'form-control success';
}

function checkEmail(input) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(input.value.trim()).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldname(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function getFieldname(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, min, max) {
  if (input.value.length < +min) {
    showError(
      input,
      `${getFieldname(input)} must be atleast ${min} characters long`
    );
  } else if (input.value.length > +max) {
    showError(
      input,
      `${getFieldname(input)} cannot be more than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswords(input, input2) {
  if (input.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 30);
  checkEmail(email);
  checkPasswords(password, password2);
});
