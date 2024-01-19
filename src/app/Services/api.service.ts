import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postEmployee(data: any) {
    return this.http.post('http://localhost:3000/posts', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getEmployee(): Observable<any> {
    return this.http.get('http://localhost:3000/posts').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getEmployeeById(id: number) {
    return this.http.get(`http://localhost:3000/posts/${id}`);
  }
  registration(data: any) {
    return this.http.post('http://localhost:3000/posts', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  uploadImage(file: any) {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post('http://localhost:3000/upload', formData).pipe(
      map((res: any) => {
        return res.imageIdentifier; // Adjust this based on your server response
      })
    );
  }
}
