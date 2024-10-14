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
export interface AllMessage {
  rowID;
  sender;
  subject;
  actions;
}
@Component({
  selector: 'app-all-message',
  templateUrl: './all-message.component.html',
  styleUrls: ['./all-message.component.sass']
})
export class AllMessageComponent implements OnInit {
  displayedColumns: string[] = ["sender", "subject", "actions"];
  dataSource: MatTableDataSource<AllMessage>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  HFormGroup1: FormGroup;
  HFormGroup2: FormGroup;
  users;
  imageId: any;
  userInfo: any;
  messages;
  constructor(
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) {
    this.userInfo = JSON.parse(localStorage.getItem('currentUser'))
    this.getMessages(this.userInfo.user.user_id)
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource() // create new object
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }
  getMessages(id){
    this.apiService.getAPI(`getmessagesbyrecipientid.php?recipient_id=${id}`).subscribe((data) => {
      this.messages = data['data']
      this.dataSource.data = this.messages
      return data
    });

  }
  showMessage(id){
    this.router.navigate([`/admin/stego/decrypt-image/${id}`])
  }

}
