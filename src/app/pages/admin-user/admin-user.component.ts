
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Rol } from 'src/app/interface/rols';
import { User, UsersResponse } from 'src/app/interface/users';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SetEventsService } from 'src/app/services/events/set-events.service';
import { ValidatorsService } from 'src/app/services/validators/validators.service';
import Swal from 'sweetalert2';

export interface UserInfo {
  item: string;
  value: String;
}
const ELEMENT_DATA: UserInfo[] = [
  { item: 'Username:', value: '' },
  { item: 'Email:', value: '' },
  { item: 'Rol:', value: '' },
]
@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  position = 'position: relative;';
  token: string | null | undefined;
  users: User[] = [];
  user!: User;
  roles: Rol[] = [];
  email!: String;
  rol!: String;
  displayedColumns: string[] = ['item', 'value'];
  dataSource = ELEMENT_DATA;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private setEventService: SetEventsService,
    private validatorService: ValidatorsService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.token = localStorage.getItem('token')

    this.cargarUsuarios();
    this.cargarRoles();
    if(this.token){
      (await this.authService.getUserByToken(this.token))
          .subscribe(user =>{
            if(!user){
              this.router.navigateByUrl('/login')
            }
          })
    }


  }

  miFormulario: FormGroup = this.formBuilder.group({
    username: ['',[Validators.required]],
    rol: ['',[Validators.required]]

  });

  campoValido( campo: string){
    return this.miFormulario.controls[campo]?.errors && this.miFormulario.controls[campo]?.touched;
  }

  get fechaErrorMsg(){
    const fechaError = this.miFormulario.controls['start_date'].errors;
    if(fechaError?.['required']){
      return 'El fecha de inicio es obligatorio'
    }
    else if (fechaError?.['errorFecha']){
      return 'No puedes elegir una fecha anterior al dia de hoy'
    }
    return ''
  }

  async cargarUsuarios(){
    if(this.token){
     this.authService.getAllUsers(this.token).subscribe(resp => {
        if(resp){
          this.users = resp
          console.log(this.users)
        }
      })
    }
  }

  async cargarRoles(){
    if(this.token){
      this.authService.getAllRols(this.token).subscribe(resp => {
        if(resp){
          this.roles = resp
          console.log(this.roles)
        }
      })
    }
  }

  capturar(combo: string){
    if(combo === 'user'){
      this.users.forEach(resp => {
        if(resp.email == this.email && this.token){
          this.authService.getOneRol(resp.rol[0], this.token).subscribe(rolResponse => {
            if(rolResponse){
            console.log(rolResponse)
            ELEMENT_DATA[0].value = resp.username;
            ELEMENT_DATA[1].value = resp.email;
            ELEMENT_DATA[2].value = rolResponse.rol;
            }
          })
          this.user = resp;
        }
      })
    }else if(combo === 'rol'){
      this.roles.forEach(resp => {
        if(resp._id == this.rol){
          console.log(resp)
        }
      })
    }
  }

  async submitFormulario(){

    const body = new FormData();
    body.append('username', this.miFormulario.controls['username'].value);
    body.append('rol', this.miFormulario.controls['rol'].value);


    if(this.token){
      this.authService.updateUserRol(this.email, this.rol, this.token)
        .subscribe((resp: any) => {
          if(resp){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El rol del usuario ha sido actualizado',
              showConfirmButton: false,
              timer: 4000
            })
            this.miFormulario.reset();
          }
        })

    }


  }

}
