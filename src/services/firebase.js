import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const firestore = firebase.firestore();

export const signInWithEmailAndPassword = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const createUserWithEmailAndPassword = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const signOut = () => {
  return auth.signOut();
};

export const saveProfile = (uid, profile) => {
  return firestore.collection("users").doc(uid).set(profile);
};

export const createNewGame = async (fromEmail, toEmail, game) => {
  const fromUser = await firestore
    .collection("users")
    .where("email", "==", fromEmail)
    .get();

  const userExists = await firestore
    .collection("users")
    .where("email", "==", toEmail)
    .get();
  if (userExists.empty) {
    return Promise.reject({ code: "user-not-found" });
  }
  const gameExists = await firestore
    .collection("games")
    .where("fromEmail", "==", fromEmail)
    .where("toEmail", "==", toEmail)
    .get();

  for (const doc of gameExists.docs) {
    if (doc.data().winner === "") {
      return Promise.reject({ code: "game-exists" });
    }
  }

  return firestore.collection("games").add({
    ...game,
    fromName: fromUser.docs[0].data().name,
    toName: userExists.docs[0].data().name,
  });
};

export const getGames = async (email) => {
  const fromGames = await firestore
    .collection("games")
    .where("fromEmail", "==", email)
    // .orderBy("updatedAt", "desc")
    .get();

  const toGames = await firestore
    .collection("games")
    .where("toEmail", "==", email)
    // .orderBy("updatedAt", "desc")
    .get();

  const games = [...fromGames.docs, ...toGames.docs];
  games.sort((a, b) => {
    return b.data().updatedAt - a.data().updatedAt;
  });

  return games;
};

export const getGame = (gameId, callback) => {
  console.log(gameId);
  return firestore.collection("games").doc(gameId).onSnapshot(callback);
};

export const updateGame = (gameId, game) => {
  return firestore.collection("games").doc(gameId).update(game);
};
