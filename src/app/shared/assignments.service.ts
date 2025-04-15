import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { dbInitialAssignments } from './data';  

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  BACKEND_URI = "http://localhost:8010/api/assignments";
  assignments:Assignment[] = [];
  
  constructor(private http:HttpClient) { }

  getAssignments():Observable<any> {
    console.log("Service:getAssignments appelée !");
    
    // On utilise la methode get du service HttpClient
    // pour récupérer les données depuis le backend
    return this.http.get<any>(this.BACKEND_URI);
  }

  getAssignment(id:string):Observable<Assignment|undefined> {
    // get assignment by id from this.assignments


    return this.http.get<Assignment>(this.BACKEND_URI + "/" + id);
  }

  addAssignment(assignment:Assignment):Observable<string> {
    // On ajoute l'assignment passé en paramètres
   return this.http.post<string>(this.BACKEND_URI, assignment);
    
  }

  updateAssignment(assignment:Assignment):Observable<string> {
    // On met à jour l'assignment passé en paramètres
    return of("Assignment mis à jour avec succès !");
  }

  deleteAssignment(assignment:Assignment):Observable<string> {
    // On supprime l'assignment passé en paramètres
    
    let index = this.assignments.indexOf(assignment);
    this.assignments.splice(index, 1);

    return of("Assignment supprimé avec succès !");
  }

  populateDBWithTestData():Observable<any> {
    let callsToddAssignment:Observable<any>[] = [];

    // we're going to iterate over the dbInitialAssignments array
    // and add each assignment to the web service
    for(let i=0; i<dbInitialAssignments.length; i++) {
      // let's create a new assignment
      let a = new Assignment();
      a.name = dbInitialAssignments[i].name;
      a.dueDate = new Date(dbInitialAssignments[i].dueDate);
      a.submitted = dbInitialAssignments[i].submitted;

      // let's add the results of the calls to addAssignment in an array
      // this is an array of Observables
      callsToddAssignment.push(this.addAssignment(a));

      // and use the rxjs forkJoin operator to execute all the calls in parallel
      // and wait for all the calls to finish
    }
    return forkJoin(callsToddAssignment); 
  }
}
