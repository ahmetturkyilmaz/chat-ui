import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from '../Config';
import { CreateRoomModel } from '../models/CreateRoomModel';
import { HTTPResponse } from '../models/HTTPResponse';
import { RoomModel } from '../models/RoomModel';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  create(payload: CreateRoomModel): Observable<any> {
    return this.http
      .post<any>(`${Config.baseURL}/rooms`, payload, Config.getHttpOptions())
      .pipe(
        catchError((err, caught) => {
          console.log('err', err, caught);
          return throwError('Something bad happened; please try again later.');
        })
      );
  }

  getAll(): Observable<HTTPResponse<RoomModel[]>> {
    return this.http
      .get<HTTPResponse<RoomModel[]>>(
        `${Config.baseURL}/auth/me/rooms`,
        Config.getHttpOptions()
      )
      .pipe(
        catchError((err, caught) => {
          console.log('err', err, caught);
          return throwError('Something bad happened; please try again later.');
        })
      );
  }

  invite(roomId: number, userId: number): Observable<any> {
    return this.http
      .post<any>(
        `${Config.baseURL}/rooms/${roomId}/invite`,
        { userId },
        Config.getHttpOptions()
      )
      .pipe(
        catchError((err, caught) => {
          console.log('err', err, caught);
          return throwError('Something bad happened; please try again later.');
        })
      );
  }
}
