import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: HttpClient) {}

  getAppVersion(): Observable<string> {
    return this.http.get<{ version: string }>('/version.json').pipe(
      map(data => data.version),
      catchError(error => {
        console.error('Cannot get app version', error);
        return 'unknown version'
      }),
    );
  }
}
