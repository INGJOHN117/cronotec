import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDinamicHost]'
})
export class DinamicHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
