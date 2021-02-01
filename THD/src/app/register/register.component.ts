import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Registration of User component
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  /**
  * constructor
  */
  constructor(private router: Router,private formBuilder: FormBuilder,private _auth:AuthService) { }

/**
 * variables
 */
  minPw = 8;
  registerForm: FormGroup;

/**
 * registered User model
 */
  registeredUser={
    email: '',
    password:''
  };
  
  
/**
 * Component Initialisation executed after constructor
 */
  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(this.minPw)]],
      password2: ['', [Validators.required]],
      username:['',[]]
    }, {validator:(registerForm: FormGroup):ValidationErrors | null => {
      if (registerForm.get('password').value === registerForm.get('password2').value)
        return null;
      else
        return {passwordMismatch: true};
    }});
  }

  /** 
   * getter functions
   */
  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get password2() { return this.registerForm.get('password2'); }

  /** 
   * @example
   * Called on each input in either password field 
   * onPasswordInput()
   *
   * @param {} null 
   * @returns void
   */
  onPasswordInput() {

    if (this.registerForm.hasError('passwordMismatch'))
      this.password2.setErrors([{'passwordMismatch': true}]);
    else
      this.password2.setErrors(null);

  }

  /**
  * @example
  * to get register a user
  * register()
  *
  * @param {} null 
  * @returns response from server
  */
  register() : void {
    if(!this.registerForm.hasError('passwordMismatch')){
      this._auth.register(this.registeredUser)
      .subscribe(
        res=>{
          localStorage.setItem('token',res.token)
          this.router.navigate(['/event'])
        },
        err=>console.log(err))
    }
  }
}

