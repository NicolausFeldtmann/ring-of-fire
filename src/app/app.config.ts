import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-c23c6","appId":"1:176630087499:web:9a45272209365502aaf2ce","databaseURL":"https://ring-of-fire-c23c6-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"ring-of-fire-c23c6.firebasestorage.app","apiKey":"AIzaSyCp5eE3x9hcxAMQOFryOps2SzvQ7FyV8qU","authDomain":"ring-of-fire-c23c6.firebaseapp.com","messagingSenderId":"176630087499"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
