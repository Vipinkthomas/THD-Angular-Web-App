import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder,private _auth:AuthService) { }
  minPw = 8;
  loginForm: FormGroup;
  isSubmitted = false;
  loggedUser={
    email: '',
    password:''
  };

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(this.minPw)]]
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }


  login() : void {
    console.log(this.loggedUser)
      this._auth.login(this.loggedUser)
      .subscribe(
        res=>{
          console.log(res)
          localStorage.setItem('token',res.token)
          sessionStorage.setItem('role',res.role)
          sessionStorage.setItem('name',this.loginForm.controls['username'].value)
          this.router.navigate(['/admin'])
        },
        err=>console.log(err))
    }
}

