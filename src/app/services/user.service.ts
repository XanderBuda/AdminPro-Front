import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient,
    private _router: Router) { }

  public logout(): void {
    localStorage.removeItem('token');
    this._router.navigateByUrl('/login')
  }

  public validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this._http.get(`${base_url}/auth/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError((err) => of(false))
    );
  }

  public registerUser(formData: RegisterForm) {

    return this._http.post(`${base_url}/users`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        })
      );

  }

  public login(formData: LoginForm) {

    return this._http.post(`${base_url}/auth/login`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        })
      );

  }
}
