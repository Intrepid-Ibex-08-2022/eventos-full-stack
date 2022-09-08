import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  position = 'position: relative;';
  date = new Date();
  min_star_date: string = `${this.date.getDate().toString()}-${(this.date.getMonth() +1)}-${this.date.getFullYear()}`


  miFormulario: FormGroup = this.formBuilder.group({
    start_date: ['',
    [
      Validators.required,
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
    ]
    ],
    description: ['',
    [
      Validators.required,
      Validators.min(50),
      Validators.max(200)
    ]
    ],
    ticket_info: [''
    ],
    map_link: ['',
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
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')
    if(token){
      this.authService.validateLogued(token)
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

  async submitFormulario(){
    let imagen = document.getElementById('inputGroupFile01')
    console.log(imagen)
    console.log(this.miFormulario.value)
  }


}
