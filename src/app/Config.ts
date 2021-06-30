import { HttpHeaders } from '@angular/common/http';

export class Config {
  static baseURL = 'http://localhost:8000/api';
  static messageServiceURL = 'http://localhost:8001/api';

  static getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('AccessToken')}`,
      }),
    };
  }
}
