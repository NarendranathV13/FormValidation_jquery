$(document).ready(function () {
  let storedData = localStorage.getItem("fullEntries");
  if (storedData) {
    // Display the stored data in the table
    displayData(JSON.parse(storedData));
  }
  var cities = [
    "Coimbatore",
    "Madurai",
    "Chennai",
    "Salem",
    "Erode",
    "Tiruppur",
    "Pollachi",
    "Udumalpet",
  ];
  $("#inputCity").autocomplete({
    source: cities,
  });
  $("#datepick").datepicker({
    minDate: new Date(2018, 3, 1), // from 2018
    maxDate: new Date(2023, 3, 30), // to 2023
  });
  $("#ad1Check").hide();
  $("#cityCheck").hide();
  $("#stateCheck").hide();
  $("#qualCheck").hide();
  $("#yopCheck").hide();
  $("#declCheck").hide();
  $("#pinCheck").hide();
  $("#fnameCheck").hide();
  $("#lnameCheck").hide();
  $("#emailCheck").hide();
  $("#genderCheck").hide();
  $("#fileCheck").hide();
  const Fname = $("#Fname");
  const Lname = $("#Lname");
  const inputEmail = $("#inputEmail");
  const qualifications = $("#qualification");
  const datepick = $("#datepick");
  const inputAddress = $("#inputAddress");
  const inputCity = $("#inputCity");
  const stateSelect = $("#exampleSelect");
  const inputZip = $("#inputZip");
  const decleration = $("#exampleFormControlTextarea1");
  const checkbox1 = $("#gridCheck");
  const radios = $(".genderRadio");
  const files = $("#fileInput");
  $("#Fname").keydown(function () {
    validateUsername();
  });
  $("#qualification").keydown(function () {
    qualification();
    console.log(genders);
  });
  $("#inputZip").keyup(function () {
    validatepin();
  });
  $("#Lname").keyup(function () {
    validateUsernameL();
  });
  $("#inputEmail").keyup(function () {
    validateEmail();
  });
  $("#exampleSelect").change(function () {
    validateState();
  });
  $("#datepick").change(function () {
    validateYOP();
  });
  const genders = () => {
    let selectedGender = $("input[name='gender']:checked").val();
    console.log(selectedGender);
    return selectedGender;
  };
  $(".genderRadio").on("click", genders);
  const values = [
    Fname,
    Lname,
    inputEmail,
    qualifications,
    datepick,
    inputAddress,
    inputCity,
    stateSelect,
    inputZip,
    decleration,
    checkbox1,
    radios,
    files,
  ];
  function clearFormFields(values) {
    values.forEach((inp) => {
      if (inp.is(':checkbox') || inp.is(':radio')) {
        inp.prop('checked', false);
      } else {
        inp.val("");
      }
      let fieldColor = inp.parent();
      fieldColor.removeClass("form-val success");
      fieldColor.removeClass("form-val error");
      inp.siblings("p").hide();
    });
  }
  $("#clear").click(function () {
    clearFormFields(values);
  });
  function qualification() {
    var regex = /^[a-zA-Z]{1,20}$/;
    let qualValue = $("#qualification").val();
    let parentClass = $("#qualification").parent();
    if (qualValue.length == "") {
      parentClass.removeClass("form-val success");
      $("#qualCheck").show();
      parentClass.addClass("form-val error");
      return false;
    } else if (qualValue.length < 2 || qualValue.length > 10) {
      parentClass.removeClass("form-val success");
      $("#qualCheck").show();
      $("#qualCheck").html("length of course must be between 2 and 10");
      parentClass.addClass("form-val error");
      return false;
    } else if (!regex.test(qualValue)) {
      parentClass.removeClass("form-val success");
      $("#qualCheck").show();
      $("#qualCheck").html("Course must contain alphabets only");
      parentClass.addClass("form-val error");
      return false;
    } else {
      parentClass.removeClass("form-val error");
      $("#qualCheck").hide();
      parentClass.addClass("form-val success");
      return true;
    }
  }
  function validatepin() {
    var regexPostalCode = /^[1-9][0-9]{4,5}$/;
    let pinValue = $("#inputZip").val();
    let parentClass = $("#inputZip").parent();
    if (pinValue.length == "") {
      parentClass.removeClass("form-val success");
      $("#pinCheck").show();
      parentClass.addClass("form-val error");
      return false;
    } else if (pinValue.length < 5 || pinValue.length > 6) {
      parentClass.removeClass("form-val success");
      $("#pinCheck").show();
      $("#pinCheck").html("pin must be 5 digits to 6 digits");
      parentClass.addClass("form-val error");
      return false;
    } else if (!regexPostalCode.test(pinValue)) {
      parentClass.removeClass("form-val success");
      $("#pinCheck").show();
      $("#pinCheck").html("Invalid pin");
      parentClass.addClass("form-val error");
      return false;
    } else {
      parentClass.removeClass("form-val error");
      $("#pinCheck").hide();
      parentClass.addClass("form-val success");
      return true;
    }
  }
  function validateUsername() {
    var regex = /^[a-zA-Z]{1,20}$/;
    let usernameValue = $("#Fname").val();
    let parentClass = $("#Fname").parent();
    if (usernameValue.length == "") {
      parentClass.removeClass("form-val success");
      $("#fnameCheck").show();
      parentClass.addClass("form-val error");
      return false;
    } else if (usernameValue.length < 3 || usernameValue.length > 20) {
      parentClass.removeClass("form-val success");
      $("#fnameCheck").show();
      $("#fnameCheck").html("length of username must be between 3 and 20");
      parentClass.addClass("form-val error");
      return false;
    } else if (!regex.test(usernameValue)) {
      parentClass.removeClass("form-val success");
      $("#fnameCheck").show();
      $("#fnameCheck").html("Name must contain alphabets");
      parentClass.addClass("form-val error");
      return false;
    } else {
      parentClass.removeClass("form-val error");
      $("#fnameCheck").hide();
      parentClass.addClass("form-val success");
      return true;
    }
  }
  function validateUsernameL() {
    var regex = /^[a-zA-Z]{1,20}$/;
    let usernameValue = $("#Lname").val();
    let parentClass = $("#Lname").parent();
    if (usernameValue.length == "") {
      parentClass.removeClass("form-val success");
      $("#lnameCheck").show();
      parentClass.addClass("form-val error");
      return false;
    } else if (!regex.test(usernameValue)) {
      parentClass.removeClass("form-val success");
      $("#lnameCheck").show();
      $("#lnameCheck").html("Name must contain alphabets");
      parentClass.addClass("form-val error");
      return false;
    } else if (usernameValue.length < 1 || usernameValue.length > 10) {
      parentClass.removeClass("form-val success");
      $("#lnameCheck").show();
      $("#lnameCheck").html("length of username must be between 1 and 10");
      parentClass.addClass("form-val error");
      return false;
    } else {
      parentClass.removeClass("form-val error");
      $("#lnameCheck").hide();
      parentClass.addClass("form-val success");
      return true;
    }
  }
  const arr = [inputAddress, inputCity, decleration, datepick, stateSelect];
  function fieldEmpty(arr) {
    let count = 0;
    arr.forEach((input) => {
      var elemValue = $(input).val();
      let parentClass = $(input).parent();
      if (elemValue === "") {
        parentClass.removeClass("form-val success");
        $(input).next().show();
        parentClass.addClass("form-val error");
        count += 1;
      } else {
        parentClass.removeClass("form-val error");
        $(input).next().hide();
        parentClass.addClass("form-val success");
      }
    });
    if (count == 5) {
      return false;
    } else {
      return true;
    }
  }
  function validateCheck() {
    let parentRadioClass = $(".genderRadio").parent();
    let radioChecked = $(".genderRadio").is(":checked");
    let parentCheckboxClass = $("#gridCheck").parent();
    let checkboxChecked = $("#gridCheck").prop("checked");
    if (!radioChecked) {
      parentRadioClass.addClass("form-val error");
      $("#genderCheck").show();
    } else {
      parentRadioClass.removeClass("form-val error");
      parentRadioClass.addClass("form-val success");
      $("#genderCheck").hide();
    }
    if (checkboxChecked) {
      parentCheckboxClass.addClass("form-val success");
    } else {
      parentCheckboxClass.removeClass("form-val success");
      parentCheckboxClass.addClass("form-val error");
    }
    return radioChecked && checkboxChecked;
  }  
  function validateEmail() {
    let regexEmail =
      /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    var emailValue = $("#inputEmail").val();
    let parentClass = $("#inputEmail").parent();
    if (emailValue === "") {
      parentClass.removeClass("form-val success");
      $("#emailCheck").show();
      $("#emailCheck").html("Please enter the email");
      parentClass.addClass("form-val error");
      return false;
    }
    if (!regexEmail.test(emailValue)) {
      parentClass.removeClass("form-val success");
      $("#emailCheck").show();
      $("#emailCheck").html("Enter the valid email.");
      parentClass.addClass("form-val error");
      return false;
    } else {
      parentClass.removeClass("form-val error");
      $("#emailCheck").hide();
      parentClass.addClass("form-val success");
      return true;
    }
  }
  function validateFile() {
    const fileInput = $("#fileInput");
    // Get the file name and split it by the dot to get the file extension
    const fileName = fileInput.val();
    const fileExtension = fileName.split(".").pop().toLowerCase();
    if (
      fileExtension !== "doc" &&
      fileExtension !== "docx" &&
      fileExtension !== "pdf"
    ) {
      $("#fileCheck").show();
      return false;
    } else {
      $("#fileCheck").hide();
      return true;
    }
  }
  $("#formVal").submit(function (event) {
    event.preventDefault();
    const isFnameValid = validateUsername();
    const isLnameValid = validateUsernameL();
    const isEmailValid = validateEmail();
    const isPinValid = validatepin();
    const isQualificationValid = qualification();
    const isFieldsEmpty = fieldEmpty(arr);
    const isRadio = validateCheck();
    const isFileValid = validateFile();
    if (
      !isFnameValid ||
      !isLnameValid ||
      !isEmailValid ||
      !isPinValid ||
      !isQualificationValid ||
      !isFileValid ||
      !isFieldsEmpty ||
      !isRadio
    ) {
      return false;
    } else {
      console.log("else");
      // Combine first name, last name, and age to create the full entry
      const fullName = `${Fname.val().trim()} ${Lname.val().trim()}`;
      const entry = {
        fullName,
        email: inputEmail.val(),
        gender: genders(),
        qual: qualifications.val(),
        city: inputCity.val(),
        passed:new Date(datepick.val()).getFullYear()
      };
      console.log(entry.gender,"vvv")
      // Save data to local storage
      saveData(entry);
      // Clear the input fields
      clearFormFields(values);
      return true;
    }
  });
  function saveData(entry) {
    let storedData = localStorage.getItem("fullEntries");
    if (storedData) {
      // If data already exists, add the new entry to the array
      storedData = JSON.parse(storedData);
      storedData.push(entry);
    } else {
      // If no data exists, create a new array with the entry
      storedData = [entry];
    }
    localStorage.setItem("fullEntries", JSON.stringify(storedData));
    // Display the updated data in the table
    displayData(storedData);
  }
  // Function to display data in the table
  function displayData(data) {
    const tableBody = $("#dataTable tbody");
    tableBody.empty(); // Clear previous data
    // Loop through the data and create table rows
    data.forEach(function (entry) {
      tableBody.append(
        "<tr><td>" +
        entry.fullName +
        "</td><td>" +
        entry.email +
        "</td><td>" +
        entry.gender +
        "</td><td>" +
        entry.qual +
        "</td><td>"+
        entry.passed+
        "</td><td>"+
        entry.city+
        "</td></tr>"

      );
    });
  }
});