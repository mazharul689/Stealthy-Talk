import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';
@Component({
  selector: 'app-edit-user-requests',
  templateUrl: './edit-user-requests.component.html',
  styleUrls: ['./edit-user-requests.component.sass']
})
export class EditUserRequestsComponent implements OnInit {
  HFormGroup1: FormGroup
  userReqId: any;
  roles
  regexp: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,16}$/gm;
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  allStatus: Object;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.userReqId = this.actRoute.snapshot.params.id;
    this.getData();
  }

  ngOnInit(): void {
    this.HFormGroup1 = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(6)]],
      role_id: [1, [Validators.required, Validators.maxLength(12)]],
      status_id: [1, [Validators.required, Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.regexp)]],
      profile_data: [''],
      phone: ['+880', [Validators.required, Validators.maxLength(14), Validators.minLength(11)]]
    })

    this.apiService.getAPI(`getuserreqbyuserreqid.php?id=${this.userReqId}`).subscribe((data) => {
      let user: any = data
      this.HFormGroup1.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.userName,
        role_id: null,
        status_id: user.status_id.toString(),
        email: user.email,
        password: user.password,
        profile_data: null,
        phone: user.mobileNo
      })
      console.log(this.HFormGroup1.value)

    })
  }

  getData(){
    this.apiService.getAPI('getroles.php').subscribe((data) => {
      this.roles = data
    })
    this.apiService.getAPI('getstatus.php').subscribe((data) => {
      this.allStatus = data
    })
  }

  Update(){
    // console.log(this.HFormGroup1.value)
    if(this.HFormGroup1.value.status_id == 1){
      this.HFormGroup1.value.role_id = parseInt(this.HFormGroup1.value.role_id)
      this.HFormGroup1.value.status_id = parseInt(this.HFormGroup1.value.status_id)
      this.apiService.postAPI(`adduserfromrequest.php`, this.HFormGroup1.value).subscribe((data) => {
        console.log(data)
        this.router.navigate(['/admin/users/user-requests'])
      })
    }

  }

}
