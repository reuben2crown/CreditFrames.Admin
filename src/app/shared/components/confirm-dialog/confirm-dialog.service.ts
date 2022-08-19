import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private modalService: NgbModal) { }

  confirm(title?: string, message?: string, buttonText?: string): Observable<boolean> {
    const modalRef = this.modalService.open(ConfirmDialogComponent, { backdrop: 'static' }); //, size: 'sm' 
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.buttonText = buttonText;
    return from(modalRef.result).pipe(
      catchError(err => {
        console.warn(err);
        return of(undefined);
      })
    );
  }
}
