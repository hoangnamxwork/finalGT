import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { AdminQuizService } from 'src/app/shared/services/admin/admin-quiz/admin-quiz.service';
import { AddQuizComponent } from './modals/add-quiz/add-quiz.component';
import { EditQuizComponent } from './modals/edit-quiz/edit-quiz.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-quiz',
  templateUrl: './admin-quiz.component.html',
  styleUrls: ['./admin-quiz.component.css'],
})
export class AdminQuizComponent {
  public quizes: any = [];
  displayedColumns: string[] = [
    'quizID',
    'subjectID',
    'quizContent',
    'option1',
    'option2',
    'option3',
    'option4',
    'answer',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private quiz: AdminQuizService,
    private dialog: MatDialog,
    private toast: NgToastService,
    private route: Router
  ) {}
  ngOnInit() {
    this.quiz.GetAllQuizes().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  OpenAddQuiz() {
    const dialogRef = this.dialog.open(AddQuizComponent);
    dialogRef.afterClosed().subscribe({
      next:(res)=>{
        this.route.navigate(['admin/quiz']);
        this.quiz.GetAllQuizes();
      }
    })
  }

  OpenEditQuiz(data:any) {
    const dialogRef = this.dialog.open(EditQuizComponent, {
      data
    });
    dialogRef.afterClosed().subscribe({
      next:(res)=>{
        if (res){
          this.route.navigate(['admin/quiz']);
          this.quiz.GetAllQuizes();
        }
      }
    })
  }

  OpenDeleteQuiz(id: number) {
    this.quiz.DeleteQuiz(id).subscribe({
      next: (res) => {
        this.toast.success({
          detail: 'THÀNH CÔNG',
          summary: 'Xóa câu hỏi thành công!',
          duration: 4000,
        });
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
