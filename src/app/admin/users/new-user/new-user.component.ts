import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.sass']
})
export class NewUserComponent implements OnInit {
  HFormGroup1: FormGroup
  roles
  regexp: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,16}$/gm;
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.HFormGroup1 = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(6)]],
      role_id: ['', [Validators.required, Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.regexp)]],
      profile_data: [''],
      phone: ['+880',[Validators.required, Validators.maxLength(14), Validators.minLength(11)]]
    })
    this.apiService.getAPI('getroles.php').subscribe((data) => {
      this.roles = data
    })
  }

  createUser(){
    console.log('form value',this.HFormGroup1.value)
    this.apiService.postAPI(`adduser.php`, this.HFormGroup1.value).subscribe((data) => {
      console.log(data)
      this.router.navigate(['/admin/users/all-users'])
    })
  }

}
