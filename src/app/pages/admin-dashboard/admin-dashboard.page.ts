import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage {
  bibliotecas: any[] = [];
  sessionDetails: any = null;
  isModalOpen = false;
  private apiUrl = environment.apiUrl;

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.loadBibliotecas();
  }

  // Function to manually retrieve cookies
  getCookie(name: string) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  loadBibliotecas() {
    const sessionCookie = this.getCookie('connect.sid');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cookie': `connect.sid=${sessionCookie}`
    });

    this.http.get<any>(`${this.apiUrl}/api/bibliotecas`, { headers, withCredentials: true }).subscribe({
      next: (response) => {
        this.bibliotecas = response.bibliotecas;
      },
      error: (error) => {
        console.error('Error fetching bibliotecas', error);
      }
    });
  }

  showSessionDetails() {
    const sessionCookie = this.getCookie('connect.sid');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cookie': `connect.sid=${sessionCookie}`
    });

    this.http.get<any>(`${this.apiUrl}/profile`, { headers, withCredentials: true }).subscribe({
      next: (response) => {
        console.log('Session details:', response.user);
        this.sessionDetails = response.user;
        this.isModalOpen = true;
      },
      error: (error) => {
        console.error('Error fetching session details', error);
      }
    });
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async confirmDelete(bibliotecaId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza de que deseja remover esta biblioteca?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel deletion');
          }
        },
        {
          text: 'Deletar',
          handler: () => {
            this.deleteBiblioteca(bibliotecaId); 
          }
        }
      ]
    });

    await alert.present();
  }

  deleteBiblioteca(bibliotecaId: string) {
    const sessionCookie = this.getCookie('connect.sid');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cookie': `connect.sid=${sessionCookie}`
    });

    this.http.delete(`${this.apiUrl}/api/bibliotecas/${bibliotecaId}`, { headers, withCredentials: true }).subscribe({
      next: (response) => {
        console.log('Biblioteca removida com sucesso');
        this.loadBibliotecas();
      },
      error: (error) => {
        console.error('Erro ao remover biblioteca:', error);
      }
    });
  }

  cadastrarBiblioteca() {
    this.router.navigate(['/criar-biblioteca']);
  }

  reloadBibliotecas() {
    this.loadBibliotecas();
  }

  logout() {
    const sessionCookie = this.getCookie('connect.sid');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cookie': `connect.sid=${sessionCookie}`
    });

    this.http.post(`${this.apiUrl}/logout`, {}, { headers, withCredentials: true }).subscribe({
      next: () => {
        this.router.navigate(['/inicio']);
      },
      error: (error) => {
        console.error('Erro ao fazer logout', error);
      }
    });
  }

  editBiblioteca(biblioteca: any) {
    this.router.navigate(['/criar-biblioteca'], { state: { biblioteca } });
  }
}
