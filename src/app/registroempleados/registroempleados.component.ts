import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../services/empleados/empleados.service';
import { EstadosService } from '../services/estados/estados.service';
import { DnisService } from '../services/dnis/dnis.service';
import { ThisReceiver } from '@angular/compiler';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-registroempleados',
  templateUrl: './registroempleados.component.html',
  styleUrls: ['./registroempleados.component.css']
})
export class RegistroempleadosComponent implements OnInit {

    isShown: boolean = false ;
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
        this.empleados = this.empleados.filter(empleado => resp.id != empleado.id);
        this.empleados.push(resp);
        this.isShown = ! this.isShown;
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
  
    Editar(empleado){
      this.isShown = ! this.isShown;
      this.empleadoForm.setValue({
        id: empleado.id,
        nombre : empleado.nombre,
        apellido : empleado.apellido,
        cedula : empleado.cedula,
        edad : empleado.edad,
        dni : empleado.dni,
        estado : empleado.estado
        //Hace falta variables
      })
    }

}
