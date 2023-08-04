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
  var qualification1 = [
    "Bachelor of Arts",
    "Bachelor of Science",
    "Bachelor of Commerce",
    "Bachelor of Technology",
    "Bachelor of Engineering",
    "Bachelor of Computer Applications"
  ];
  $("#qualification").autocomplete({
    source: qualification1,
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
  const fileInput = $("#fileInput");
  const files = $("#fileInput");
  const pinReg=/^[1-9][0-9]{4,5}$/;
  const emailReg=/^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
  function rmvErr(err,prnt){
    err.hide();
    prnt.parent().removeClass("form-val error")
    prnt.parent().addClass("form-val success")
  }
  Fname.keyup(function () {
    validateUsername(Fname);
  });
  qualifications.keydown(function () {
    rmvErr($("#qualCheck"),qualifications);
  });
  inputZip.keyup(function () {
    validateReg(pinReg,inputZip);
  });
  Lname.keyup(function () {
    validateUsername(Lname);
  });
  inputEmail.keyup(function () {
    validateReg(emailReg,inputEmail);
  });
  stateSelect.change(function () {
    rmvErr($("#stateCheck"),stateSelect);
  });
  datepick.change(function () {
    rmvErr($("#yopCheck"),datepick);
  });
  decleration.keydown(function(){
    rmvErr($("#declCheck"),decleration)
  });
  inputCity.keydown(function(){
    rmvErr($("#cityCheck"),inputCity);
  });
  inputAddress.keydown(function(){
    rmvErr($("#ad1Check"),inputAddress);
  });
  checkbox1.change(function(){
    rmvErr($("#dummy"),checkbox1);
  })
  let fileName = fileInput.val();
  fileInput.change(function () {
    fileName = fileInput.val();
    if (fileName === "") {
      $(".btclr").css("background-color", "rgb(247, 37, 37)");
      $("#fileCheck").show();
    } else {
      $(".btclr").css("background-color", "rgb(104, 179, 34)");
      $("#fileCheck").hide();
    }
  });
  const genders = () => {
    let selectedGender = $("input[name='gender']:checked").val();
    return selectedGender;
  };
  radios.on("click", function(){
    rmvErr($("#genderCheck"),radios);
  });
  $("#edit").on("click", function() {
    editCell();
    changeModalTitle("Form details (Editable)","red");
  });
  $("#saveChange").on("click", function() {
    saveChanges();
    changeModalTitle("Form Details","green");
    updateLocalStorageData();
  });

function changeModalTitle(title,bg) {
  $(".modal-title").text(title);
  if(bg=="red"){
    $(".modal-title").removeClass("bg-success rounded-2 px-2");
    $(".modal-title").addClass("bg-warning rounded-2 px-2");
  }
  else if(bg=="green"){
    $(".modal-title").removeClass("bg-warning rounded-2 px-2");
    $(".modal-title").addClass("bg-success rounded-2 px-2");
  }
}
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
      $(".btclr").css("background-color", "rgb(255, 155, 41)");
    });
  }
  $("#clear").click(function () {
    clearFormFields(values);
  });
  function validateReg(regx,inpID) {
    var regexPostalCode = regx;
    let pinValue = inpID.val();
    let parentClass = inpID.parent();
    if (pinValue.length == "") {
      parentClass.removeClass("form-val success");
      inpID.next().show();
      parentClass.addClass("form-val error");
      return false;
    }else if (!regexPostalCode.test(pinValue)) {
      parentClass.removeClass("form-val success");
      inpID.next().show();
      inpID.next().html("Invalid entry");
      parentClass.addClass("form-val error");
      return false;
    } else {
      parentClass.removeClass("form-val error");
      inpID.next().hide();
      parentClass.addClass("form-val success");
      return true;
    }
  }
  function validateUsername(inputt) {
    var regex = /^[a-zA-Z]{1,20}$/;
    let usernameValue = inputt.val();
    let parentClass = inputt.parent();
    if (usernameValue.length == "") {
      parentClass.removeClass("form-val success");
      inputt.next().show();
      parentClass.addClass("form-val error");
      return false;
    } else if (usernameValue.length < 1 || usernameValue.length > 20) {
      parentClass.removeClass("form-val success");
      inputt.next().show();
      inputt.next().html("length of username must be between 1 and 20");
      parentClass.addClass("form-val error");
      return false;
    } else if (!regex.test(usernameValue)) {
      parentClass.removeClass("form-val success");
      inputt.next().show();
      inputt.next().html("Name must contain alphabets");
      parentClass.addClass("form-val error");
      return false;
    } else {
      parentClass.removeClass("form-val error");
      inputt.next().hide();
      parentClass.addClass("form-val success");
      return true;
    }
  }
  const arr = [inputAddress, inputCity, decleration, datepick, stateSelect,qualifications];
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
    if (count == 6) {
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
  function validateFile() {
    let fileName = fileInput.val();
    const fileExtension = fileName.split(".").pop().toLowerCase();
    if (
      fileExtension !== "doc" &&
      fileExtension !== "docx" &&
      fileExtension !== "pdf"
    ) {
      $(".btclr").css("background-color", "rgb(247, 37, 37)");
      $("#fileCheck").show();
      return false;
    } else {
      $(".btclr").css("background-color","rgb(104, 179, 34)");
      $("#fileCheck").hide();
      return true;
    }
  }
  $("#formVal").submit(function (event) {
    event.preventDefault();
    const isFnameValid = validateUsername(Fname);
    const isLnameValid =  validateUsername(Lname);
    const isEmailValid =  validateReg(emailReg,inputEmail);
    const isPinValid =validateReg(pinReg,inputZip);
    const isFieldsEmpty = fieldEmpty(arr);
    const isRadio = validateCheck();
    const isFileValid = validateFile();
    if (
      !isFnameValid ||
      !isLnameValid ||
      !isEmailValid ||
      !isPinValid ||
      !isFileValid ||
      !isFieldsEmpty ||
      !isRadio
    ) {
      return false;
    } else {
      const fullName = `${Fname.val().trim()} ${Lname.val().trim()}`;
      const entry = {
        fullName,
        email: inputEmail.val(),
        gender: genders(),
        qual: qualifications.val(),
        city: inputCity.val(),
        passed:new Date(datepick.val()).getFullYear(),
        state: stateSelect.val()
      };
      saveData(entry);
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
      // If no data exists,create a new array 
      storedData = [entry];
    }
    localStorage.setItem("fullEntries", JSON.stringify(storedData));
    // Display the updated data in the table
    displayData(storedData);
  }
  function displayData(data) {
    const tableBody = $("#dataTable tbody");
    tableBody.empty(); // Clear previous data
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
        "</td><td>"+
        entry.state+
        "</td></tr>"
      );
    });
  }
  let isTableEditable = true;
  // Edit table cell
  function editCell() {
    if(isTableEditable){
    $("#dataTable td").on("click", function () {
      // Check if the cell already contains an input field
      if ($(this).find("input").length === 0) {
        // Store the current cell's content
        var currentValue = $(this).text().trim();
        // Replace the cell content with an  input field
        $(this).html("<input type='text' value='" + currentValue + "' />");
        $(this).find("input").focus();
      }
    });
  }
  }
function saveChanges() {
  $("#dataTable td input").each(function () {
    var editedValue = $(this).val();
    $(this).parent().html(editedValue);
    $("#dataTable td").off("click");
    isTableEditable = false;
  });
}
  // Function to update the local storage data
  function updateLocalStorageData() {
    const data = [];
    $("#dataTable tbody tr").each(function () {
      const fullName = $(this).find("td:eq(0)").text().trim();
      const email = $(this).find("td:eq(1)").text().trim();
      const gender = $(this).find("td:eq(2)").text().trim();
      const qual = $(this).find("td:eq(3)").text().trim();
      const passed = $(this).find("td:eq(4)").text().trim();
      const city = $(this).find("td:eq(5)").text().trim();
      const state = $(this).find("td:eq(6)").text().trim();
      data.push({
        fullName,
        email,
        gender,
        qual,
        passed,
        city,
        state,
      });
    });
    localStorage.setItem("fullEntries", JSON.stringify(data));
  }  
});