import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  position = 'position: relative;';
  authError: boolean = false;

  miFormulario: FormGroup = this.formBuilder.group({
      correo: ['',
        [
          Validators.required,
          Validators.pattern( this.authServices.emailPattern )
        ]
      ],
      password: ['',[
          Validators.required,
          Validators.minLength(6),
        ]
      ]
    });

  constructor(
    private formBuilder: FormBuilder,
    private authServices: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


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
      return 'Este email no se encuentra registrado'
    }
    return ''
  }

  campoValido( campo: string){

    return this.miFormulario.controls[campo]?.errors && this.miFormulario.controls[campo]?.touched;
  }

  async submitFormulario(){
    const {correo,password} = this.miFormulario.value;

    (await this.authServices.login(correo, password)).subscribe(resp =>{
      if(resp !== undefined){
        this.authError = false;
        this.router.navigateByUrl('');
      }
      this.authError = true

    })

    this.miFormulario.markAllAsTouched();
  }
}
