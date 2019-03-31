import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public name: string;
  public apiUrl = 'http://localhost:4200/';
  constructor(private http: HttpClient) { }

  getData() {
    return JSON.parse(localStorage.getItem('userdata'));
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userdata');
  }

}
