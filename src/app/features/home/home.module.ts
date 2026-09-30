import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './pages/home-page/home-page';

@NgModule({
  declarations: [HomePage],
  imports: [HomeRoutingModule, SharedModule],
})
export class HomeModule {}
