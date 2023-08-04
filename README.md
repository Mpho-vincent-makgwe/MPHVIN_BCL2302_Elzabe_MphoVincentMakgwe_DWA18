# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Podcast Preview App

This is a Podcast Preview web application that allows users to explore and discover various podcasts. The app displays a list of podcasts with their details, such as title, image, genres, and description. Users can click on a podcast to view its episodes, play audio, and mark episodes as favorites.

## Features

- View a list of podcasts with their basic details.
- Click on a podcast to view its episodes and additional details.
- Play podcast episodes with an integrated audio player.
- Mark episodes as favorites and view a list of favorite episodes.
- Filter podcasts by title and perform fuzzy searches.
- Sort podcasts by title (A-Z and Z-A) and update dates (ascending and descending).
- Store user favorites and current podcast state using local storage.
- Authentication support to enable user-specific actions.

## Technologies Used

- React.js: A JavaScript library for building user interfaces.
- Bootstrap: A popular CSS framework for creating responsive designs.
- Fuse.js: A lightweight fuzzy-search library for JavaScript.
- Supabase: A real-time and secure backend-as-a-service (BaaS) platform for building applications.
- Local Storage: HTML5 feature for storing data in the browser locally.

## Setup and Usage

1. Clone the repository to your local machine.
2. Install the dependencies using `npm install`.
3. Run the app using `npm start`.
4. Open your browser and navigate to `http://localhost:5174` to access the app.

## How to Use

1. Upon loading the app, you will see a list of podcasts on the homepage.
2. Click on a podcast to view its details, episodes, and play audio.
3. Mark episodes as favorites by clicking on the heart icon next to each episode.
4. Use the sorting and filtering options to customize the list of podcasts.
5. Perform fuzzy searches by typing in the search bar.
6. Click the "Back" button to return to the previous view.

## Folder Structure

- `src/components`: Contains individual components used in the app.
- `src/services`: Includes services for fetching and managing data.
- `src/styles`: Contains CSS files for styling the app.
- `src/Authentication`: Includes authentication-related components and services.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Mpho Vincent Makgwe - mphomakgwe4@gmail.com

## Acknowledgments

Special thanks to the OpenAI team for providing the AI language model used to generate the documentation for this project.