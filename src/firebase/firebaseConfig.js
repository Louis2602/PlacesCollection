import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyAFVD08u1nMrheSKacEAmYu9divCn4aH-8',
    authDomain: 'food-collections-test.firebaseapp.com',
    databaseURL: 'https://food-collections-test-default-rtdb.firebaseio.com',
    projectId: 'food-collections-test',
    storageBucket: 'food-collections-test.appspot.com',
    messagingSenderId: '904641744671',
    appId: '1:904641744671:web:ecfaef206dff544d96aa2a'
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
