import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
  private authService: AuthService,
  private router: Router,
  private flashMessage: FlashMessagesService
  )
  { }

  ngOnInit(): void {
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('로그아웃되었습니다.', {
      cssClass: 'alert-success',
      timeout: 3000,
    });
    Swal.fire('로그아웃 되었습니다.', '좋은 하루 보내세요.', 'success');
    this.router.navigate(['/login']);
  }

  checkLoggedIn(): boolean {
    return this.authService.loggedIn();
  }
}
