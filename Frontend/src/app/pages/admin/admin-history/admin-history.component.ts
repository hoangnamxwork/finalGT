import { Observable } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AdminHistoryService } from 'src/app/shared/services/admin/admin-history/admin-history.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.css'],
})
export class AdminHistoryComponent {
  displayedColumns: string[] = [
    'testID',
    'userID',
    'subjectID',
    'testScore',
    'dateTest',
  ];
  public subjectName: string[] = ['Lịch Sử', 'Địa Lý', 'Giáo Dục Công Dân'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public testResultService: AdminHistoryService,
  ) {}

  ngOnInit(event: Event) {
    this.testResultService.GetAllTestResults().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  getSubjectName(subjectID: number): string {
    return this.subjectName[subjectID - 1];
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
