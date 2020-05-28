import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  senha: string;
  mensagem: string;
  emailEnviado: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logar() {
    try {
      if (this.email === undefined || this.senha === undefined) {
        this.mensagem = 'Usuário ou senha não informado!';
      }
      this.authService.login(this.email, this.senha)
        .then( () => {
          this.router.navigate(['/admin/painel']);
        })
        .catch( erro => {
          let detalhes = '';
          switch (erro.code) {
            case 'auth/user-not-found': {
              detalhes = 'Não existe usuário para o email informado';
              break;
            }
            case 'auth/invalid-email': {
              detalhes = 'Email inválido';
              break;
            }
            case 'auth/wrong-password': {
              detalhes = 'Senha inválida';
              break;
            }
            default: {
              detalhes = erro.message;
              break;
            }
          }
        });
    } catch (erro) {
      this.mensagem = `Erro ao logar. Detalhes: ${erro}`;
    }
  }

  async enviaLink() {
    const { value: email } = await Swal.fire({
      title: 'Informe o email cadastrado',
      input: 'email',
      inputPlaceholder: 'Seu e-mail...'
    });

    if (email) {
      this.authService.resetPassword(email)
        .then( () => {
          this.emailEnviado = true;
          this.mensagem = `Email enviado para ${email} com instrução para recuperação`;
        })
        .catch( erro => {
          this.mensagem = `Erro ao localizar o email. Detalhes ${erro.message}`;
        });
    }
  }

}
