import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/LoginModel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  model = new LoginModel('', '');

  constructor(
    private service: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.service.login(this.model).subscribe(
      (value) => {
        window.localStorage.setItem('AccessToken', value.data.accessToken);
        this.router.navigate(['/dashboard']);
      },
      (error) => this._snackBar.open(error, 'Done')
    );
  }
}
