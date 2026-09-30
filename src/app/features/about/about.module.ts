import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AboutRoutingModule } from './about-routing.module';
import { AboutPage } from './pages/about-page/about-page';

@NgModule({
  declarations: [AboutPage],
  imports: [AboutRoutingModule, SharedModule],
})
export class AboutModule {}
