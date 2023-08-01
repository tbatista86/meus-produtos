import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
})
export class RegisterModule {}
