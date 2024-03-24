import { atomWithLocalStorage } from './atom-handler';

type FirebaseToken = {
  fcmToken?: string;
  fcmAge: number;
};

const initialData: FirebaseToken = {
  fcmToken: undefined,
  fcmAge: 0,
};

export const firebaseSettingsAtom = atomWithLocalStorage('camera-events-firebase-token', initialData);
