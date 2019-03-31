import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData: {};
  loading = true;
  my: string;
  constructor(private router: Router, private route: ActivatedRoute, public authService: AuthService) {}

  ngOnInit() {
    // this.userData = this.route.snapshot.data['user'];
    this.route.data.subscribe(data => {
      this.userData = data.user;
      this.loading = false;
    });
    console.log('User data---------->', this.userData);
  }

  logOut(): void {
    console.log('Logout');
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
