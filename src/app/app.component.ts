import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatDividerModule, 
    MatIconModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Premier projet Angular';
 
  constructor(private assignmentsService: AssignmentsService, 
    private router:Router) { }

  populateDB() {
    this.assignmentsService.populateDBWithTestData()
    .subscribe(() => {
      console.log("DB populated with test data");
      // And navigate to the home page
      //this.router.navigate(['/home']);
      window.location.reload();
    });
  }
}
