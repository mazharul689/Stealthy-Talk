import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/api/api.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { fromEvent } from "rxjs";
import { FormBuilder, FormGroup, FormControl, FormArray } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { SelectionModel } from "@angular/cdk/collections";
export interface AllUsers {
  rowID;
  name;
  email;
  roleName;
}
@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.sass"],
})
export class AllUsersComponent implements OnInit {
  displayedColumns: string[] = ["rowID", "name", "email", "roleName"];
  dataSource: MatTableDataSource<AllUsers>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  nameFilter = new FormControl("");
  roleNameFilter = new FormControl("");
  emailFilter = new FormControl("");
  HFormGroup1: FormGroup;
  HFormGroup2: FormGroup;
  filteredValues = {
    name: "",
    email: "",
    role_name: "",
  };
  users;
  selected = [];
  selection = new SelectionModel<AllUsers>(true, []);
  selectionRadio = new SelectionModel<AllUsers>(true, []);
  imageId: any;
  userInfo: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private actRoute: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.imageId = this.actRoute.snapshot.params.id;
    this.getUsers();
  }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('currentUser'))
    this.dataSource = new MatTableDataSource(); // create new object
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.roleNameFilter.valueChanges.subscribe((role_name) => {
      this.filteredValues.role_name = role_name;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.emailFilter.valueChanges.subscribe((email) => {
      this.filteredValues.email = email;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.nameFilter.valueChanges.subscribe((name) => {
      this.filteredValues.name = name;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.dataSource.filterPredicate = this.createFilter();
    this.HFormGroup1 = this.fb.group({
      Users: this.fb.array([this.usersData()]),
    });
    this.HFormGroup2 = this.fb.group({
      Rows: this.fb.array([this.receiversId()]),
      stego_image_id: parseInt(this.imageId),
      admin_id: this.userInfo.user.user_id
    });
  }
  get Users(): FormArray {
    return this.HFormGroup1.get("Users") as FormArray;
  }
  usersData() {
    return this.fb.group({
      rowID: null,
      name: "",
      email: "",
      role_name: "",
    });
  }
  receiversId() {
    return this.fb.group({
      recipient_id: "",
    });
  }
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return (
        (data.name || "")
          .toLowerCase()
          .indexOf(searchTerms.name.toLowerCase()) !== -1 &&
        data.email
          .toLowerCase()
          .toLowerCase()
          .indexOf(searchTerms.email.toLowerCase()) !== -1 &&
        (data.role_name || "")
          .toLowerCase()
          .indexOf(searchTerms.role_name.toLowerCase()) !== -1
      );
    };
    return filterFunction;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  sendSelectedNumbers() {
    let selectedNumbers: number[] = [];
    for (let item of this.selection.selected) {
      selectedNumbers.push(item.rowID);
    }
    return selectedNumbers;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  getUsers() {
    this.apiService.getAPI("getusers.php").subscribe((data) => {
      this.users = data;
      for (let i in this.users) {
        this.users[i].rowID = i;
        this.users[i].name = data[i].firstName + " " + data[i].lastName;
      }
      // console.log(this.users);
      this.dataSource.data = this.users;
      (this.HFormGroup1.get("Users") as FormArray).removeAt(0);
      for (let i = 0; i < this.users.length; i++) {
        let rowData = this.fb.group({
          rowID: i,
          user_id: this.users[i].user_id,
          name: this.users[i].name,
          email: this.users[i].email,
          role_name: this.users[i].roleName,
        });
        (this.HFormGroup1.get("Users") as FormArray).push(rowData);
      }
      return data;
    });
  }
  Send() {
    let rows = this.sendSelectedNumbers();
    let body = this.HFormGroup1.value.Users;
    // console.log(body);
    (this.HFormGroup2.get("Rows") as FormArray).removeAt(0);
    for (let i = 0; i < rows.length; i++) {
      let rowData = this.fb.group({
        recipient_id: body[rows[i]].user_id,
      });
      (this.HFormGroup2.get("Rows") as FormArray).push(rowData);
    }
    // console.log(this.HFormGroup2.value)
    this.apiService.postAPI('addmessage.php', this.HFormGroup2.value).subscribe(data => {
      // console.log(data);
      this.router.navigate(['/admin/stego/all-encrypted-image'])
    });
  }
}
