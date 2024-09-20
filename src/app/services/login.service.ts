import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;
  private apiUrl2 = `${this.apiUrl}/api/login`;  // Correct login URL

  constructor(private http: HttpClient) {}

  // Login function with credentials
  login(email: string, senha: string): Observable<any> {
    const loginData = { email, senha };  
    return this.http.post(this.apiUrl2, loginData, { withCredentials: true });
  }
}

