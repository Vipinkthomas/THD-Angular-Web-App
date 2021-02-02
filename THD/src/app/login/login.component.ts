import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

/**
  * login component 
  */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
  * login class 
  */
export class LoginComponent implements OnInit {

  /**
  * constructor 
  */
  constructor(private router: Router, private formBuilder: FormBuilder,private _auth:AuthService) { }

  /**
  * variables 
  */
  minPw = 8;
  
/**
  * Form
  */
  loginForm: FormGroup;

/**
  * boolean 
  */
  isSubmitted = false;
  loggedUser={
    email: '',
    password:''
  };

  /**
  * run after the constructor 
  */
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(this.minPw)]]
    });
  }

  /**
  * getter functions 
  */
  get username() { return this.loginForm.get('username'); }

  /**
  * getter functions 
  */
  get password() { return this.loginForm.get('password'); }

  /**
  * @example
  * to login
  * login(user)
  *
  * @param {string} user  user info{@link Todo}
  * @returns response from server
  */
  login() : void {
      this._auth.login(this.loggedUser)
      .subscribe(
        res=>{

          /**
          * saving data in local storage 
          */
          localStorage.setItem('token',res.token)
          sessionStorage.setItem('role',res.role)
          sessionStorage.setItem('name',this.loginForm.controls['username'].value)
          this.router.navigate(['/admin'])
        },
        err=>console.log(err))
    }
}

