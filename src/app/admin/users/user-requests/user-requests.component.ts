import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService } from 'src/app/api/api.service'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { fromEvent } from 'rxjs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'

export interface users {
  firstName
  lastName
  userName
  email
  actions
}

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.sass']
})
export class UserRequestsComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName','userName', 'email', 'actions']
  dataSource: MatTableDataSource<users>
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  firstNameFilter = new FormControl('')
  lastNameFilter = new FormControl('')
  userNameFilter = new FormControl('')
  emailFilter = new FormControl('')
  filteredValues = {
    firstName: '',
    lastName: '',
    userName: '',
    email: ''
  }
  users
  constructor(
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) { this.getUserReq() }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource() // create new object
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    this.emailFilter.valueChanges.subscribe(email => {
      this.filteredValues.email = email
      this.dataSource.filter = JSON.stringify(this.filteredValues)
    })
    this.firstNameFilter.valueChanges.subscribe(firstName => {
      this.filteredValues.firstName = firstName
      this.dataSource.filter = JSON.stringify(this.filteredValues)
    })
    this.lastNameFilter.valueChanges.subscribe(lastName => {
      this.filteredValues.lastName = lastName
      this.dataSource.filter = JSON.stringify(this.filteredValues)
    })
    this.dataSource.filterPredicate = this.createFilter()
  }

  getUserReq() {
    this.apiService.getAPI('getuserreq.php').subscribe((data) => {
      this.users = data;
      this.dataSource.data = this.users
      return data
    })
  }
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return (data.firstName || '').toLowerCase().indexOf(searchTerms.firstName.toLowerCase()) !== -1
        && data.lastName.toLowerCase().indexOf(searchTerms.lastName.toLowerCase()) !== -1
        && data.userName.toLowerCase().indexOf(searchTerms.userName.toLowerCase()) !== -1
        && data.email.toLowerCase().toLowerCase().indexOf(searchTerms.email.toLowerCase()) !== -1;
    }
    return filterFunction;
  }

  editUserReq(id){
    this.router.navigate([`/admin/users/edit-user-requests/${id}`]);
  }

}
