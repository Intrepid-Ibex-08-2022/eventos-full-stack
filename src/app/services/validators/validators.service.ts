import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }


  validarFechaMinima(fecha: AbstractControl){

    let fechaSeleccionada = new Date(fecha.value).getTime();
    let fechaActual = new Date().getTime()-1;

    if(fechaSeleccionada < fechaActual){
      return{errorFecha: true}
    }
    return

  }
}
