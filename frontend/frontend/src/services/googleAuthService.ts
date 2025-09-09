// Google OAuth service for handling Google authentication
// This service uses the Google Identity Services (GIS) library

declare global {
  interface Window {
    google: any;
  }
}

export interface GoogleAuthResponse {
  credential: string;
  select_by?: string;
}

export interface GoogleUserInfo {
  sub: string; // Google user ID
  name: string;
  email: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

class GoogleAuthService {
  private CLIENT_ID: string = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
  
  constructor() {
    if (!this.CLIENT_ID) {
      console.warn('Google OAuth Client ID is not configured. Please set REACT_APP_GOOGLE_CLIENT_ID in your .env file.');
    }
  }

  // Initialize Google OAuth
  initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.google) {
        reject(new Error('Google Identity Services not loaded'));
        return;
      }

      try {
        window.google.accounts.id.initialize({
          client_id: this.CLIENT_ID,
          callback: this.handleCredentialResponse.bind(this),
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  // Handle the credential response from Google
  private handleCredentialResponse(response: GoogleAuthResponse) {
    // This will be handled by the component that triggers the sign-in
    // We'll emit a custom event that components can listen to
    const event = new CustomEvent('googleAuthSuccess', {
      detail: response
    });
    window.dispatchEvent(event);
  }

  // Show Google Sign-In popup
  signIn(): Promise<GoogleAuthResponse> {
    return new Promise((resolve, reject) => {
      if (!window.google) {
        reject(new Error('Google Identity Services not loaded'));
        return;
      }

      // Listen for the auth success event
      const handleAuthSuccess = (event: any) => {
        window.removeEventListener('googleAuthSuccess', handleAuthSuccess);
        resolve(event.detail);
      };

      window.addEventListener('googleAuthSuccess', handleAuthSuccess);

      try {
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Fallback to renderButton if prompt fails
            this.renderButton('google-signin-button');
          }
        });
      } catch (error) {
        window.removeEventListener('googleAuthSuccess', handleAuthSuccess);
        reject(error);
      }
    });
  }

  // Render Google Sign-In button
  renderButton(elementId: string): void {
    if (!window.google) {
      console.error('Google Identity Services not loaded');
      return;
    }

    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with id '${elementId}' not found`);
      return;
    }

    window.google.accounts.id.renderButton(
      element,
      {
        theme: 'filled_black',
        size: 'large',
        type: 'standard',
        text: 'signin_with',
        shape: 'rectangular',
        width: 250
      }
    );
  }

  // Decode JWT token to get user info
  decodeToken(credential: string): GoogleUserInfo {
    try {
      const payload = credential.split('.')[1];
      const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodedPayload);
    } catch (error) {
      throw new Error('Failed to decode Google credential token');
    }
  }

  // Check if Google Identity Services is loaded
  isGoogleLoaded(): boolean {
    return typeof window !== 'undefined' && !!window.google;
  }

  // Wait for Google Identity Services to load
  waitForGoogleToLoad(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isGoogleLoaded()) {
        resolve();
        return;
      }

      let attempts = 0;
      const maxAttempts = 50; // 5 seconds timeout
      
      const checkGoogle = setInterval(() => {
        attempts++;
        
        if (this.isGoogleLoaded()) {
          clearInterval(checkGoogle);
          resolve();
        } else if (attempts >= maxAttempts) {
          clearInterval(checkGoogle);
          reject(new Error('Google Identity Services failed to load within timeout'));
        }
      }, 100);
    });
  }
}

export default new GoogleAuthService();
