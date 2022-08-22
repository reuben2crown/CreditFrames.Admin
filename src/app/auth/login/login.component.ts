import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { AccountTypeEnum, AuthService, AuthUserData, ChannelEnum, CommonService, ForgotPasswordModel, LoginModel } from '../../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData: LoginModel;
  forgotPassword: ForgotPasswordModel;
  loginForm: FormGroup;
  returnUrl: string;
  submitted: boolean;
  recoveryForm: FormGroup;
  recoveryFormData: ForgotPasswordModel;
  showRecoveryForm: boolean;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  captchaCode: any;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    public authData: AuthUserData,
    public commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authData.logout();
    this.createForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      emailAddress: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      captcha: [null],
      rememberMe: [false],
      loginChannel: [ChannelEnum.Admin],
    });

    this.recoveryForm = this.fb.group({
      emailAddress: [null, [Validators.required, Validators.email]],
      captcha: [null]
    });
  }

  getCaptcha(e: MouseEvent): void {
    this.captchaCode = null;
    e.preventDefault();
    this.captchaCode = this.commonService.getCaptcha(6);
  }

  toggleRecovery() {
    this.captchaCode = null;
    this.showRecoveryForm = !this.showRecoveryForm;
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.formData = this.loginForm.value;

      if (!(this.loginForm.value.captcha) || this.loginForm.value.captcha != this.captchaCode) {
        this.commonService.showToastWarning('Invalid captcha');
        return;
      }
      this.submitted = true;
      this.commonService.showLoading();
      this.authService.login(this.formData).subscribe((response) => {
        if (response) {
          this.commonService.hideLoading();
          if (response.status) {
            this.authData.saveLogin(response.data);
            const user = this.authData.getUserData();
            this.loginForm.patchValue({captcha: null}, {onlySelf: true});
            this.captchaCode = null;
            if (user && user.accountType.toString().toLowerCase() != AccountTypeEnum.admin.toString().toLowerCase()) {
              this.commonService.showToastError('Your account is not authorized to access this section');
              setTimeout(() => {
                this.authData.logout();
                window.location.href = '/login';
              }, 1);
            } else {
              this.commonService.showToastSuccess(response.message);
              this.router.navigate([this.returnUrl]).then(() => window.location.reload());
            }
          } else {
            this.commonService.showToastError(response.message);
          }
        }
        this.submitted = false;
      },
        (error) => {
          this.submitted = false;
          this.commonService.hideLoading();
          this.commonService.handleError(error);
        }
      );
    } else {
      this.commonService.showToastWarning(
        'Please enter your email address and password to continue'
      );
    }
  }

  submitForgotPassword() {
    if (this.recoveryForm.valid) {
      if (!(this.recoveryForm.value.captcha) || this.recoveryForm.value.captcha != this.captchaCode) {
        this.commonService.showToastWarning('Invalid captcha');
        return;
      }
      this.submitted = true;
      this.commonService.showLoading();
      this.recoveryFormData = this.recoveryForm.value;
      this.authService.forgotPassword(this.recoveryFormData).subscribe(response => {
        if (response) {
          if (response.status) {
            this.commonService.showToastSuccess(response.message);
            this.showRecoveryForm = false;
            this.recoveryForm.patchValue({captcha: null}, {onlySelf: true});
            this.captchaCode = null;
          } else {
            this.commonService.showToastError(response.message);
          }
        }
        this.commonService.hideLoading();
        this.submitted = false;
      }, error => {
        this.submitted = false;
        this.commonService.handleError(error);
      });
    }
  }
}
