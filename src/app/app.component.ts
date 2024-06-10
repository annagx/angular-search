import { Component } from '@angular/core';
import { ProjectsTableComponent } from "./components/projects-table/projects-table.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [ProjectsTableComponent]
})

export class AppComponent {}