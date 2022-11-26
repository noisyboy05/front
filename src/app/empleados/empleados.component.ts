import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../services/empleados/empleados.service';
import { EstadosService } from '../services/estados/estados.service';
import { DnisService } from '../services/dnis/dnis.service';
import { ThisReceiver } from '@angular/compiler';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleadoForm: FormGroup;
    dnis: any;
    estados: any;
    empleados: any;
  
    constructor(
      public fb: FormBuilder,
      public estadosService: EstadosService,
      public dnisService: DnisService,
      public empleadosService: EmpleadosService
    ) { 
  
    }
    ngOnInit(): void {
      this.empleadoForm = this.fb.group({
        nombre : ['', Validators.required],
        apellido : ['', Validators.required],
        sexo : ['', Validators.required],
        fnacimiento : ['', Validators.required],
        dni : ['', Validators.required],
        cedula : ['', Validators.required],
        telefono : ['', Validators.required],
        direccion : ['', Validators.required],
        correo : ['', Validators.required],
        ciudad : ['', Validators.required],
        edad : ['', Validators.required],
        estado : ['', Validators.required],
      });;
      this.dnisService.getAllDnis().subscribe(resp => {
        this.dnis = resp;
      },
      error =>{console.error(error)}
      );
  
      this.empleadosService.getAllEmpleados().subscribe(resp=>{
        this.empleados = resp;
      },
      error=>{console.error(error)}
      )

    }
    Guardar():void{
      this.empleadosService.saveEmpleado(this.empleadoForm.value).subscribe(resp=>{
        this.empleadoForm.reset();
        this.empleados.push(resp);
      },
      error=>{console.error(error)}
      )
    }
  
    Eliminar(empleado){
      this.empleadosService.deleteEmpleado(empleado.id).subscribe(resp=>{
        console.log(resp);
        if(resp == false){
          this.empleados.pop(empleado)
        }
      })
    }

}
