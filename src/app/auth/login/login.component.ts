import Swal from 'sweetalert2' // Paquete para mostrar alertas

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { UserService } from '../../services/user.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public auth2: any;

  public loginForm: FormGroup = this._fb.group({
    email: [localStorage.getItem('email') || '', Validators.required],
    password: ['', Validators.required],
    remember: [localStorage.getItem('remember') === 'true' ? true : false]
  });

  constructor(private _router: Router,
    private _fb: FormBuilder,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.renderButton();
  }

  public login(): void {

    console.log(this.loginForm.value);

    this._userService.login(this.loginForm.value)
      .subscribe(resp => {

        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value)
          localStorage.setItem('remember', 'true')
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('remember');
        }

        this._router.navigate(['/']);
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      })

    // this._router.navigateByUrl('/');
  }

  // public onSuccess(googleUser) {
  //   console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  // }

  // public onFailure(error) {
  //   console.log(error);
  // }

  public renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      // 'onsuccess': this.onSuccess,
      // 'onfailure': this.onFailure
    });

    this.startApp();
  }

  public startApp() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '233622656484-9ukv7gletk86sub2iau5vk2fqckvhfd8.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',

      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token
        console.log(id_token);
       
      }, function (error) {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
