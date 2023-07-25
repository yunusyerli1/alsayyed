import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-responsive',
  templateUrl: './sidebar-responsive.component.html',
  styleUrls: ['./sidebar-responsive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarResponsiveComponent {
  @Input() menuItems:any;
  isButtonClicked:boolean = false;

}
