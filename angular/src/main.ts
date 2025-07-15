import 'zone.js';
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { App } from './app/app';


// Módulos tradicionales que se importan como providers
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// Servicios
import { EnvironmentService } from './app/services/environment.service';
import { CompanyService } from './app/services/company.service';
import { UsersService } from './app/services/users.service';
import { OrderService } from './app/services/order.service';
import { LoggedHttpService } from './app/services/logged-http.service';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    importProvidersFrom(
      FormsModule,
    ),
    EnvironmentService,
    CompanyService,
    UsersService,
    OrderService,
    LoggedHttpService
  ]
});