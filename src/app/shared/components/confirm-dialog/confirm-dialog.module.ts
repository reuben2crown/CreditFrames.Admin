import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogService } from './confirm-dialog.service';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    NgbModule,
  ],
  providers: [ConfirmDialogService],
  entryComponents: [ConfirmDialogComponent]
})
export class ConfirmDialogModule { }
