import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  position = 'position: relative;';

  /* miFormulario: FormGroup = this.formBuilder.group({
      nombre: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(6),
          Validators.pattern( this.authServices.nombrePattern )
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
      ]
    }); */

  constructor(
    
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  /* get emailErrorMsg (): string {
    const emailError = this.miFormulario.controls['correo'].errors;
    const emailValue = this.miFormulario.controls['correo'].value;
    console.log(emailError);
    console.log(emailValue);

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

  submitFormulario(){
    console.log(this.miFormulario.value);
    const {nombre,correo,password} = this.miFormulario.value;

     this.authServices.register(nombre,correo,password)
    .subscribe( resp => {
      if(resp === true){
        this.router.navigateByUrl('/');
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: resp,
        })
      }
    }); ∫

    this.miFormulario.markAllAsTouched();
  } */
}