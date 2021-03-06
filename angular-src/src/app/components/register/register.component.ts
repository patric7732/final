import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string;
  email: string;
  username: string;
  password1: string;
  password2: string;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
  }

  onRegisterSubmit(): any {
    // Confirm passwords
    if(this.password1 !== this.password2) {
      this.flashMessage.show('패스워드가 일치하지 않습니다. 다시 입력하세요.',{
        cssClass:'alert-danger',
        timeout:3000,
      });
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(this.email)) {
      this.flashMessage.show('유효한 이메일주소를 입력하세요',{
        cssClass:'alert-danger',
        timeout:3000,
      });
      return false;
    }




    // 사용자의 JSON 객체 생성
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password1,
    }

// 8글자
if (this.password1.length < 8 || this.password1.length > 20) {
  this.flashMessage.show('비밀번호를 8자리 ~ 20자리 이내로 입력해주세요.', {
    cssClass: 'alert-danger',
    timeout: 3000,
  });
  console.log("비밀번호를 8자리 ~ 20자리 이내로 입력해주세요.")
  return false;
} else if (this.password1.search(/\s/) != -1) {
  this.flashMessage.show('비밀번호는 공백 없이 입력해주세요.', {
    cssClass: 'alert-danger',
    timeout: 3000,
  });
  console.log("비밀번호를 8자리 ~ 20자리 이내로 입력해주세요.")
  return false;
}



    // 모든 필드가 입력되었는지 검증
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('모든 필드들을 입력하세요.',{
        cssClass:'alert-danger',
        timeout:3000,
      });
      return false;
    }

    this.authService.registerUser(user).subscribe((data) => {
      if (data.success) {
        this.flashMessage.show('You are now registered and can log in', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        Swal.fire('등록이 완료되었습니다.', '로그인을 시도해주세요.', 'success');
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
        this.router.navigate(['/register']);
      }
    });
  }

  

}
