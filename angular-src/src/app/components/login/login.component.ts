import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Login, UserNoPW } from 'src/app/models/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    const login: Login = {
      username: this.username,
      password: this.password,
    };

    this.authService.authenticateUser(login).subscribe((data) => {
      console.log(data);
      if (data.success) {
        this.authService.storeUserData(data.token, data.userNoPW);
        this.flashMessage.show('로그인성공', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        Swal.fire('로그인 되셨습니다.', '안녕하세요!', 'success');
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000,
        });
        this.router.navigate(['login']);
      }
    });
  }
}
