import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesPage } from './pages/services-page/services-page';

const routes: Routes = [
  {
    path: '',
    component: ServicesPage,
    title: 'Software Engineering Services | Nexera Group',
    data: {
      seo: {
        title: 'Software Engineering Services | Nexera Group',
        description:
          'Nexera Group provides custom software development, SaaS development, DevOps, cloud engineering, system modernization, AI solutions, and software maintenance.',
        keywords:
          'software development services, SaaS development, DevOps Rwanda, cloud engineering, AI software, system modernization, Nexera Group',
        image: '/icons/icon-192.png',
        url: '/services',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
