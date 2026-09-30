import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioPage } from './pages/portfolio-page/portfolio-page';

const routes: Routes = [
  {
    path: '',
    component: PortfolioPage,
    title: 'Our Portfolio | Nexera Group',
    data: {
      seo: {
        title: 'Our Portfolio | Nexera Group',
        description: 'Explore software products and digital platforms built by Nexera Group.',
        keywords: 'Nexera Group portfolio, software projects Rwanda, digital products',
        image: '/icons/icon-192.png',
        url: '/portfolio',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortfolioRoutingModule {}
