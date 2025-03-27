# Task Manager Frontend

This is the frontend application for the Task Manager, a web application that helps users organize and manage their tasks with a sleek, high-contrast black and white UI.

## Features

- User authentication (login and registration)
- Create, read, update, and delete tasks
- Mark tasks as completed
- Filter tasks (all, active, completed)
- Search tasks by title or description
- Responsive design for mobile and desktop
- High contrast black and white theme
- Dark/Light mode toggle
- Interactive animations and transitions
- 3D logo cube with rotation effects
- Animated interactive UI elements

## UI Features

- **High Contrast Theme**: Clean black and white design for maximum readability
- **Interactive Elements**:
  - Task item animations on hover and completion
  - Button ripple effects and micro-interactions
  - Form element focus animations
  - Loading spinners and empty state indicators
- **3D Logo**: Interactive cube that rotates on hover
- **Dark/Light Mode**: Toggle between modes with smooth transitions
- **Responsive Design**: Adapts to all screen sizes

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Backend server running on http://localhost:5001 (configured in package.json proxy)

### Installation

1. Clone the repository
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install` or `yarn install`
4. Start the development server: `npm start` or `yarn start`
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components
- `src/context/` - React context providers for global state
- `src/styles/` - CSS styles including:
  - `main.css` - Main application styles
  - `logo.css` - 3D logo styles
  - `theme-toggle.css` - Dark/light mode toggle

## Technologies Used

- React.js
- React Router for navigation
- Context API for state management
- Axios for API requests
- CSS3 with animations and custom properties
- Modern JavaScript (ES6+)

## Dependencies

```
"dependencies": {
  "@testing-library/jest-dom": "^5.17.0",
  "@testing-library/react": "^13.4.0",
  "@testing-library/user-event": "^13.5.0",
  "axios": "^1.7.9",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.1.5",
  "react-scripts": "5.0.1",
  "web-vitals": "^2.1.4"
}
```

## License

This project is licensed under the MIT License. 