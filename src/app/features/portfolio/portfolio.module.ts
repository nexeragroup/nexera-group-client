import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PortfolioPage } from './pages/portfolio-page/portfolio-page';
import { PortfolioRoutingModule } from './portfolio-routing.module';

@NgModule({
  declarations: [PortfolioPage],
  imports: [PortfolioRoutingModule, SharedModule],
})
export class PortfolioModule {}
