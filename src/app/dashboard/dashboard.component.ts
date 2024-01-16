import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      image: [],
      firstname: [''],
      lastname: [''],
      email: [''],
      mobile: [''],
      about: [''],
      age: [''],
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

  onFileSelected(event: any): void {
    const file = event.target.files[0];

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

        this.api.registration(formData).subscribe((res) => {
          console.log(res);
        });

        this.FormValue.reset();
        this.toastr.success('Registration Successful');
        this.router.navigate(['/profile']);
      }
    };
  }
}
