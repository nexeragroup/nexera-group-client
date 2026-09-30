import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesPage } from './pages/services-page/services-page';

@NgModule({
  declarations: [ServicesPage],
  imports: [ServicesRoutingModule, SharedModule],
})
export class ServicesModule {}
