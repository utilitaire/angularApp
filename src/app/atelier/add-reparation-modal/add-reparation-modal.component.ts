import { AtelierService } from './../../services/atelier.service';
import { ClientService } from './../../services/client.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmptyError, of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';
const EMPTY_reparation: any = {
  // _id:undefined,
  titre: '',
  description: '',
  // debut : '',
  // fin : '',
  prix : 0,
  // _carId: '',
  // avancement: 0,
  // completed: false,
  // state: 0,
};

@Component({
  selector: 'app-add-reparation-modal',
  templateUrl: './add-reparation-modal.component.html',
  styleUrls: ['./add-reparation-modal.component.scss'],
})
export class AddReparationModalComponent implements OnInit {

  @Input() idVoiture: string;
  @Input() Rep: any;
  reparation: any;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private atelierService:AtelierService,
    ) {}

    ngOnInit(): void {
      this.loadReparation();
    }

    save() {
      this.preparereparation();
      if (this.reparation._id) {
        this.edit();
        console.log("EDIT");
      } else {
        this.create();
        console.log("NEW");
      }
    }
  

    loadReparation() {
      if (!this.Rep) {
        this.reparation = EMPTY_reparation;
        this.loadForm();
      } else {
        this.reparation = this.Rep;
        this.loadForm();
      }
    }

    edit() {
      console.log(this.reparation)
      const sbCreate = this.atelierService.updateReparation(this.reparation).pipe( 
        tap(() => {
          this.modal.close();
        }),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(this.reparation);
        }),
      ).subscribe((res: any) => this.reparation = res);
      this.subscriptions.push(sbCreate);
    }

    create() {
      console.log(this.reparation)
      const sbCreate = this.atelierService.addreparation(this.reparation,this.idVoiture).pipe( 
        tap(() => {
          this.modal.close();
        }),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(this.reparation);
        }),
      ).subscribe((res: any) => this.reparation = res);
      this.subscriptions.push(sbCreate);
    }

    loadForm() {
      this.formGroup = this.fb.group({
        titre: [this.reparation.titre],
        description: [this.reparation.description],
        // debut : [this.reparation.debut],
        // fin : [this.reparation.fin],
        prix : [this.reparation.prix],
        // avancement: [this.reparation.titre],
        // completed: [this.reparation.titre],
        // state: [this.reparation.titre],
      });
    }

    private preparereparation() {
      const formData = this.formGroup.value;
      this.reparation.titre = formData.titre;
      this.reparation.description = formData.description;
      // this.reparation.debut = formData.debut;
      // this.reparation.fin = formData.fin;
      this.reparation.prix = formData.prix;
      this.reparation._carId = this.idVoiture;
      // this.reparation.avancement = formData.avancement;
    }
}
