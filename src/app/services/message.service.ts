import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTPResponse } from '../models/HTTPResponse';
import { Config } from '../Config';
import { Observable, throwError } from 'rxjs';
import { MessageModel } from '../models/MessageModel';
import { catchError } from 'rxjs/operators';
import { SendMessageModel } from '../models/SendMessageModel';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  getMessages(roomId: number): Observable<HTTPResponse<MessageModel[]>> {
    return this.http
      .get<HTTPResponse<MessageModel[]>>(
        `${Config.baseURL}/message/room/all/${roomId}`,
        { ...Config.getHttpOptions(), params: {} }
      )
      .pipe(
        catchError((err, caught) => {
          console.log('err', err, caught);
          return throwError('Something bad happened; please try again later.');
        })
      );
  }

  sendMessage(payload: SendMessageModel): Observable<any> {
    return this.http.post(
      `${Config.messageServiceURL}/message`,
      payload,
      Config.getHttpOptions()
    );
  }
}
