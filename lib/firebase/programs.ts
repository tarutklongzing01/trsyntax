import { collection, getDocs, query, where } from 'firebase/firestore';
import { programs as mockPrograms } from '@/lib/mock-data';
import type { SoftwareProgram } from '@/types';
import { getFirebase } from './client';

export async function getPublishedPrograms(): Promise<SoftwareProgram[]> {
  const firebase = getFirebase();
  if (!firebase) return mockPrograms;
  try {
    const snapshot = await getDocs(query(collection(firebase.db, 'programs'), where('published', '==', true)));
    if (snapshot.empty) return mockPrograms;
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as SoftwareProgram);
  } catch {
    return mockPrograms;
  }
}
