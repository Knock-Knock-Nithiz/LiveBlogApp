# Live Blog App

Live Blog App is a real-time chat application that uses various modern web technologies including Node.js, Express, MongoDB, Webpack, and Socket.io. It allows users to engage in live chat, manage posts, and more.

## Features

- Real-time chat functionality with Socket.io
- User authentication and session management
- Post creation and management
- Responsive frontend built with Webpack
- Data persistence using MongoDB
- Secure environment with JWT for authentication

## Technologies

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (via Mongoose)
  - Socket.io
  - JWT for authentication

- **Frontend:**
  - Webpack
  - Babel
  - HTML/CSS

- **Development Tools:**
  - Nodemon
  - Concurrently
  - Cross-env

## Getting Started

### Prerequisites

- Node.js (v20.15.1 or later)
- npm or yarn
- MongoDB instance

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Knock-Knock-Nithiz/3-chatapp.git
   cd 3-chatapp
   
2. Install dependencies:
    npm install

3. Set up environment variables:
    Create a .env file in the root directory and add the following variables:
      CONNECTIONSTRING=your-mongodb-connection-string
      PORT=3000
      JWTSECRET=your-secret-key

4. Start the development server:
     npm run watch


### Deployment
Deployment
The application is deployed on Render and can be accessed at (https://liveblogapp.onrender.com/).

-**Steps for Deployment**
Push the code to your GitHub repository.
Create a new Web Service on Render: 
    1. Connect your GitHub repository. 
    2. Set up the environment variables, if any.
    3. Choose the npm start as the build command. Deploy the app.
    
-**To deploy the application:**

-Ensure the .env file is properly set with production values.
-Configure your deployment environment (e.g., Render, Heroku) to bind to the correct port and use the provided environment variables.
Usage

-**Development Mode:**

-Runs the application and watches for file changes.
-Frontend assets are bundled and watched by Webpack.
-The server restarts on changes to backend files.

-**Production Mode:**

-Ensure environment variables are set for the production environment.
-The application should listen on the port provided by the hosting service.
