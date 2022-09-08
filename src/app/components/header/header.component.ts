import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() position = 'position: fixed;'
  id: string | null = '';
  username: string | undefined;

  constructor(
    private route: Router,
    private activetedRoute: ActivatedRoute,
    private authServices: AuthService
  ){}

  async ngOnInit(): Promise<void> {
    this.id = localStorage.getItem('token');
     if(this.id){
       this.authServices.getUserById(this.id).subscribe( resp =>{
         if(resp?.username !== undefined){
           this.username = resp.username
         }
         return;
       })

     }

  }

  loginValido(){
    if(this.username){
      return true
    }else{
      return false
    }
  }

  navigate(ruta: string){
    this.route.navigateByUrl(`/${ruta}`)
  }

  logOut(){
    localStorage.removeItem('token');
    if(this.activetedRoute.snapshot.url.join('') == 'eventadd'){
      this.route.navigateByUrl('/');
    }
    this.username = undefined;

  }
}
