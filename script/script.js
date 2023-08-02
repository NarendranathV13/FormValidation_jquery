$(document).ready(function() {
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
    let fnameError = true;
    let pinError = true;
    let LnameError = true;
    let qualError=true;
    let emailError = true;
    let stateError= true;
    let yopError = true;
    $("#Fname").keydown(function() {
      validateUsername();
    });
    //pin
    $("#qualification").keydown(function(){
      qualification();
    })
    $("#inputZip").keyup(function(){
        validatepin();
    });
    // LASTNAME
    $("#Lname").keyup(function() {
      validateUsernameL();
    });
    // EMAIL
    $("#emailCheck").hide();
    
    $("#inputEmail").keyup(function() {
      validateEmail();
    });
    function qualification(){
      var regex = /^[a-zA-Z]{1,20}$/;
      let qualValue = $("#qualification").val();
      if (qualValue.length == "") {
        $("#qualCheck").show();
        qualError = false;
        return false;
      } else if (qualValue.length < 2 || qualValue.length > 10) {
        $("#qualCheck").show();
        $("#qualCheck").html("length of course must be between 2 and 10");
        qualError = false;
        return false;
      } else if (!regex.test(qualValue)) {
        $("#qualCheck").show();
        $("#qualCheck").html("Course must contain alphabets only");
        qualError = false;
        return false;
      } else {
        $("#qualCheck").hide();
      }
    }
  function validatepin(){
    var regexPostalCode = /^[1-9][0-9]{5}$/;
    let pinValue=$("#inputZip").val();
    if (pinValue.length == "") {
      $("#pinCheck").show();
      pinError = false;
      return false;
    } else if (pinValue.length !==6) {
      $("#pinCheck").show();
      $("#pinCheck").html("pin must be 6 digits");
      pinError = false;
      return false;
    } else if (!regexPostalCode.test(pinValue)) {
      $("#pinCheck").show();
      $("#pinCheck").html("Invalid pin");
      pinError = false;
      return false;
    } else {
      $("#pinCheck").hide();
    }
  }
    function validateUsername() {
      var regex = /^[a-zA-Z]{1,20}$/;
      let usernameValue = $("#Fname").val();
      if (usernameValue.length == "") {
        $("#fnameCheck").show();
        fnameError = false;
        return false;
      } else if (usernameValue.length < 3 || usernameValue.length > 10) {
        $("#fnameCheck").show();
        $("#fnameCheck").html("length of username must be between 3 and 10");
        fnameError = false;
        return false;
      } else if (!regex.test(usernameValue)) {
        $("#fnameCheck").show();
        $("#fnameCheck").html("Name must contain alphabets");
        fnameError = false;
        return false;
      } else {
        $("#fnameCheck").hide();
      }
    }
    function validateUsernameL() {
      var regex = /^[a-zA-Z]{1,20}$/;
      let usernameValue = $("#Lname").val();
      if (usernameValue.length == "") {
        $("#lnameCheck").show();
        LnameError = false;
        return false;
      } else if (!regex.test(usernameValue)) {
        $("#lnameCheck").show();
        $("#lnameCheck").html("Name must contain alphabets");
        LnameError = false;
      } else if (usernameValue.length < 3 || usernameValue.length > 10) {
        $("#lnameCheck").show();
        $("#lnameCheck").html("length of username must be between 3 and 10");
        LnameError = false;
        return false;
      } else {
        $("#lnameCheck").hide();
      }
    }
    function validateYOP() {
      let yopValue = $("#datepick").val();
      if (yopValue === "") {
        $("#yopCheck").show();
        yopError = false;
        return false;
      } else {
        $("#yopCheck").hide();
        return true;
      }
    }
  function validateState() {
    let selectedState = $("#exampleSelect").val();
    if (!selectedState) { // Check if selectedState is null or empty
        $("#stateCheck").show();
        stateError = false;
        return false;
    } else {
        $("#stateCheck").hide();
        return true;
    }
}
    const add = $("#inputAddress");
    const cty = $("#inputCity");
    const state = $("#exampleDataList");
    const msg = $("#exampleFormControlTextarea1");
    const yop = $("#YOP");
    const arry = [add,cty, state, msg, yop];
    // field validations
    function fieldEmpty(arr) {
      let count = 0;
      arr.forEach(input => {
        var elemValue = $(input).val();
        if (elemValue === "") {
          $(input).next().show();
          count += 1;
        } else {
          $(input).next().hide();
        }
      });
      return count;
    }
    function validateEmail() {
      let regexEmail = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
      var emailValue = $("#inputEmail").val();
      if (emailValue === "") {
        $("#emailCheck").show();
        $("#emailCheck").html("Please enter the email");
        return false;
      }
      if (!regexEmail.test(emailValue)) {
        $("#emailCheck").show();
        $("#emailCheck").html("Enter the valid email.");
        return false;
      } else {
        $("#emailCheck").hide();
      }
    }
    $("form").on("submit", function(event) {
      // Check if an option is selected in the datalist
      if (!$("#exampleDataList").val()) {
        event.preventDefault(); // Prevent form submission
        $("#stateCheck").show();
      } else {
        $("#stateCheck").hide();
      }
    });
    // Submit button
    $("#submit").click(function() {
      console.log("hiii");
      validateUsername();
      validateUsernameL();
      validateEmail();
      validatepin();
      validateState();
      qualification();
      validateYOP();
      let count = fieldEmpty(arry);
      if (
        fnameError == true &&
        emailError == true &&
        LnameError == true &&
        pinError == true &&
        qualError== true &&
        yopError == true &&
        stateError== true &&
        count == 6
      ) {
        return true;
      } else {
        return false;
      }
    });
  });
