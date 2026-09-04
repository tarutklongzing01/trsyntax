'use client';

import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { getFirebase } from '@/lib/firebase/client';

export function useFirebaseUser() {
  const firebase = useMemo(() => getFirebase(), []);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(Boolean(firebase));

  useEffect(() => {
    if (!firebase) {
      return;
    }

    return onAuthStateChanged(firebase.auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
  }, [firebase]);

  return { user, loading, configured: Boolean(firebase) };
}
