import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'frontend-little-linguist',
        appId: '1:215787123942:web:d847dd7a6e6edf2900f727',
        storageBucket: 'frontend-little-linguist.appspot.com',
        apiKey: 'AIzaSyC28d8tgesi6x3Fxrce8xXfth0YREGW9SE',
        authDomain: 'frontend-little-linguist.firebaseapp.com',
        messagingSenderId: '215787123942',
        measurementId: 'G-P4F78FCD5F',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
