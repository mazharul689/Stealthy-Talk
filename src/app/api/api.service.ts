
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost/stealthy_talk';
  private imageUrl = 'http://localhost/stealthy_talk';

  public getAPI(url) {
    return this.http.get(`${this.baseUrl}/${url}`);
  }
  public getAPIIMG(url) {
    return this.http.get(`${this.imageUrl}/${url}`,{ responseType: 'blob' });
  }
  public postAPI(url, data) {
    return this.http.post(`${this.baseUrl}/${url}`, data);
  }
  login(username: string, password: string): Observable<any> {
    console.log('i am here')
    const url = `${this.baseUrl}/login.php`;
    const body = { username: username, password: password };
    return this.http.post<any>(url, body);
  }
}
