import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SetEventsService } from 'src/app/services/events/set-events.service';
import Swal from 'sweetalert2';
import { ValidatorsService } from '../../services/validators/validators.service';



@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  position = 'position: relative;';
  fileTemp:any;
  token: string | null | undefined;



  miFormulario: FormGroup = this.formBuilder.group({
    start_date: ['',
    [
      Validators.required,
      this.validatorService.validarFechaMinima
    ]
    ],
    when: ['',
    [
      Validators.required,
    ]
    ],
    title: ['',
    [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(50)
    ]
    ],
    tipo_event: ['',
    [
      Validators.required,
    ]
    ],
    place: ['',
    [
      Validators.required,
    ]
    ],
    adress: ['',
    [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(20)
    ]
    ],
    description: ['',
    [
      Validators.required,
      Validators.min(50),
      Validators.maxLength(200)
    ]
    ],
    ticket_info: ['',
    [
      Validators.required,
      Validators.pattern('^(ftp|http|https):\/\/[^ "]+$')
    ]
    ],
    map_link: ['',
    [
      Validators.required,
      Validators.pattern('^(ftp|http|https):\/\/[^ "]+$')
    ]
    ],
    image: ['',
    [
      Validators.required,
    ]
    ],

  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private setEventService: SetEventsService,
    private validatorService: ValidatorsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    if(this.token){
      this.authService.getUserByToken(this.token)
          .subscribe(resp =>{
            if(!resp){
              this.router.navigateByUrl('/login')
            }
          })
    }
  }

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

  getFile($event: any){
    const [file] = $event.target.files;

    this.fileTemp = {
      fileRaw:file,
      fileName:file.name.replace(/\s+/g, '')
    }

  }

  async submitFormulario(){


    this.miFormulario.controls['image'].setValue('')

    const body = new FormData();
    body.append('image', this.fileTemp.fileRaw, this.fileTemp.fileName);
    body.append('when', this.miFormulario.controls['when'].value);
    body.append('title', this.miFormulario.controls['title'].value);
    body.append('tipo_event', this.miFormulario.controls['tipo_event'].value);
    body.append('place', this.miFormulario.controls['place'].value);
    body.append('adress', this.miFormulario.controls['adress'].value);
    body.append('description', this.miFormulario.controls['description'].value);
    body.append('ticket_info', this.miFormulario.controls['ticket_info'].value);
    body.append('map_link', this.miFormulario.controls['map_link'].value);
    body.append('image', this.miFormulario.controls['image'].value);
    body.append('start_date', this.miFormulario.controls['start_date'].value);
    body.append('rating', '0');
    body.append('views', '0');


    console.log(body)

    if(this.token){
      this.setEventService.eventAddForUser(body, this.token)
        .subscribe(resp => {
          if(resp){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Tu evento ha sido enviado correctamente, te avisaremos cuando este publicado',
              showConfirmButton: false,
              timer: 4000
            })
            this.miFormulario.reset();
          }
        })

    }


  }


}
