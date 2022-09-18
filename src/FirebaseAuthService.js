import firebase from './FirebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import FirebaseFirestoreService from './FirebaseFirestoreService';

const auth = firebase.auth;

const registerUser = async (name, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    await updateProfile(user, {
      displayName: name,
    });
    const newUser = {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    };
    await FirebaseFirestoreService.createDocument(
      'users',
      newUser.uid,
      newUser
    );
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
  return auth.signOut();
};

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const userQuery = [
      {
        field: 'uid',
        condition: '==',
        value: user.uid,
      },
    ];
    const docs = await FirebaseFirestoreService.readDocuments({
      collection: 'users',
      queries: userQuery,
    });
    if (docs.docs.length === 0) {
      const newUser = {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      };
      await FirebaseFirestoreService.createDocument(
        'users',
        newUser.uid,
        newUser
      );
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Please check your email for password reset link');
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const subscribeToAuthChanges = (handleAuthChange) => {
  onAuthStateChanged(auth, (user) => {
    handleAuthChange(user);
  });
};

const FirebaseAuthService = {
  registerUser,
  loginUser,
  logoutUser,
  sendPasswordReset,
  loginWithGoogle,
  subscribeToAuthChanges,
};

export default FirebaseAuthService;
