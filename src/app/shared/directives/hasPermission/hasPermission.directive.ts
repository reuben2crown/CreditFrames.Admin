import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthUserData } from '../../common/auth-data';

@Directive({
    selector: '[appHasPermission]'
})

export class HasPermissionDirective implements OnInit, OnDestroy {

    @Input() appHasPermission: string;

    private onDestroy$ = new Subject<boolean>();

    constructor(private userData: AuthUserData, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {
    }

    ngOnInit() {
        if (!this.appHasPermission) {
            this.viewContainer.clear();
        } else {
            var permissionItems = this.appHasPermission.split(',') || [];
            
            // if (!permissionItems) {
            //     this.viewContainer.createEmbeddedView(this.templateRef);
            // } else 
            if (permissionItems.some(r => (this.userData.getPermissions() || []).includes(r.trim()))) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
        }
    }

    ngOnDestroy() {
        if (this.onDestroy$) {
            this.onDestroy$.next(true);
            this.onDestroy$.unsubscribe();
        }
    }
}
