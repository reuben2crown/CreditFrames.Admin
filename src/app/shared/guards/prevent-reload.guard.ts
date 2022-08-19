// import { CommonModule } from "@angular/common";
// import {HostListener, Injectable, NgModule} from "@angular/core";
// import { CanDeactivate } from "@angular/router";

// export abstract class PreventReloadComponent {
//   abstract canDeactivate(): boolean;

//     @HostListener('window:beforeunload', ['$event'])
//     unloadNotification($event: any) {
//         if (!this.canDeactivate()) {
//             $event.returnValue =true;
//         }
//     }
// }

// @Injectable()
// export class CanDeactivateGuard implements CanDeactivate<PreventReloadComponent> {
//   canDeactivate(component: PreventReloadComponent): boolean {
   
//     if(!component.canDeactivate()){
//         if (confirm("You have unsaved changes! If you leave, your changes will be lost.")) {
//             return true;
//         } else {
//             return false;
//         }
//     }
//     return true;
//   }
// }

// @NgModule({
//     declarations: [PreventReloadComponent],
//     imports: [
//       CommonModule
//     ],
//     entryComponents: [PreventReloadComponent]
//   })
//   export class PreventReloadModule { }