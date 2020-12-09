import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private jwtService: JwtService, private router: Router, private formBuilder: FormBuilder,private _auth:AuthService) { }
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

  login1() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.jwtService.login(this.loginForm.value);
    this.router.navigateByUrl('/admin');
  }
  login() : void {
    console.log(this.loggedUser)
      this._auth.login(this.loggedUser)
      .subscribe(
        res=>{
          console.log(res)
          localStorage.setItem('token',res.token)
          this.router.navigate(['/event'])
        },
        err=>console.log(err))
    }
}

