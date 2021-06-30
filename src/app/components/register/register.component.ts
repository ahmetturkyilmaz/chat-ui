import { Component, OnInit } from '@angular/core';
import { RegisterUserModel } from '../../models/RegisterUserModel';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: RegisterUserModel = new RegisterUserModel('', '', '');

  constructor(
    private service: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.service.register(this.model).subscribe(
      () => {
        this._snackBar.open('Your account is created.', 'Done');
        this.router.navigate(['/']);
      },
      (error) => this._snackBar.open(error, 'Done')
    );
  }
}
