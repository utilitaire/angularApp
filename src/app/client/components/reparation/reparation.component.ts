import { ClientService } from 'app/services/client.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmptyError, of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';
import { Options } from '@angular-slider/ngx-slider';

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
    ) {}

    ngOnInit(): void { }

    payer() {
      
    }
}
