import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService } from 'src/app/api/api.service'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { fromEvent } from 'rxjs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
export interface AllStegos {
  id
  subject
  user_id
  imagepath
}
@Component({
  selector: 'app-all-encrypted-image',
  templateUrl: './all-encrypted-image.component.html',
  styleUrls: ['./all-encrypted-image.component.sass']
})
export class AllEncryptedImageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'subject', 'actions']
  dataSource: MatTableDataSource<AllStegos>
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  constructor(
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) {
    this.getAllStegos()
   }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource() // create new object
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  addNew(){
    this.router.navigate(['/admin/users/new-user']);
  }
  refresh(){
    this.loadData()
  }
  public loadData() {
    this.dataSource = new MatTableDataSource() // create new object
    this.getAllStegos()
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
      if (!this.dataSource) {
        return;
      }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }

  getAllStegos(){
    this.apiService.getAPI('getstegoimages.php').subscribe((data) => {
      let stegos: any = data;
      this.dataSource.data = stegos
      return data
    })
  }

  sendMessage(id){
    // alert('Under Construction')
    this.router.navigate([`/admin/stego/all-users/${id}`])
  }
  decryptMessage(id){
    this.router.navigate([`/admin/stego/decrypt-image/${id}`])
  }

}
