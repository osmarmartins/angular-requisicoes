import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(
    private authServ: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authServ.authUser();
  }

  sair(): void {
    this.authServ.logout()
      .then( () => this.router.navigate['/']);
  }

}
