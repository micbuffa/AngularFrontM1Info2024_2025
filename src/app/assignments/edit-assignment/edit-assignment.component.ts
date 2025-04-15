import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
 selector: 'app-edit-assignment',
 standalone: true,
 providers: [provideNativeDateAdapter()],
 imports: [
   FormsModule,
   MatInputModule,
   MatFormFieldModule,
   MatDatepickerModule,
   MatButtonModule,
 ],
 templateUrl: './edit-assignment.component.html',
 styleUrl: './edit-assignment.component.css',
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment | undefined;
  // Pour les champs de formulaire
  assignmentName = '';
  dueDate?: Date = undefined;
 
  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route:ActivatedRoute
  ) {}
 
  ngOnInit() {
    // On va récupérer l'id dans la route (dans l'URL)
    // on récupère l'assignment à modifier
    const id = this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id)
    .subscribe(a => {
      this.assignment = a;
      if (this.assignment) {
        this.assignmentName = this.assignment.name;
        this.dueDate = this.assignment.dueDate;
      }
    });
  }
  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.assignmentName == '' || this.dueDate === undefined) return;
 
    // on récupère les valeurs dans le formulaire
    this.assignment.name = this.assignmentName;
    this.assignment.dueDate = this.dueDate;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
 
        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }
 }
 
 