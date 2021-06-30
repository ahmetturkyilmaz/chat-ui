import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginModel } from '../models/LoginModel';
import { Config } from '../Config';
import { RegisterUserModel } from '../models/RegisterUserModel';
import { HTTPResponse } from '../models/HTTPResponse';
import { LoginResponse } from '../models/LoginResponse';
import { UserModel } from '../models/UserModel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(payload: LoginModel): Observable<HTTPResponse<LoginResponse>> {
    return this.http
      .post<HTTPResponse<LoginResponse>>(
        `${Config.baseURL}/auth/authenticate`,
        payload,
        Config.getHttpOptions()
      )
      .pipe(
        catchError((err, caught) => {
          return throwError('Something bad happened; please try again later.');
        })
      );
  }

  register(payload: RegisterUserModel): Observable<any> {
    return this.http
      .post<any>(
        `${Config.baseURL}/auth/register`,
        payload,
        Config.getHttpOptions()
      )
      .pipe(
        catchError((err, caught) => {
          return throwError('Something bad happened; please try again later.');
        })
      );
  }

  getAll(): Observable<HTTPResponse<UserModel[]>> {
    return this.http
      .get<HTTPResponse<UserModel[]>>(
        `${Config.baseURL}/auth/users`,
        Config.getHttpOptions()
      )
      .pipe(
        catchError((err, caught) => {
          return throwError('Something bad happened; please try again later.');
        })
      );
  }
}
