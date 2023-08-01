import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // {
  //   path: 'dashboard',
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./components/dashboard/dashboard.module').then(
  //       (m) => m.DashBoardModule
  //     ),
  // },
  {
    path: 'cadastro/usuario',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'cadastro/produtos',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
