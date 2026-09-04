import { collection, getDocs } from 'firebase/firestore';
import { programs as mockPrograms } from '@/lib/mock-data';
import type { SoftwareProgram } from '@/types';
import { getFirebase } from './client';

export async function getPublishedPrograms(): Promise<SoftwareProgram[]> {
  const firebase = getFirebase();
  if (!firebase) return mockPrograms;
  try {
    const snapshot = await getDocs(collection(firebase.db, 'products'));
    if (snapshot.empty) return mockPrograms;
    return snapshot.docs.map((document) => {
      const data = document.data() as Partial<SoftwareProgram>;
      const fallback = mockPrograms.find((program) => program.id === document.id || program.slug === data.slug);
      return {
        ...(fallback || mockPrograms[0]),
        ...data,
        id: document.id,
        slug: data.slug || document.id,
      } as SoftwareProgram;
    });
  } catch {
    return mockPrograms;
  }
}
