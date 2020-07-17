import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'news',
    loadChildren: () => (
      import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    )
  },
  {
    path: '**',
    redirectTo: 'news'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
