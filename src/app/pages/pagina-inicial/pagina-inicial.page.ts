import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.page.html',
  styleUrls: ['./pagina-inicial.page.scss'],
})
export class PaginaInicialPage {
  private apiUrl = environment.apiUrl;

  constructor(private router: Router, private http: HttpClient) {}

  logout() {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => {
        this.router.navigate(['/inicio']); 
      },
      error: (error) => {
        console.error('Falha no logout', error);
      }
    });
  }
}
