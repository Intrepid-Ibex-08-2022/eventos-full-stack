import { Component } from '@angular/core';
import {  AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent {
  position = 'position: relative;';
  password = '';

  miFormulario: FormGroup = this.formBuilder.group({
      nombre: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(8),
        ]
      ],
      correo: ['',
        [
          Validators.required,
          Validators.pattern( this.authServices.emailPattern )
        ],
        [
          this.authServices
        ]
      ],
      password: ['',[
          Validators.required,
          Validators.minLength(6),
        ]
      ],
      password2: ['',[
          Validators.required,
          Validators.minLength(6),
        ]
      ]
      },
      {
        validator: this.confirmPassword
      }
);

  constructor(
    private formBuilder: FormBuilder,
    private authServices: AuthService,
    private router: Router
  ) { }

  get emailErrorMsg (): string {
    const emailError = this.miFormulario.controls['correo'].errors;
    const emailValue = this.miFormulario.controls['correo'].value;

    if(emailError?.['required']){
      return 'El correo es obligatorio'
    }
    else if (emailError?.['pattern']){
      return `${emailValue} No es un formato de correo valido`
    }
    else if (emailError?.['emailTomado']){
      return 'Este email ya se encuentra registrado'
    }
    return ''
  }

  campoValido( campo: string){

    return this.miFormulario.controls[campo]?.errors && this.miFormulario.controls[campo]?.touched;
  }

  confirmPassword(control: AbstractControl) {
    const password = control.get('password')?.value
    const password2 = control.get('password2')?.value;

    if(password !== password2){
      control.get('password2')?.setErrors({confirmError: true})
    }
  }

  async submitFormulario(){

    const {nombre,correo,password} = this.miFormulario.value;
    (await this.authServices.register(nombre, correo, password))
      .subscribe( resp => {
        if(resp === true){
          this.router.navigateByUrl('');
        }else{
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: resp,
          // })
        }
      });
  }
}
