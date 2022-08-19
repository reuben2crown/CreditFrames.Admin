import { EnumToArrayPipe } from './enum-to-array.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UcfirstPipe } from './ucfirst.pipe';
import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
  declarations: [EnumToArrayPipe, UcfirstPipe, TimeAgoPipe],
  imports: [CommonModule],
  exports: [EnumToArrayPipe, UcfirstPipe, TimeAgoPipe]
})
export class PipesModule {}
