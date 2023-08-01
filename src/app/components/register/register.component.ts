import { Subscription } from 'rxjs';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserRequest } from 'src/app/models/userRequest';
import { UsersService } from 'src/app/clients/users.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserResponse } from 'src/app/models/userResponse';

function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password?.value !== confirmPassword?.value) {
    return { passwordMismatch: true };
  }

  return null;
}

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  cadastroForm!: FormGroup;
  projectName = 'Meus Produtos';
  matcher = new CustomErrorStateMatcher();
  createUserSub!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  private createUserForm(): void {
    this.cadastroForm = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator }
    );
  }

  public ngOnInit(): void {
    this.createUserForm();
  }

  public ngOnDestroy(): void {
    if (this.createUserSub) {
      this.createUserSub.unsubscribe;
    }
  }

  public onSubmit(): void {
    if (this.cadastroForm.valid) {
      const newUser = new UserRequest({
        name: this.cadastroForm.value.nome,
        email: this.cadastroForm.value.email,
        password: this.cadastroForm.value.password,
      });

      let user: User = new User({});

      this.createUserSub = this.userService
        .createUser(newUser)
        .subscribe((response: UserResponse) => {
          debugger;
          user = response.user;
          this.cadastroForm.reset();
          this.router.navigate(['/login']);
          this.openSnackBar(`usuário ${user.name} criado com sucesso`);
        });
    } else {
      if (this.cadastroForm.errors?.['passwordMismatch']) {
        this.cadastroForm.get('confirmPassword')?.setErrors({});
      }
    }
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, 'X');
  }

  public onCancel(): void {
    this.router.navigateByUrl('/');
  }
}
