import { Injectable, EventEmitter } from "@angular/core";
import { AuthTokenModel } from "../models/user-model";

@Injectable({
  providedIn: "root"
})
export class EventHelper {
  public loginEvent: EventEmitter<boolean>;
  public userEvent: EventEmitter<boolean>;
  public actionEvent: EventEmitter<{type: string, data?: any}>;
  public feedbackEvent: EventEmitter<AuthTokenModel>;

  constructor() {
    this.loginEvent = new EventEmitter();
    this.userEvent = new EventEmitter();
    this.actionEvent = new EventEmitter();
    this.feedbackEvent = new EventEmitter();
  }
}
