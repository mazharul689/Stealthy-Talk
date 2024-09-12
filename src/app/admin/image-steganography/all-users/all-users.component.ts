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
  rowId
  name
  email
  roleName
}
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.sass']
})
export class AllUsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'roleName']
  dataSource: MatTableDataSource<users>
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  nameFilter = new FormControl('')
  roleNameFilter = new FormControl('')
  emailFilter = new FormControl('')
  filteredValues = {
    name: '',
    email: '',
    role_name: ''
  }
  users
  constructor(
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) {this.getUsers()}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource() // create new object
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    this.roleNameFilter.valueChanges.subscribe(role_name => {
      this.filteredValues.role_name = role_name
      this.dataSource.filter = JSON.stringify(this.filteredValues)
    })
    this.emailFilter.valueChanges.subscribe(email => {
      this.filteredValues.email = email
      this.dataSource.filter = JSON.stringify(this.filteredValues)
    })
    this.nameFilter.valueChanges.subscribe(name => {
      this.filteredValues.name = name
      this.dataSource.filter = JSON.stringify(this.filteredValues)
    })
    this.dataSource.filterPredicate = this.createFilter()
  }
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return (data.name || '').toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1
        && data.email.toLowerCase().toLowerCase().indexOf(searchTerms.email.toLowerCase()) !== -1
        && (data.role_name || '').toLowerCase().indexOf(searchTerms.role_name.toLowerCase()) !== -1;
    }
    return filterFunction;
  }

  getUsers(){
    this.apiService.getAPI('getusers.php').subscribe((data) => {
      this.users = data
      for(let i in this.users){
        this.users[i].name = data[i].firstName + ' ' + data[i].lastName
      }
      this.dataSource.data = this.users
      return data
    })
  }

}
