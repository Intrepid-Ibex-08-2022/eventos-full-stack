import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    private authServices: AuthService
  ){}

  async ngOnInit(): Promise<void> {
    this.id = localStorage.getItem('token');
     if(this.id){
       (await this.authServices.loginId(this.id)).subscribe( resp =>{
         if(resp !== undefined){
           this.username = resp
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
    this.router.navigateByUrl(`/${ruta}`)
  }

  logOut(){
    localStorage.removeItem('token');
    this.username = undefined;

  }
}
