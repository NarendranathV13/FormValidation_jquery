$(document).ready(function () {
    // Check if data already exists in local storage
    let storedData = localStorage.getItem('fullEntries');
    if (storedData) {
        // Display the stored data in the table
        displayData(JSON.parse(storedData));
    }

    // Submit event for the form
    $('#nameForm').submit(function (event) {
        event.preventDefault();
        const firstName = $('#firstName').val().trim();
        const lastName = $('#lastName').val().trim();
        const age = $('#age').val().trim();

        // Validation: Ensure all fields are filled
        if (firstName === '' || lastName === '' || age === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Convert age to a number (since it's input type "number")
        const ageNumber = parseInt(age);

        // Validation: Ensure age is a valid number
        if (isNaN(ageNumber) || ageNumber <= 0) {
            alert('Please enter a valid age.');
            return;
        }

        // Combine first name, last name, and age to create the full entry
        const fullName = `${firstName} ${lastName}`;
        const entry = { fullName, age: ageNumber };

        // Save data to local storage
        saveData(entry);
        // Clear the input fields after submission
        $('#firstName').val('');
        $('#lastName').val('');
        $('#age').val('');
    });

    // Function to save data to local storage
    function saveData(entry) {
        let storedData = localStorage.getItem('fullEntries');
        if (storedData) {
            // If data already exists, add the new entry to the array
            storedData = JSON.parse(storedData);
            storedData.push(entry);
        } else {
            // If no data exists, create a new array with the entry
            storedData = [entry];
        }
        localStorage.setItem('fullEntries', JSON.stringify(storedData));

        // Display the updated data in the table
        displayData(storedData);
    }

    // Function to display data in the table
    function displayData(data) {
        const tableBody = $('#dataTable tbody');
        tableBody.empty(); // Clear previous data

        // Loop through the data and create table rows
        data.forEach(function (entry) {
            tableBody.append('<tr><td>' + entry.fullName + '</td><td>' + entry.age + '</td></tr>');
        });
    }
});
