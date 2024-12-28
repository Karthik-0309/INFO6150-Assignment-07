$(document).ready(function () {
  $("#loginButton").prop("disabled", true);

  const form = $("#loginForm");

  $("#loginForm").on("submit", validateForm);
  $("#email").on("keyup", validateEmail);
  $("#username").on("keyup", validateUsername);
  $("#password").on("keyup", validatePassword);
  $("#confirmPassword").on("keyup", validateConfirmPassword);

  const emailError = $("#error-email");
  const usernameError = $("#error-username");
  const passwordError = $("#error-password");
  const confirmPasswordError = $("#error-confirmPassword");
  const loginButton = $("#loginButton");

  // Regex
  const noSpecialCharOrNumRegex = "^[a-zA-Z ]+$";
  const onlyNumRegex = "^[-0-9]+$";
  const phoneNumberRegex = /\d{3}-?\d{3}-\d{4}$/;
  const emailIdRegex = "^[a-zA-Z0-9._]+@northeastern.edu$";
  const zipcodeRegex = /\d{5}$/;
  const specialChar = /[!@#$%^&*()_+|[\]{};:'",<>\/?]/;
  const passwordRegex = new RegExp(
    "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,}"
  );

  const intervalID = setInterval(() => {
    if ($(".success").length == 4) {
      loginButton.prop("disabled", false);
    } else {
      loginButton.prop("disabled", true);
    }
  }, 1000);

  function validateForm(event) {
    event.preventDefault();
    event.stopPropagation();
    const username = $("#username").val().trim();
    if (
      validateEmail() &&
      validateUsername() &&
      validatePassword() &&
      validateConfirmPassword()
    ) {
      // If all fields are valid, then submit the form
      // const username = $("#username").val();
      form[0].reset();
      clearInterval(intervalID);
      window.location.href = `index.html?username=${username}`;

      return false;
    }
  }

  function validateEmail() {
    const emailValue = $("#email").val().trim();
    if (!emailValue.length) {
      setErrorFor(email, emailError[0], "Email cannot be blank");
      return false;
    } else if (!emailValue.match(emailIdRegex)) {
      setErrorFor(
        email,
        emailError[0],
        "Not a valid email, must end with @northeastern.edu"
      );
      return false;
    } else if (emailValue.length > 50) {
      setErrorFor(
        email,
        emailError[0],
        "Email cannot be more than 50 characters"
      );
    } else {
      setSuccessFor(email, emailError[0]);
      return true;
    }
  }

  function validateUsername() {
    const usernameValue = $("#username").val().trim();
    if (!usernameValue.length) {
      setErrorFor(username, usernameError[0], "Username cannot be blank");
      return false;
    } else if (usernameValue.length < 5) {
      setErrorFor(
        username,
        usernameError[0],
        "Username cannot be less than 5 characters"
      );
      return false;
    } else if (usernameValue.length > 20) {
      setErrorFor(
        username,
        usernameError[0],
        "Username cannot be more than 20 characters"
      );
      return false;
    } else if (usernameValue.match(specialChar)) {
      setErrorFor(
        username,
        usernameError[0],
        "Username cannot contain special characters"
      );
      return false;
    } else {
      setSuccessFor(username, usernameError[0]);
      return true;
    }
  }

  function validatePassword() {
    const passwordValue = $("#password").val().trim();
    if (!passwordValue.length) {
      setErrorFor(password, passwordError[0], "Password cannot be blank");
      return false;
    } else if (!passwordValue.match(passwordRegex)) {
      setErrorFor(
        password,
        passwordError[0],
        "Password must contain at least 8 characters,<br> including UPPER/lowercase, numbers and special character"
      );
      return false;
    } else if (passwordValue.length > 20) {
      setErrorFor(
        password,
        passwordError[0],
        "Password cannot be more than 20 characters"
      );
      return false;
    } else {
      setSuccessFor(password, passwordError[0]);
      return true;
    }
  }

  function validateConfirmPassword() {
    const confirmPasswordValue = confirmPassword.value.trim();
    const orgPassword = password.value.trim();
    if (!confirmPasswordValue.length) {
      setErrorFor(
        confirmPassword,
        confirmPasswordError[0],
        "Confirm Password cannot be blank"
      );
      return false;
    } else if (confirmPasswordValue !== orgPassword) {
      setErrorFor(
        confirmPassword,
        confirmPasswordError[0],
        "Password and Confirm Password do not match"
      );
      return false;
    } else {
      setSuccessFor(confirmPassword, confirmPasswordError[0]);
      return true;
    }
  }

  function setErrorFor(input, error, message) {
    error.classList.add("error");
    error.classList.remove("success");
    error.innerHTML = message;
  }

  function setSuccessFor(input, error) {
    error.classList.remove("error");
    error.classList.add("success");
    error.innerHTML = "";
  }
});
