import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router'; // ✅ Importe o provideRouter
import { provideHttpClient } from '@angular/common/http'; // ✅ Importe o provideHttpClient

import { routes } from './app.routes'; // ✅ Importe suas rotas

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // ✅ Adicione a configuração do roteamento aqui
    provideHttpClient() // ✅ Inclua o HttpClient para comunicação com o back-end
  ]
};