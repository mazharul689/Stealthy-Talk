import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ApiService } from 'src/app/api/api.service';
import { ShareService } from '../../core/service/share.service'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;
  loading = false
  error = '';
  img: string
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private shared: ShareService,
    private apiService: ApiService,
    private router: Router
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
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      mobileNo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(event) {
    let formData = this.signUpForm.value;
    delete formData.confirmPassword
    console.log(formData);
    this.apiService.postAPI(`adduserreq.php`, formData).subscribe((data) => {
      console.log(data)
      alert(data['message'])
      this.router.navigate(['/authentication/signin'])

    })
  }
}
// {
//   "status": "success",
//   "message": "User request submitted successfully"
// }
