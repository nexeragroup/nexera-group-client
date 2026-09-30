import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ContactPage } from './pages/contact-page/contact-page';
import { ContactRoutingModule } from './contact-routing.module';

@NgModule({
  declarations: [ContactPage],
  imports: [ContactRoutingModule, SharedModule],
})
export class ContactModule {}
