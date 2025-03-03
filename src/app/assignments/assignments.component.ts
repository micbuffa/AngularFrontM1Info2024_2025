import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmittedDirective } from '../shared/submitted.directive';
import { NotSubmittedDirective } from '../shared/not-submitted.directive';
@Component({
  selector: 'app-assignments',
  imports: [CommonModule, SubmittedDirective, NotSubmittedDirective],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent {
  title = "This is the list of assignments :"
  assignments = [
    {
      name: "Assignment 1",
      dueDate: "2021-01-01",
      submitted: true
    },
    {
      name: "Assignment 2",
      dueDate: "2021-02-01",
      submitted: true
    },
    {
      name: "Assignment 3",
      dueDate: "2021-03-01",
      submitted: false
    }
  ];

  getColor(a: any) {
    return a.submitted ? 'lightgreen' : 'lightcoral';
  }
}
