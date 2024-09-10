import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {
  HFormGroup1: FormGroup
  userId: any;
  roles
  regexp: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,16}$/gm;
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.userId = this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.HFormGroup1 = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(6)]],
      role_id: ['', [Validators.required, Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.regexp)]],
      profile_data: [''],
      phone: ['+880', [Validators.required, Validators.maxLength(14), Validators.minLength(11)]]
    })

    this.apiService.getAPI('getroles.php').subscribe((data) => {
      this.roles = data
    })

    this.apiService.getAPI(`getusersbyuserid.php?id=${this.userId}`).subscribe((data) => {
      let user: any = data
      console.log(data)
      this.HFormGroup1.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        role_id: user.username,
        email: user.email,
        password: '',
        profile_data: user.profile_data,
        phone: user.phone
      })
      console.log(this.HFormGroup1.value)
    })
  }
  Update(){
    
  }

}
