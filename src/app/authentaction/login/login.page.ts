import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private formBuilder: FormBuilder;
  form: FormGroup<any>;
  constructor(private router: Router, private fromBuild: FormBuilder) {
    this.formBuilder = fromBuild;
    this.form = this.createForm();
  }

  ngOnInit() {
    this.form = this.createForm();
  }

  login() {
    this.router.navigate(['home']);
  }
  register() {
    this.router.navigate(['sign-up']);
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
