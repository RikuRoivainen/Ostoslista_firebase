// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQI5JEQiAAIp3vaHGbaZI4u28CFNQ4hA4",
  authDomain: "ostoslista-235d3.firebaseapp.com",
  databaseURL: "https://ostoslista-235d3-default-rtdb.firebaseio.com",
  projectId: "ostoslista-235d3",
  storageBucket: "ostoslista-235d3.appspot.com",
  messagingSenderId: "1093383325483",
  appId: "1:1093383325483:web:749993df4d3f9b1155a76e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);