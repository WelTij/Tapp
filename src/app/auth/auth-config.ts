import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://api.trello.com',
  redirectUri: window.location.origin,
  clientId: 'b019a05d117db6aee5e5a627439f701e', // Reemplaza con tu API Key de Trello
  responseType: 'token',
  scope: 'read,write',
};