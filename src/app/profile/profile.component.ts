import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isRouting: boolean = false;
  profileData: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extract employeeId from the route parameters
    const employeeId = this.route.snapshot.params['id'];
    // Call the service method to get employee data by ID
    this.getEmployeeById(employeeId);
    this.profileDataa();
  }

  getEmployeeById(employeeId: number) {
    this.api.getEmployeeById(employeeId).subscribe((res: any) => {
      console.log('Getting data by ID', res);
      this.profileData = res[0];
      console.log('this.profileData', this.profileData);
    });
  }

  profileDataa() {
    this.api.getEmployee().subscribe((res: any) => {
      console.log('Getting data by ID', res);
      this.profileData = res[0];
      console.log('this.profileData', this.profileData);
    });
  }
}
