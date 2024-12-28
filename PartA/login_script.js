$(document).ready(function () {
  // get username from url
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");
  $("#title-username").text(`Welcome back, ${username}`);

  $("#add").on("click", function () {
    performOperation("add");
  });

  $("#subtract").on("click", function () {
    performOperation("subtract");
  });

  $("#multiply").on("click", function () {
    performOperation("multiply");
  });

  $("#divide").on("click", function () {
    performOperation("divide");
  });
});

const validateNumberInput = (numberField, errorField) => {
  const numberPattern = /^[-+]?\d*\.?\d+$/;
  const numberValue = $(numberField).val();

  if (!numberValue) {
    $(errorField).text("Field cannot be empty");
    return false;
  } else if (isNaN(numberValue)) {
    $(errorField).text("Invalid input. Please enter a number.");
    return false;
  } else if (!isFinite(numberValue)) {
    $(errorField).text("Number is too large or too small.");
    return false;
  } else if (!numberPattern.test(numberValue)) {
    $(errorField).text("Invalid input. Please enter valid number.");
    return false;
  }

  $(errorField).text(""); // Clear error message
  return true;
};

const performOperation = (operation) => {
  $("#error-result").text("");
  if (
    validateNumberInput("#number1", "#error-number1") &&
    validateNumberInput("#number2", "#error-number2")
  ) {
    const num1 = parseFloat($("#number1").val());
    const num2 = parseFloat($("#number2").val());

    switch (operation) {
      case "add":
        $("#result").val(num1 + num2);
        return num1 + num2;
        break;
      case "subtract":
        $("#result").val(num1 - num2);
        break;
      case "multiply":
        $("#result").val(num1 * num2);
        break;
      case "divide":
        if (num2 === 0) {
          $("#error-result").text("Division by zero is not allowed.");
        } else {
          $("#result").val(num1 / num2);
        }
        break;
    }
  }
};
