import { FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  constructor(private router: Router,private formBuilder: FormBuilder) { }
  minPw = 8;
  registerForm: FormGroup;

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

  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get password2() { return this.registerForm.get('password2'); }

  /** 
   *  Called on each input in either password field 
   */ 

  onPasswordInput() {

    if (this.registerForm.hasError('passwordMismatch'))
      this.password2.setErrors([{'passwordMismatch': true}]);
    else
      this.password2.setErrors(null);

  }

  register() : void {

    if(this.registerForm.get('username').value == 'admin' && this.registerForm.get('password').value == 'admin1234'){
      console.log("registered")
      //this.router.navigate(["user"]);
    }
    else {
      alert("Invalid credentials");
    }

  }
}

