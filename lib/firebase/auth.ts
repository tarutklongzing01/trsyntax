import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getFirebase } from './client';

function requireFirebase() {
  const firebase = getFirebase();
  if (!firebase) throw new Error('ยังไม่ได้ตั้งค่า Firebase');
  return firebase;
}

async function syncUser(user: User, displayName?: string, isRegistration = false) {
  const { db } = requireFirebase();
  const userRef = doc(db, 'users', user.uid);
  const userDocument = await getDoc(userRef);
  const profile = {
    displayName: displayName || user.displayName || '',
    email: user.email,
    photoURL: user.photoURL || '',
    updatedAt: serverTimestamp(),
  };

  if (!userDocument.exists() || isRegistration) {
    await setDoc(userRef, {
      ...profile,
      role: 'user',
      createdAt: serverTimestamp(),
    });
    return;
  }

  await setDoc(userRef, profile, { merge: true });
}

export async function registerWithEmail(name: string, email: string, password: string) {
  const { auth } = requireFirebase();
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName: name });
  await syncUser(credential.user, name, true);
  return credential.user;
}

export async function loginWithEmail(email: string, password: string) {
  const { auth } = requireFirebase();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  await syncUser(credential.user);
  return credential.user;
}

export async function loginWithGoogle() {
  const { auth } = requireFirebase();
  const credential = await signInWithPopup(auth, new GoogleAuthProvider());
  await syncUser(credential.user);
  return credential.user;
}

export async function logout() {
  const { auth } = requireFirebase();
  await signOut(auth);
}
