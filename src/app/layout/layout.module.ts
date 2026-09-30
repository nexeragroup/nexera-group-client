import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { MainLayout } from './components/main-layout/main-layout';

const COMPONENTS = [Header, Footer, MainLayout];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, RouterModule],
  exports: COMPONENTS,
})
export class LayoutModule {}
