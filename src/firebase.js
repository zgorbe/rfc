//import * as firebase from 'firebase';

import firebase from 'firebase/app';
import 'firebase/database';

const app = firebase.initializeApp({
    apiKey: "AIzaSyDfWvKdwMJBI2DCX1G92b0crjQqyNfoedg",
    authDomain: "fire-chess-d2f51.firebaseapp.com",
    databaseURL: "https://fire-chess-d2f51.firebaseio.com",
    projectId: "fire-chess-d2f51",
    storageBucket: "fire-chess-d2f51.appspot.com",
    messagingSenderId: "385304048657"
});

export const db = app.database();
export const tableRef = db.ref('reactTable');
export const deletedWhitesRef = db.ref('reactDeletedWhites');
export const deletedBlacksRef = db.ref('reactDeletedBlacks');
export const whoIsNextRef = db.ref('reactWhoIsNext');
export const castlingRef = db.ref('reactCastling');
export const lastMoveRef = db.ref('reactLastMove');
export const checkRef = db.ref('reactCheck');
export const mateRef = db.ref('reactMate');
export const drawRef = db.ref('reactDraw');