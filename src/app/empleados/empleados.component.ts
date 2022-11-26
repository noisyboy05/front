import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../services/empleados/empleados.service';
import { EstadosService } from '../services/estados/estados.service';
import { DnisService } from '../services/dnis/dnis.service';
import { HorariosService } from '../services/horario/horarios.service';
import { ContratosService } from '../services/contratos/contratos.service';
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
    contratos:any;
    horarios:any;
  
    constructor(
      public fb: FormBuilder,
      public estadosService: EstadosService,
      public dnisService: DnisService,
      public empleadosService: EmpleadosService,
      public horariosService: HorariosService,
      public contratosService: ContratosService,
    ) { 
  
    }
    ngOnInit(): void {
      this.empleadoForm = this.fb.group({
        empresa : ['', Validators.required],
        area : ['', Validators.required],
        cargo : ['', Validators.required],
        fcha_contratacion : ['', Validators.required],
        fcha_inicio : ['', Validators.required],
        fcha_fin : ['', Validators.required],
        correo_corp : ['', Validators.required],
        salario : ['', Validators.required],
        dni : ['', Validators.required],
        id_tipo_cont : ['', Validators.required],
        id_horario : ['', Validators.required],
      });;

      this.estadosService.getAllEstados().subscribe(resp => {
        this.estados = resp;
      },
      error =>{console.error(error)}
      );
  

      this.dnisService.getAllDnis().subscribe(resp => {
        this.dnis = resp;
      },
      error =>{console.error(error)}
      );

      this.horariosService.getAllHorarios().subscribe(resp => {
        this.horarios = resp;
      },
      error =>{console.error(error)}
      );

      this.contratosService.getAllContratos().subscribe(resp => {
        this.contratos = resp;
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
