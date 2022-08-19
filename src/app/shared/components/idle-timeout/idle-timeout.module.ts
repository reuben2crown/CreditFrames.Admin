import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdleTimeoutComponent } from './idle-timeout.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { IdleTimeoutService } from './idle-timeout.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [IdleTimeoutComponent],
  providers: [IdleTimeoutService],
  imports: [
    CommonModule,
    NgbModule,
    // NgIdleModule.forRoot(),
    NgIdleKeepaliveModule.forRoot()
  ],
  entryComponents: [IdleTimeoutComponent]
})
export class IdleTimeoutModule { }
