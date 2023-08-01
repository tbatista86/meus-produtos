// login.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginRequest } from 'src/app/models/loginReques';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;
  public projectName = 'Meus Produtos';
  private loginSub!: Subscription;
  public user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) {}

  public ngOnInit() {
    this.init();
  }

  private init(): void {
    const userLogged = this.authService.isAuthenticated();

    if (userLogged) {
      this.route.navigateByUrl('/dashboard');
      return;
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, 'X');
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      let loginRequest: LoginRequest = new LoginRequest({
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      });
      this.loginSub = this.authService.login(loginRequest).subscribe((res) => {
        this.user = res.user;
      });
      this.route.navigateByUrl('/dashboard');
    } else {
      this.openSnackBar('ALgo deu errado =( -  Tente novamente mais tarde.');
    }
  }

  public register() {
    this.route.navigateByUrl('/register');
  }

  public ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
