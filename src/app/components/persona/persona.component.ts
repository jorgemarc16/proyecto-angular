import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { PersonaService } from '../../persona.service'

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  modalRef: BsModalRef;
  persona: Persona = new Persona();
  personas: any;
  errorMsg: ErrorMsg = new ErrorMsg(); 
  constructor(private modalService: BsModalService, private personaService: PersonaService) { }

  ngOnInit(): void {
    this.getPersona();
  }

  getPersona(){
    this.personaService.get().subscribe(res => {
      this.personas = res;
      console.log(this.personas);
    }, error => {
      console.log(error)
    })
  }

  onSave(){
    //this.errorMsg.nombre = this.errorMsg.apellido = '';
    //!this.persona.nombre ? this.errorMsg.nombre = 'Nombre requerido': '';
    //this.persona.documento ? this.errorMsg.documento = 0: '';
    this.personaService.post(this.persona).subscribe(res =>{
      this.modalRef.hide();
      console.log(res);
    }, error =>{
      console.log(error);
    })
  }

  openModalAdd(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

}

class Persona {
  documento: number;
  nombre: string;
  apellido: string;
  fecha_inicio: string;
  fecha_fin: string;
  hora_inicio: string;
  hora_fin: string;
  hora_inicio_extra: string;
  hora_fin_extra: string;

}

class ErrorMsg {
  documento: number;
  nombre: string;
  apellido: string;
  fecha_inicio: string;
  fecha_fin: string;
  hora_inicio: string;
  hora_fin: string;
  hora_inicio_extra: string;
  hora_fin_extra: string;

}


