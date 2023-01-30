import { ClientService } from 'app/services/client.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmptyError, of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';
import { Options } from '@angular-slider/ngx-slider';
import { AtelierService } from 'app/services/atelier.service';

@Component({
  selector: 'app-reparation',
  templateUrl: './reparation.component.html',
  styleUrls: ['./reparation.component.scss']
})
export class ReparationComponent implements OnInit {

  @Input() reparation: any;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  options: Options = {
    floor: 0,
    ceil: 100,
  };

  optionsDesable: Options = {
    floor: 0,
    ceil: 100,
    disabled : true
  };
  
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private clientService:ClientService,
    private atelierService:AtelierService
    ) {}

    ngOnInit(): void { }

    payer() {
      
    }

    getFacture(idReparation : any) {
      let factureData;
      this.atelierService.getFactureData(idReparation).subscribe((data: any) => {
        factureData = data;
        console.log(data);
        this.atelierService.getFacture(factureData).subscribe((data: any) => {
            const blob = new Blob([data], {type: 'application/pdf'});
            var downloadURL = window.URL.createObjectURL(data);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = "Facture.pdf";
            link.click();
          })
      })
    }
}
