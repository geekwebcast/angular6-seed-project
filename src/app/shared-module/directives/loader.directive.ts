import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoaderService } from '@app/shared-module/sharedServices/loader.service';

@Directive({
  selector: '[showLoader]'
})
export class LoaderDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private loaderService: LoaderService
  ) {}

  condition: boolean;

  ngOnInit() {
      this.loaderService.status.subscribe((val: boolean) => {
           if (val && this.condition || !val && !this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
        });
  }

  @Input() set showLoader(condition: boolean) {
    this.condition = condition;
  }

}