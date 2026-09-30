import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePage,
    title: 'Nexera Group',
    data: {
      seo: {
        title: 'Nexera Group',
        description:
          'Nexera Group builds reliable, scalable, and secure software solutions for startups, businesses, and enterprises.',
        keywords:
          'Nexera Group, software development Rwanda, Angular, NestJS, DevOps, cloud engineering, system architecture',
        image: '/icons/icon-192.png',
        url: '/',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
