import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { EventHelper } from '../../common/event-helper';
import { IdleTimeoutComponent } from './idle-timeout.component';

@Injectable({
  providedIn: 'root'
})
export class IdleTimeoutService {
  // lastPing?: Date = null;
  public modalRef: NgbModalRef;

  constructor(private idle: Idle, private modalService: NgbModal, private ievent: EventHelper) { //private keepalive: Keepalive, 

  }

  initiate(idleTimeInSeconds: number = 300, timeoutCountdownInSeconds: number = 60) { //, pingFunction: Function = null
    // sets an idle timeout of 5 seconds, for testing purposes.
    this.idle.setIdle(idleTimeInSeconds);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(timeoutCountdownInSeconds);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    
    this.idle.onIdleStart.subscribe(() => {
      this.modalRef = this.modalService.open(IdleTimeoutComponent, { backdrop: 'static' }); //, class: 'modal-sm'
    });

    this.idle.onIdleEnd.subscribe(() => {
      // this.idle.watch();
    });
    
    this.idle.onTimeout.subscribe(() => {
      this.modalRef.close();
      this.ievent.loginEvent.emit(false); //new EventModel('logout')
    });
    
    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.modalRef.componentInstance.idleState = 'You will logged out in ' + countdown + ' seconds!'
    });

    // sets the ping interval to 15 seconds
    // this.keepalive.interval(15);
    // this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
  }

  start(){
    this.idle.watch();
  }

  stop(){
    this.idle.stop();
  }

  close(){
    if (this.modalRef) {
      this.modalRef.dismiss();
    }
  }
}
