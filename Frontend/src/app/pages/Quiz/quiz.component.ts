import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

import ValidateForm from 'src/app/auth/validateForm';
import { QuizService } from 'src/app/shared/services/quiz/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  //Chọn môn học
  QuizSelect!: FormGroup;

  //Chuyển đổi container
  public isSubjectOn: boolean = true;
  public isQuizOn: boolean = false;
  public isResultOn: boolean = false;

  //Câu hỏi
  public score: number = 0;
  public id: number = 0;
  public selectedOption: any = [];

  //Kết quả
  public testScore: any;
  public subjectID: any;

  //Thời gian
  public progress: string = '0';
  public minutes: number = 40;
  public seconds: number = 0;
  private date = new Date();
  private timer: any;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    public quiz: QuizService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    //Pick môn học
    if (this.isSubjectOn == true) {
      this.QuizSelect = this.fb.group({
        Subject: ['', Validators.required],
      });
    }
  }

  //Chọn môn học
  SubjectSelect() {
    if (this.QuizSelect.valid) {
      this.isQuizOn = !this.isQuizOn;
      this.isSubjectOn = !this.isSubjectOn;
      const selectedID = parseInt(this.QuizSelect.get('Subject')?.value);
      this.id = selectedID;
      this.quiz.RandomSubjectQuiz(selectedID).subscribe({
        next: (res) => {
          this.quiz.qns = res;
        },
      });
    } else {
      //throw error
      ValidateForm.validateForm(this.QuizSelect);
    }
    this.startTimer();
  }

  //Câu hỏi tiếp theo
  selectOption(index: number) {
    this.selectedOption = index;
    if (index == this.quiz.qns[this.quiz.quizProgress].answer) {
      this.quiz.correctAnswerCount++;
    }
    this.quiz.quizProgress++;
    if (this.quiz.quizProgress === this.quiz.qns.length) {
      clearInterval(this.timer);
      this.isQuizOn = !this.isQuizOn;
      this.isResultOn = !this.isResultOn;
      this.testScore = this.quiz.correctAnswerCount/this.quiz.qns.length;
      this.subjectID = parseInt(this.QuizSelect.get('Subject')?.value) ;
      const testResult = {
        testScore: this.testScore,
        subjectID: this.subjectID
      }
      this.quiz.SubmitTestResult(testResult).subscribe({
        next:(res) =>{
          this.toast.success({
            detail:'THÀNH CÔNG',
            summary:'Bạn đã hoàn thành bài làm',
            duration: 4000
          }) 
        },
        error: (err) => {
          this.toast.error({
            detail: 'LỖI',
            summary: 'Có gì đó đã bị lỗi!',
            duration: 4000,
          });
        }
      })
    }
  }

  onSubmit(){
  }

  //Phụ

  //Hủy làm bài
  Cancel() {
    this.route.navigate(['home']);
  }

  //Thời gian - Bắt đầu làm bài
  updateTimer() {
    this.date.setMinutes(this.minutes);
    this.date.setSeconds(this.seconds);
    this.date.setMilliseconds(0);
    const time = this.date.getTime();
    this.date.setTime(time - 1000);
    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();

    if (this.date.getMinutes() === 0 && this.date.getSeconds() === 0) {
      //Stop interval
      clearInterval(this.timer);
      setTimeout(() => {
        clearInterval(this.timer);
      }, 5000);
      this.route.navigate(['/result']);
    }
  }

  startTimer() {
    if (this.minutes > 0 || this.seconds > 0) {
      this.updateTimer();
      if (this.seconds > 0) {
        this.timer = setInterval(() => {
          this.updateTimer();
        }, 1000);
      }
    }
  }

  
  //Code cũ

  /*
    if (this.isResultOn == true) {
      this.quiz.correctAnswerCount = 0;
      const qnProgress = localStorage.getItem('qnProgress');
      const qnsData = localStorage.getItem('qns');
      console.log(qnProgress);
      console.log(qnsData);
      if (qnProgress !== null) {
        this.quiz.quizProgress = parseInt(qnProgress);
      }
      if (qnsData !== null) {
        this.quiz.qns = JSON.parse(qnsData);
      }
      this.quiz.GetAnswers(this.id).subscribe((data: any) => {
        this.quiz.correctAnswerCount = 0;
        this.quiz.qns.forEach((e, i) => {
          if (e.answer == data[i]) this.quiz.correctAnswerCount++;
          e.correct = data[i];
        });
      });
    }*/

  /*localStorage.setItem('qns', JSON.stringify(this.quiz.qns));
      localStorage.setItem('qnProgress', this.quiz.quizProgress.toString());*/

      /**/
}
