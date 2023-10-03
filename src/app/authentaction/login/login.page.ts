import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/appState';
import { Hide, Show } from 'src/store/loading/loading.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private formBuilder: FormBuilder;
  form: FormGroup<any>;
  constructor(
    private router: Router,
    private fromBuild: FormBuilder,
    private store: Store<AppState>
  ) {
    this.formBuilder = fromBuild;
    this.form = this.createForm();
  }

  ngOnInit() {
    this.form = this.createForm();
  }

  login() {
    this.store.dispatch(Show());

    setTimeout(() => {
      this.store.dispatch(Hide());
      this.router.navigate(['home']);
    }, 2000);
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
