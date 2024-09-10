import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ShareService } from '../../core/service/share.service'
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/api/api.service';
import { AuthService } from 'src/app/core/service/auth.service';
export interface Login {
  username: string | null;
  password: string;
}
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  error = '';
  hide = true;
  message: string = "";
  logo: string
  img: string
  loading = false
  getVar
  userInfo: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private shared: ShareService,
    private spinner: NgxSpinnerService,

  ) { }

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Login',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'accent',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    buttonIcon: {
      fontIcon: 'login',
    },
  };

  ngOnInit() {
    this.shared.clientLogo.subscribe((image) => (this.img = image))
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.shared.messageSource.subscribe((message) => (this.message = message))
    this.shared.logoSouce.subscribe((logo) => (this.logo = logo))
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      this.userInfo = JSON.parse(localStorage.getItem('currentUser'))
      console.log('trying to reach dashboard', this.userInfo.user.role_name)
      this.router.navigate(['/admin/dashboard/main'])
    }
  }
  get f() {
    return this.authForm.controls;
  }

  onSubmit(event) {
    this.submitted = true;
    this.spinnerButtonOptions.active = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username or password not correct!';
      this.spinnerButtonOptions.active = false;
      this.loading = false;
    }
    this.loading = true;
    this.spinner.show();
    this.apiService.login(this.f.username.value, this.f.password.value).subscribe((data) => {
      localStorage.setItem('currentUser', JSON.stringify(data));
      if (window.localStorage.getItem('currentUser')) {
        window.location.reload();
        this.router.navigate(['/admin/dashboard/main'])
      }
    })
    // this.authService
    //   .login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe({
    //     next: (data) => {
    //       if (!data.status) {
    //         localStorage.setItem('currentUser', JSON.stringify(data));
    //         window.location.reload();
    //         if (window.localStorage.getItem('currentUser')) {
    //           this.router.navigate(['/admin/dashboard/main'])
    //         }
    //       }
    //       else {
    //         this.error = data.message
    //         this.spinnerButtonOptions.active = false;
    //         this.loading = false;
    //         this.spinner.hide();
    //       }
    //     },
    //   });
  }
}
