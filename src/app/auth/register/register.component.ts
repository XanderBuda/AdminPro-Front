import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2' // Paquete para mostrar alertas

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this._fb.group({// 3º Paso [Formulario Reactivo]
    name: ['Alex', Validators.required],
    email: ['test@gmail.com', [Validators.required, Validators.email]],
    password: ['1234567', Validators.required],
    password2: ['1234567', Validators.required],
    terms: [true, Validators.required]
  }, {
    validators: this._checkPasswords('password', 'password2')
  });

  constructor(private _fb: FormBuilder,// 2º Paso [Formulario Reactivo]
    private userSerivice: UserService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  public register(): void {
    this.formSubmitted = true;
    console.log(this.registerForm);

    if (this.registerForm.invalid) {
      return;
    }

    this.userSerivice.registerUser(this.registerForm.value)
      .subscribe(resp => {

        this._router.navigate(['/']);
        
      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');

        console.warn(err.error.msg)

      });

  }

  public isNotValid(name: string): boolean {
    if (this.registerForm.get(name).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  public isNotValidPassword(pass1: string, pass2: string): boolean {

    const password = this.registerForm.get(pass1).value;
    const password2 = this.registerForm.get(pass2).value;

    if ((password !== password2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

  public acceptTerms(name: string): boolean {
    return !this.registerForm.get(name).value && this.formSubmitted;
  }

  private _checkPasswords(pass1: string, pass2: string): Function {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ notEquivalent: true });
      }

    }

  }

}
