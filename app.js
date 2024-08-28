document.getElementById('weather-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const city = document.getElementById('city').value; // Get the city name from the input field
    const apiKey = '29412074d0a142b2189933e59f6d8199'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Construct the API URL

    console.log('Fetching URL:', url); // Log the URL being fetched

    try {
        const response = await fetch(url); // Fetch the weather data from the API
        console.log('Response Status:', response.status); // Log the response status

        if (!response.ok) { // Check if the response status is not OK (200-299)
            const errorData = await response.json(); // Parse the error response as JSON
            console.error('Error response data:', errorData); // Log the error response data
            throw new Error(errorData.message); // Throw an error with the message from the API
        }

        const data = await response.json(); // Parse the successful response as JSON
        console.log('Weather data:', data); // Log the weather data

        // Update the DOM with the weather data
        document.getElementById('weather-city').textContent = data.name;
        document.getElementById('weather-temp').textContent = data.main.temp;
        document.getElementById('weather-desc').textContent = data.weather[0].description;
        document.getElementById('weather-humidity').textContent = data.main.humidity;
        document.getElementById('weather-result').classList.remove('hidden'); // Show the weather result section
    } catch (error) {
        alert('Error: ' + error.message); // Show an alert with the error message
        console.error('Error fetching weather data:', error); // Log the error
    }
});
