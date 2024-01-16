import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isRouting: boolean = false;
  profileData: any;
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit(): void {
    this.getAllEmployee();
  }
  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      console.log('getting data', res);
      this.profileData = res;
    });
  }
}
