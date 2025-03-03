import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import {AssignmentsComponent} from './assignments/assignments.component';


@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, AssignmentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Assignment Manager Application';
}
