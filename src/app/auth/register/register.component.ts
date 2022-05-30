import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this._fb.group({// 3º Paso [Formulario Reactivo]
    name: ['', Validators.required],
    email: ['', [ Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terms: [false, Validators.required]
  });

  constructor(private _fb: FormBuilder) { }// 2º Paso [Formulario Reactivo]

  ngOnInit(): void {
  }

  public register(): void {
    this.formSubmitted = true;

    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      console.log('Formulario válido');
    } else {
      console.log('Formulario no válido');
    }

  }

  public isNotValid(name: string): boolean {
    if (this.registerForm.get(name).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  public acceptTerms(name: string): boolean {
    return !this.registerForm.get(name).value && this.formSubmitted;
  }

}
