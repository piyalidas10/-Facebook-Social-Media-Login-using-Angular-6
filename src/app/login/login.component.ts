import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
declare var window: any;
declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public uname: string;
  public uid: string;
  returnUrl: string;
  loginWith: string;
  userObj: any = { id: null, name: null, accessToken: null, image: null };
  public BASE_URL = 'http://localhost:4200/';
  public API_ENDPOINT = 'http://localhost:4200/';
  public SOCIAL_CONFIG = {
    'facebook': {
      'authEndpoint': this.API_ENDPOINT,
      'clientId': '375626606356713',
      'redirectURI': this.BASE_URL + 'home'
    }
  };

  constructor(private router: Router, public authService: AuthService, private zone: NgZone) {
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '375626606356713',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      // tslint:disable-next-line:prefer-const
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  ngOnInit() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
    // reset login status
    this.authService.logout();
  }

  facebookLogin() {
    const self = this;
    FB.login(function (response) {
      console.log(response);
      if (response.authResponse) {
        if (response.status === 'connected') {
          FB.api('/me?fields=id,name', function (profile) {
            console.log('Profile ------------> ', profile);
            if (profile !== null) {
              self.userObj.id = profile.id;
              self.userObj.name = profile.name;
              self.userObj.accessToken = response.authResponse.accessToken;
              self.userObj.image = 'https://graph.facebook.com/' + profile.id + '/picture?type=normal';
              self.fbContinue();
            }
          }
          );
        }
      } else {
        console.log('User login failed');
      }
    }, { scope: 'public_profile', return_scopes: true });
  }

  fbContinue() {

    const self = this;
    console.log('FB continue----------------', this.userObj);
    localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userdata', JSON.stringify(this.userObj));
        this.zone.run(() => self.router.navigate(['/home']));
  }

}
