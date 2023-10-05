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
  login,
  loginFailure,
  loginSuccess,
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
        this.error(loginstate);
        this.toggleLogin(loginstate);
        this.isLogginIn(loginstate);
        this.toggleLoggedIn(loginstate);
      });
  }

  private toggleLogin(loginstate: LoginState) {
    if (loginstate.isLoggingIn || loginstate.isRecoveringPassword) {
      this.store.dispatch(Show());
    } else {
      this.store.dispatch(Hide());
    }
  }
  private toggleLoggedIn(loginstate: LoginState) {
    if (loginstate.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }

  private isLogginIn(loginstate: LoginState) {
    if (loginstate.isLoggingIn) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          this.store.dispatch(loginSuccess({ user: response }));
        },
        (error) => {
          this.store.dispatch(loginFailure({ error: error }));
        }
      );
    }
  }
  private isRecoveringPassword(loginstate: LoginState) {
    if (loginstate.isRecoveringPassword) {
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

  private async error(loginstate: LoginState) {
    if (loginstate.error) {
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
      const toast = await this.toastController.create({
        position: 'top',
        message: ' recovered email send check your email',
        color: 'primary',
      });
      toast.present();
    }
  }
  login() {
    this.store.dispatch(login());
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
