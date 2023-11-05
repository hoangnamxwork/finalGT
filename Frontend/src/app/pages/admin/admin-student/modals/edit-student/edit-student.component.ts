import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/shared/models/user.model';
import { AdminStudentService } from 'src/app/shared/services/admin/admin-student/admin-student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent {
  editUserForm!: FormGroup;
  roles: string[] = ['Admin', 'Student'];
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userSerice: AdminStudentService,
    private toast: NgToastService,
    private activateroute: ActivatedRoute,
    private route: Router,
  ) {
    this.editUserForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      password: '',
      role: '',
    });
  }
  ngOnInit(): void {
    this.editUserForm.patchValue(this.data);
    
  }
  onEditStudentSubmit() {
    if (this.editUserForm.valid) {
      if (this.data){
        this.userSerice
        .EditUser(this.data.userID, this.editUserForm.value)
        .subscribe({
          next: (res: any) => {
            this.toast.success({
              detail: 'THÀNH CÔNG',
              summary: 'Sửa thông tin học sinh thành công!',
              duration: 4000,
            });
            this.dialogRef.close(true);
          },
        });
      }
      
    }
    
  }
}
