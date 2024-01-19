import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  FormValue!: FormGroup;
  employeeId: any;
  imageUrl: (string | ArrayBuffer | null) | undefined;
  isRouting: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.FormValue = this.fb.group({
      image: ['', Validators.required], // Add validators for required
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Add email validator
      mobile: ['', Validators.required],
      age: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      tags: [[]],
      checkbox: [false, Validators.required],
    });

    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart || event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.isRouting = true;
        } else if (event instanceof NavigationEnd) {
          this.isRouting = false;
        }
      });
  }
  homepage() {
    this.router.navigate(['/']);
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    // console.log('Age value:', this.FormValue.get('age')?.value);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
    this.FormValue.patchValue({
      image: file,
    });
  }

  submitEmployee() {
    if (this.FormValue.invalid) {
      this.markFormGroupTouched(this.FormValue);
      this.toastr.error('Please fill in all required fields.', 'Error');
      return;
    }

    const imageFile = this.FormValue.get('image')?.value;

    if (!imageFile) {
      this.toastr.error('Please select an image.');
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(imageFile);

    img.onload = () => {
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;

      if (naturalWidth !== 310 || naturalHeight !== 325) {
        this.toastr.error('Image size must be 310x325 px.');
      } else {
        const formData = { ...this.FormValue.value };

        console.log('Submitted Form Values:', formData);

        const reader = new FileReader();
        reader.onload = (e) => {
          formData.image = e.target?.result;
          this.api.registration(formData).subscribe((res) => {
            console.log('API Response:', res.image);
            // console.log('    this.employeeId', this.employeeId);

            // this.employeeId = res.id;
          });
        };
        reader.readAsDataURL(imageFile);

        this.FormValue.reset();
        this.FormValue.markAsPristine();
        this.FormValue.markAsUntouched();
        this.toastr.success('Registration Successful');
        this.router.navigate(['/profile']);
      }
    };
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
