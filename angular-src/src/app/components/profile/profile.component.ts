import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  msg: string;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(
      (profile) => {
        this.name = profile.user.name;
        this.username= profile.user.username;
        this.email= profile.user.email;
      },
      (err) => {
        console.log(err);
        return false;
      }
      );
    }
}
