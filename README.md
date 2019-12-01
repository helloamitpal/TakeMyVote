# TakeMyVote

This is an app for taking votes and creating a poll

# Installation instruction

1. `npm install`
2. `npm run start`
3. To open the application in local, please <a href='http://localhost:3001/'>Click here</a>

# CORS and CORB issue

While running the application in local, you might have faced CORS and CORB issue in the browser as we are making 3rd party API call from localhost with port 3001. Please install plugins in your respective browser to enable CORS.

# Features and coding styles

- Responsive UI. Different layout for mobile and desktop
- Implemented extensible UI architecture
- Used reactive and functional programming paradigm with Redux and React Hooks respectively
- Added error boundary to conceive any unexpected UI errors
- Added react memo in some places to stop unnecessary rendering
- Followed modular approach in coding
- Used React lazy to make on-demand respective module loading to gain the start up performance
- Used modular common components approach in coding
- Maintained common config, helper files to serve the common purposes
- Added API interceptor to enabling the scope of writing central code while sending request or receiving response
