import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Idle } from '@ng-idle/core';
import { EventHelper } from '../../common/event-helper';

@Component({
  selector: 'app-idle-timeout',
  templateUrl: './idle-timeout.component.html',
  styleUrls: ['./idle-timeout.component.scss']
})
export class IdleTimeoutComponent implements OnInit {
  @Input() title: string = 'You Have Been Idle!';
  @Input() idleState: string;

  constructor(private idle: Idle, public modalRef: NgbActiveModal, private ievent: EventHelper) { }

  ngOnInit(): void {
  }

  stay() {
    this.modalRef.close();
    this.idle.watch();
  }

  logout() {
    this.modalRef.close();
    this.ievent.loginEvent.emit(false);
  }
}
