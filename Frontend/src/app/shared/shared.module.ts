import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutusComponent } from './components/aboutus/aboutus.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AboutusComponent, NavBarComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavBarComponent],
})
export class SharedModule {}
