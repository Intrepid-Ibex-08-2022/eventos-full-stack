import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SetEventsService } from 'src/app/services/events/set-events.service';



@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  position = 'position: relative;';
  date = new Date();
  fileTemp:any;
  token: string | null | undefined;
  min_star_date: string = `${this.date.getDate().toString()}-${(this.date.getMonth() +1)}-${this.date.getFullYear()}`


  miFormulario: FormGroup = this.formBuilder.group({
    start_date: ['',
    [
      Validators.required,
    ]
    ],
    when: ['10:34',
    [
      Validators.required,
    ]
    ],
    title: ['vdssadjcvashdajksb',
    [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(50)
    ]
    ],
    tipo_event: ['Visita',
    [
      Validators.required,
    ]
    ],
    place: ['Teror',
    [
      Validators.required,
    ]
    ],
    adress: ['sdsdvsadvsdvsd',
    [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(20)
    ]
    ],
    description: ['kdhvskjdhbsakjdbaskjdbcaskdjbcaskdjbcaklsdbckasjdbksjdbksbjksbsbd',
    [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(200)
    ]
    ],
    ticket_info: ['adasda',
    [
      Validators.required
    ]
    ],
    map_link: ['skjgaskjdcasjkd',
    [
      Validators.required,
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    if(this.token){
      this.authService.validateLogued(this.token)
          .subscribe(resp =>{
            if(!resp){
              this.router.navigateByUrl('/login')
            }
          })
    }
    console.log(this.min_star_date)

  }

  campoValido( campo: string){

    return this.miFormulario.controls[campo]?.errors && this.miFormulario.controls[campo]?.touched;
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


    console.log(body)

    if(this.token){
      this.setEventService.eventAddForUser(body, this.token)
        .subscribe(resp => console.log(resp))

    }


  }


}
