import { firstValueFrom } from 'rxjs';
import { AtelierService } from './../../services/atelier.service';
import { ClientService } from './../../services/client.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, EmptyError, Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';
import { Options } from '@angular-slider/ngx-slider';
import { HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

const EMPTY_reparation: any = {
  // _id:undefined,
  titre: '',
  description: '',
  // debut : '',
  // fin : '',
  prix : 0,
  // _carId: '',
  avancement: 0,
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
  options: Options = {
    floor: 0,
    ceil: 100,
  };

  optionsDesable: Options = {
    floor: 0,
    ceil: 100,
    disabled : true
  };

  // downloadedFile:Blob;
  // downloadedFileSubject: BehaviorSubject<Blob>;
  // downloadedFile$: Observable<Blob>;
  
  // fileSrc :any;
  // fileSrcSubject: BehaviorSubject<String>;
  // fileSrc$: Observable<String>;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private atelierService:AtelierService,
    private sanitizer : DomSanitizer
    ) {
      // this.downloadedFileSubject  =new BehaviorSubject<Blob>(this.downloadedFile);
      // this.downloadedFile$ = this.downloadedFileSubject.asObservable();
      // this.downloadedFile=null;

      // this.fileSrcSubject  =new BehaviorSubject<String>(this.fileSrc);
      // this.fileSrc$ = this.fileSrcSubject.asObservable();
    }

    ngOnInit(): void {
      this.loadReparation();
    }

    // public download(fileName:string) {
    //   this.atelierService.getFacture().subscribe(
    //     data => {
    //       switch (data.type) {
    //         case HttpEventType.Response:
    //           this.downloadedFile = new Blob([data.body], { type: data.body.type });
    //           if(this.downloadedFile.type=='application/x-zip-compressed'){
    //             const a = document.createElement('a');
    //             a.setAttribute('style', 'display:none;');
    //             document.body.appendChild(a);
    //             a.download = "Facture.pdf";
    //             a.href = URL.createObjectURL(this.downloadedFile);
    //             a.target = '_blank';
    //             a.click();
    //             document.body.removeChild(a);
    //           }
    //           if(this.downloadedFile.type=='application/pdf'){
    //             this.fileSrc = URL.createObjectURL(this.downloadedFile);
    //             this.fileSrcSubject.next(this.fileSrc);
    //             this.fileSrc$ = this.fileSrcSubject.asObservable();
    //             this.downloadedFileSubject.next(this.downloadedFile);
    //             this.downloadedFile$ = this.downloadedFileSubject.asObservable();
    //           }
    //           else {
    //             this.fileSrc = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.downloadedFile));
    //             this.fileSrcSubject.next(this.fileSrc);
    //             this.fileSrc$ = this.fileSrcSubject.asObservable();
    //             this.downloadedFileSubject.next(this.downloadedFile);
    //             this.downloadedFile$ = this.downloadedFileSubject.asObservable();
    //           }          
    //           break;
    //       }
    //     },
    //     error => {
    //       // this.downloadStatus.emit( {status: ProgressStatusEnum.ERROR});
    //     }
    //   );
    //   console.log('tafa = '+fileName);
    // }

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
