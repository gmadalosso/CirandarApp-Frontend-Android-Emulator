import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  senha: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private alertController: AlertController 
  ) {}

  // Handle login
  onLogin() {
    this.loginService.login(this.email, this.senha).subscribe({
      next: (response) => {
        console.log('Login feito com sucesso!', response);

        // Store the user role in localStorage
        localStorage.setItem('userRole', response.usuario.role);

        // Navigate based on user role
        if (response.usuario.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/pagina-inicial']);
        }
      },
      error: (error) => {
        console.error('Falha no login', error);
        this.showErrorModal(error.error.message); 
      }
    });
  }

  // Show an error modal in case of login failure
  async showErrorModal(errorMessage: string) {
    const alert = await this.alertController.create({
      header: 'FALHA NO LOGIN',
      message: errorMessage,  
      buttons: ['OK']  
    });

    await alert.present();
  }
}
