import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBlKqAGD_fDI_s1oFU22WRw-FB6WLhk7JY",
  authDomain: "power-pint.firebaseapp.com",
  projectId: "power-pint",
  storageBucket: "power-pint.firebasestorage.app",
  messagingSenderId: "839207213600",
  appId: "1:839207213600:web:c0da0c207a58bc9e6c3a45",
  measurementId: "G-EJW1YKQHWW"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
