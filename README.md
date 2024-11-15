
# Weather App

A React-based weather application that allows users to search for weather information by location coordinates or use their current location.

## Features

- **Current Location Weather**: The app automatically detects the user's location and displays the current weather information, including temperature, weather conditions, and sunrise/sunset times.
- **Manual Location Search**: Users can enter latitude and longitude coordinates to search for weather data in a specific location.
- **Weather Forecasts**: The app provides both hourly and daily weather forecasts, allowing users to plan ahead.
- **Interactive Map**: A map component displays the user's current or searched location, providing a visual representation of the location.
- **Responsive Design**: The application is designed to be mobile-friendly and adapts to different screen sizes.
- **Error Handling**: The app handles various geolocation and API errors, providing clear and informative error messages to the user.
- **Intuitive Navigation**: Users can easily toggle between the current location weather and the manual search functionality using the buttons in the header.

## Technologies Used

- React.js
- React Leaflet for the map component
- Axios for making API requests to the OpenWeatherMap API
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed on your machine

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AustinDavisTech/WeatherApp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd WeatherApp
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   or

  

4. Create a new file called `.env` in the root directory and add your OpenWeatherMap API key:

   ```
   API_KEY=your_api_key_here
   ```

   You can obtain an API key by signing up for a free account at [OpenWeatherMap](https://openweathermap.org/).

5. Start the development server:

   ```bash
   npm run dev
   ```

   or



6. Open your web browser and navigate to `http://localhost:5173` to see the application.

## Usage

1. When the app loads, it will automatically detect your location and display the current weather information.

2. If you want to search for weather data in a different location, click the "Search Location" button in the top-right corner.

3. Enter the desired latitude and longitude coordinates in the search form and click the "Search" button.

4. The app will update the current weather, hourly forecast, daily forecast, and map to reflect the new location.

5. To return to your current location, click the "Refresh Location" button.

## Additional Features

- **Weather Icons**: The application displays weather-specific icons to help users quickly understand the current conditions.
- **Detailed Weather Information**: In addition to the main weather details, the app provides additional information such as wind speed, humidity, and precipitation.
- **Hourly and Daily Forecast**: Users can easily switch between hourly and daily weather forecasts using the tabs in the interface.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Please make sure to follow the existing code style and include tests for any new functionality.

## License

This project is licensed under the [MIT License](LICENSE).
