import { Component, ViewChild } from '@angular/core';
import { AdminStudentService } from 'src/app/shared/services/admin/admin-student/admin-student.service';
import { AddStudentComponent } from './modals/add-student/add-student.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { EditStudentComponent } from './modals/edit-student/edit-student.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.css'],
})
export class AdminStudentComponent {
  displayedColumns: string[] = [
    'userID',
    'firstName',
    'lastName',
    'email',
    'userName',
    'password',
    'role',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private student: AdminStudentService,
    private dialog: MatDialog,
    private toast : NgToastService,
    private route:Router
  ) {}

  ngOnInit() {
    this.student.GetAllUsers().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  OpenAddStudent() {
    const dialogRef = this.dialog.open(AddStudentComponent);
    dialogRef.afterClosed().subscribe({
      next:(res)=>{
        this.route.navigate(['admin/student']);
        this.student.GetAllUsers();
      }
    })
  }
  OpenEditStudent(data:any){
    const dialogRef = this.dialog.open(EditStudentComponent, {
      data
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.route.navigate(['admin/quiz']);
          this.student.GetAllUsers();
        }
      },
    });
  }
  
  OpenDeleteStudent(id: number){
    this.student.DeleteUser(id).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'THÀNH CÔNG',
          summary: 'Xóa học sinh thành công!',
          duration: 4000,
        });
        this.route.navigate(['admin/student']);
        this.student.GetAllUsers();
      }
    })
  }
}
