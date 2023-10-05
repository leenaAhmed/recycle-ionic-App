import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/appState';
import { Hide, Show } from 'src/store/loading/loading.action';
import {
  RecoveredPassword,
  RecoveredPassworedFailure,
  RecoveredPassworedSuccess,
} from 'src/store/login/login.action';
import { ToastController } from '@ionic/angular';
import { LoginState } from 'src/store/login/loginState';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  private formBuilder: FormBuilder;
  form: FormGroup<any>;
  loginStateSubscription!: Subscription;
  constructor(
    private router: Router,
    private fromBuild: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private authService: AuthService
  ) {
    this.formBuilder = fromBuild;
    this.form = this.createForm();
  }
  ngOnDestroy(): void {
    this.loginStateSubscription.unsubscribe();
  }

  ngOnInit() {
    this.form = this.createForm();
    this.loginStateSubscription = this.store
      .select('login')
      .subscribe(async (loginstate) => {
        this.isRecoveringPassword(loginstate);
        this.isRecoveredPasswordSucess(loginstate);
        this.isRecoveringPasswordFail(loginstate);
      });
  }

  private isRecoveringPassword(loginstate: LoginState) {
    if (loginstate.isRecoveringPassword) {
      this.store.dispatch(Show());
      this.authService
        .recoverEmailAndPassword(this.form.get('email')?.value)
        .subscribe(
          (response) => {
            this.store.dispatch(RecoveredPassworedSuccess());
          },
          (error) =>
            this.store.dispatch(
              RecoveredPassworedFailure({ error: 'email not found' })
            )
        );
    }
  }

  private async isRecoveringPasswordFail(loginstate: LoginState) {
    if (loginstate.error) {
      this.store.dispatch(Hide());
      const toast = await this.toastController.create({
        position: 'top',
        message: loginstate.error,
        color: 'danger',
      });
      toast.present();
    }
  }

  private async isRecoveredPasswordSucess(loginstate: LoginState) {
    if (loginstate.isRecoveredPassword) {
      this.store.dispatch(Hide());
      const toast = await this.toastController.create({
        position: 'top',
        message: ' recovered email send check your email',
        color: 'primary',
      });
      toast.present();
    }
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

  forgetEmailPassword() {
    this.store.dispatch(RecoveredPassword());
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
