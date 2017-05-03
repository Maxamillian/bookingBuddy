import { EventEmitter } from 'events';
import Auth0Lock from 'auth0-lock';
import { isTokenExpired } from './jwtHelper';

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super();
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000',
        responseType: 'token'
      }
    });
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // Add callback for lock `authorization_error` event
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  _doAuthentication(authResult) {
    // console.log('authResult', authResult);

    this.lock.getUserInfo(
      authResult.accessToken,
      function(error, userProfile) {
        if (error) {
          console.log('Error loading the Profile', error);
        }
        // Store the token from authResult for later use
        this.setToken(authResult.accessToken);
        // console.log('accessToken', authResult.accessToken);
        // this.setToken(authResult.accessToken);

        // Display user information
        this.setProfile(userProfile);
        // console.log('Profile: ', userProfile);
        // localStorage.setItem('user_profile', JSON.stringify(profile));
      }.bind(this)
    );
  }

  login() {
    this.lock.show();
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user_profile');
  }

  setToken(accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  setProfile(userProfile) {
    localStorage.setItem('user_profile', JSON.stringify(userProfile));
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', userProfile);
  }

  getProfile() {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {};
  }
}
