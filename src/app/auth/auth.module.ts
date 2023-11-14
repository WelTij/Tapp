

import { NgModule } from '@angular/core';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthService } from './auth.service';
import { authConfig } from './auth-config';

@NgModule({
  imports: [
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true,
        allowedUrls: ['https://api.trello.com/1'],
      },
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}


