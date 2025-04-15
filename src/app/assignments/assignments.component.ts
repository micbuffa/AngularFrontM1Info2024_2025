import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmittedDirective } from '../shared/submitted.directive';
import { NotSubmittedDirective } from '../shared/not-submitted.directive';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Router, RouterLink } from '@angular/router';

import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
@Component({
  selector: 'app-assignments',
  imports: [CommonModule, FormsModule, MatInputModule,
    MatButtonModule, ScrollingModule, MatFormFieldModule, MatDatepickerModule, MatListModule, RouterLink],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css',
  providers: [provideNativeDateAdapter()]
})
export class AssignmentsComponent implements OnInit {
  title = "This is the list of assignments :"
  // for pagination
  totalDocs:number=0;
  limit:number=10;
  page:number =0;
  totalPages:number= 0;
  pagingCounter:number=0;
  hasPrevPage:boolean= false;
  hasNextPage:boolean= true;
  prevPage:number=0;
  nextPage:number=2;

  assignments: Assignment[] = [];

  // Attention, pour l'injection de service, mettre en private !!! Sinon
  // ça ne marche pas
  constructor(private assignementsService: AssignmentsService,
    private router: Router) { }

  ngOnInit() {
    console.log("ngOnInit called before render");

    // get assignments from service
    this.getAssignments();
  }

  getAssignments() {
    this.assignementsService.getAssignments()
      .subscribe(data => {
        this.assignments = data.docs;
        // get all other pagination data
        this.totalDocs = data.totalDocs;
        this.limit = data.limit;
        this.page = data.page;
        this.totalPages = data.totalPages;
        this.pagingCounter = data.pagingCounter;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        this.prevPage = data.prevPage;
        this.nextPage = data.nextPage;


      });
    console.log("APRES L'APPEL AU SERVICE");
  }


  getColor(a: any) {
    return a.submitted ? 'lightgreen' : 'lightcoral';
  }

  

}
