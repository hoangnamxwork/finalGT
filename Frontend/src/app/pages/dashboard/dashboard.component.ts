import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ResultService } from 'src/app/shared/services/result/result.service';
import { TestResultService } from 'src/app/shared/services/testResult/test-result.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  //Chung
  public firstName = '';
  public lastName = '';
  public email = '';
  public role = '';
  public payLoad: any;
  

  //Lịch sử làm bài
  public ResultData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['testID', 'subjectID', 'testScore', 'dateTest'];
  //Kết quả làm bài
  displayedResultColumns: string[] = ['subjectID','testMade', 'avgScore', 'highestScore'];
  public subjectName: string[] = ['Lịch Sử', 'Địa Lý', 'Giáo Dục Công Dân'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public auth: AuthService,
    private resultService: ResultService,
    private testResultService: TestResultService,
    private route: Router
  ) {}
  ngOnInit() {
    this.payLoad = JSON.parse(
      window.atob(this.auth.getAuthToken()!.split('.')[1])
    );
    this.firstName = this.auth.getfirstNameFromToken();
    this.lastName = this.auth.getlastNameFromToken();
    this.email = this.auth.getEmailFromToken();
    this.role = this.auth.getRoleFromToken();
    this.resultService.GetResult(this.payLoad.nameid).subscribe((res) => {
      this.ResultData = new MatTableDataSource(res);
    });
    this.testResultService.GetResult(this.payLoad.nameid).subscribe((res) => {
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

  getSubjectName(subjectID: number): string {
    return this.subjectName[subjectID - 1];
  }
}
