import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private _token: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      let resp:Observable<string | undefined | boolean>;
      this.verificaLocalStorage()

      if(this._token){
        resp = this.authService.getUserByToken(this._token)
          .pipe(
            tap( userlogued => {
              if(!userlogued){
                this.router.navigateByUrl('/login')
              }
            })
          );
      }
      return true
  }


  verificaLocalStorage(): string | undefined{
    const token = localStorage.getItem('token')
    if(token){
      this._token = token
      return
    }
    return;
  }
}
