import { Component } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';

@Component({
  selector: 'profile',
  imports: [MenuComponent, ValidationClassesDirective],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
