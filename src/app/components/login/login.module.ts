import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterModule } from '../register/register.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule, RegisterModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
