# TODO
basic todo list app made with svelte and firebase

### SETUP
1. Clone this repository
2. Checkout to this branch (sveltefirebase)
3. Set up a firebase project and web app. Enable firestore native api within google cloud console and google authentication in your firebase project.
4. Replace the project setting fields in firebaseConfig in /app/src/firebase.js with your app credentials, which can be found under project settings in the firebase console.
5. cd into /app
6. npm install the requirements
7. npm run dev
8. When running the app for the first time, firebase will ask you to create a query index for a composite query- just follow the instructions given.

### DOCUMENTATION
* This app was created following [this tutorial](https://fireship.io/lessons/svelte-v3-overview-firebase/).
* The original code was depracated, so some changes were made to make it run, but most of the basic structure remains the same.
* New comments added to demonstrate understanding of the code are in the form "COMMENT: ..." to distinguish from the original author's comments.
