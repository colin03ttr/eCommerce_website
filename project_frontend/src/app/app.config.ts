import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideHttpClient } from '@angular/common/http';


import { ApiModule, Configuration, ConfigurationParameters } from '../generated/angular-client';


const apiConfParams: ConfigurationParameters = {
  /* basePath: 'http://localhost:4200/' */
  // without this line, the generated code will use port 3000 and cause a CORS error
  // with this line, the generated code will use port 4200 but backend is on port 3000
};
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withHashLocation()), provideClientHydration(), provideHttpClient(), importProvidersFrom(ApiModule.forRoot(() => new Configuration(apiConfParams)))]
};
