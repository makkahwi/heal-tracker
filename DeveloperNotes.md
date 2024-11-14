# Developer Notes

## Project Overview

**Health Daily Link** is a React-based open-source web application designed for users who want to track their daily health-related activities, including food consumption, hydration, exercise, medications, sleep, and weight monitoring. The application leverages Firebase for backend data management, providing real-time syncing and secure authentication. The primary goal is to offer a feature-rich health-tracking app that is expandable with community support.

---

## Project Structure

The project is structured around React with Firebase integration. Key parts of the app include:

- **Frontend**: Built with React and TypeScript, using Redux for state management and React Router for navigation.
- **Styling**: Bootstrap and SASS for responsive and customizable UI.
- **Icons**: Font Awesome for icons, enhancing visual appeal.
- **Testing**: Testing is facilitated using the React Testing Library and Jest.

---

## Installation and Setup

To set up the project locally:

1. Clone the repository:

   `git clone <https://github.com/makkahwi/health-daily-link.git>`

2. Install dependencies:

   `cd health-daily-link`
   `npm install`

3. Run the application:

   `npm start`

## Key Technologies

- React: Core front-end framework for building user interfaces.
- Redux Toolkit: Used for global state management, helping manage app-wide states effectively.
- React Router DOM: Handles routing for a smooth single-page application experience.
- Firebase: Backend-as-a-Service (BaaS) for data storage, real-time syncing, and user authentication.
- SASS: For advanced CSS styling with nesting and variables.
- Font Awesome: For a wide range of icons to visually enhance the UI.
- Bootstrap: Provides a responsive grid and components, making the app adaptable to various screen sizes.

## Technical Features To Build / Fix

- Fix dynamicList of dynamicList Rendering
- Build LabTest analysis
- Build data update functionality
- Build Loading indicator(s)
- Build main dashboard
  - Build health indicators progress analysis
    - Weight
    - Lab tests
- Build user profile service
  - Name
  - Photo
  - Bio & geo data
- Build admin panel
  - List of users
    - Create
    - Delete
    - Password reset
  - Across-user analysis

## Suggested Contribution Areas

Here are some suggested areas where contributors can add value:

- Performance Improvements: Optimize React components and Firebase interactions to enhance speed and reduce latency.
- UI Enhancements: Improve the user interface for a more appealing experience.
- Internationalization: Add support for additional languages.
- Accessibility: Implement accessibility features to ensure inclusivity for users with disabilities.
- Mobile Responsiveness: Further optimize the UI for mobile and tablet users.
- Advanced Data Analysis: Develop advanced analytics features for users to view health trends over time.
- AI Integrations: Add features such as AI-based activity suggestions or calorie estimations.

## Contribution Guidelines

Contributions to Health Daily Link are welcome! Please follow these guidelines:

- Fork the repository and create a new branch for your feature.
- Ensure all code is tested and passes linting.
- Submit a pull request with a clear description of your feature or fix.
