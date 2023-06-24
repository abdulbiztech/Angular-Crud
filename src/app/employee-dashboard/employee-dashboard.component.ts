import { ApiService } from './../Services/api.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms'
import { EmployeeModel } from './employee-dashboard.model';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
FormValue !:FormGroup;
emplyeeData:any;
showAdd!:boolean;
showUpdate!:boolean;
employeeObj:EmployeeModel=new EmployeeModel();
constructor(private fb:FormBuilder,private api:ApiService){}
ngOnInit(): void {
  this.FormValue = this.fb.group({
    firstname:[''],
    lastname:[''],
    email:[''],
    mobile:[''],
    salary:['']
  });
  this.getAllEmployee();
}
clickAddEmployee(){
  this.FormValue.reset();
  this.showAdd = true;
  this.showUpdate = false;
}
postEmployee(){
  this.employeeObj.firstname = this.FormValue.value.firstname;
  this.employeeObj.lastname = this.FormValue.value.lastname;
  this.employeeObj.email = this.FormValue.value.email;
  this.employeeObj.mobile = this.FormValue.value.mobile;
  this.employeeObj.salary = this.FormValue.value.salary;
  this.api.postEmployee(this.employeeObj).subscribe(res=>{
    console.log("res",res);
    alert("Emplyee Added Successfully!");
    this.getAllEmployee();
    let ref = document.getElementById("cancel")
    ref?.click();
    this.FormValue.reset();
  },err=>{
    alert("Something Went Wrong");
  });
}
getAllEmployee(){
  this.api.getEmployee().subscribe((res)=>{
  console.log("getting data",res);
    this.emplyeeData = res
  })
}
deleteEmployee(id:any){
  this.api.deleteEmployee(id).subscribe((res)=>{
      alert('Employee Deleted successfully');
      this.getAllEmployee();
  })
}
editEmployee(item:any){
  this.showAdd = false;
  this.showUpdate = true;
  this.employeeObj.id = item.id
  this.FormValue.controls['firstname'].setValue(item.firstname);
  this.FormValue.controls['lastname'].setValue(item.lastname);
  this.FormValue.controls['email'].setValue(item.email);
  this.FormValue.controls['mobile'].setValue(item.mobile);
  this.FormValue.controls['salary'].setValue(item.salary);
}
updateEmployee(){
  this.employeeObj.firstname = this.FormValue.value.firstname;
  this.employeeObj.lastname = this.FormValue.value.lastname;
  this.employeeObj.email = this.FormValue.value.email;
  this.employeeObj.mobile = this.FormValue.value.mobile;
  this.employeeObj.salary = this.FormValue.value.salary;
  this.api.updateEmployee(this.employeeObj,this.employeeObj.id).subscribe((res)=>{
    alert("Updated Successfulllly!");
    let ref = document.getElementById("cancel")
    ref?.click();
    this.FormValue.reset();
    this.getAllEmployee();
  })
}
}
