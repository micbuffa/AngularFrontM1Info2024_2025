import { Component } from '@angular/core';

@Component({
  selector: 'app-assignments',
  imports: [],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent {
  title = "This is the list of assignments :"
  assignments = [
    {
      name: "Assignment 1",
      dueDate: "2021-01-01",
      submitted: false
    },
    {
      name: "Assignment 2",
      dueDate: "2021-02-01",
      submitted: false
    },
    {
      name: "Assignment 3",
      dueDate: "2021-03-01",
      submitted: false
    }
  ];
}
