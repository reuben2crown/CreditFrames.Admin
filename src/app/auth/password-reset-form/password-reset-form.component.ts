import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, PasswordResetModel, CommonService } from '../../shared';

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.scss']
})
export class PasswordResetFormComponent implements OnInit {
  passwordResetForm: FormGroup;
  passwordResetData: PasswordResetModel;
  userId: number;
  resetCode: string;
  loading: boolean;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private authService: AuthService  ) { }

  ngOnInit(): void {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.userId = +params['UserId'] || 0;
        this.resetCode = params['ResetCode'] || null;
      });

    this.createForm();

  }

  createForm(): void {
    this.passwordResetForm = new FormGroup({
      resetCode: new FormControl(this.resetCode || null),
      userId: new FormControl(this.userId || 0),
      newPassword: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, [Validators.required, this.passwordConfirming])
    });
  }

  submitPasswordReset() {
    if (this.passwordResetForm.valid) {
      this.loading = true;
      this.commonService.showLoading();
      this.passwordResetData = this.passwordResetForm.value;
      this.authService.completePasswordReset(this.passwordResetData).subscribe(response => {
        if (response && response.status) {
          this.commonService.showToastSuccess(response.message);
          this.router.navigate(['/login']);
        } else {
          this.commonService.showToastError(response.message);
        }
        this.loading = false;
        this.commonService.hideLoading();
      }, error => {
        this.loading = false;
        this.commonService.handleError(error);
      });
    } else {
      this.commonService.checkFormValidation(this.passwordResetForm);
      this.commonService.showToastWarning('Please check the form for error');
    }
  }

  passwordConfirming(c: AbstractControl): any {
    if (!c.parent || !c) { return; }
    const pwd = c.parent.get('newPassword');
    const cpwd = c.parent.get('confirmPassword');

    if (!pwd || !cpwd) { return; }
    if (pwd.value !== cpwd.value) {
      return { mustMatch: true, invalid: true };
    }
  }

  get form(): any { return this.passwordResetForm.controls; }
}
