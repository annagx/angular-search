import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { PROJECTS } from './constants';
import { Project } from './interfaces/project';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { StatusBadgeComponent } from "./components/status-badge/status-badge.component";
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [MatTableModule, MatPaginatorModule, MatInputModule, MatIconModule, StatusBadgeComponent, NgStyle]
})

export class AppComponent implements AfterViewInit {
  displayedColumns: string[] = ['nom', 'no', 'statut'];
  projects: Project[] = [];
  dataSource = new MatTableDataSource<Project>(PROJECTS);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Configurer le paginator en francais
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Éléments par page';
    this.paginator._intl.firstPageLabel = 'Première page';
    this.paginator._intl.lastPageLabel = 'Dernière page';
    this.paginator._intl.nextPageLabel = 'Page suivante';
    this.paginator._intl.previousPageLabel = 'Page précédente';
    this.paginator._intl.getRangeLabel = frenchRangeLabel;
  }

  applyFilter(value: string) {
    const filterValue = value;
    this.dataSource.filter = filterValue;
  }
}

// Traduire l'intervalle en francais
const frenchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 de ${length}`; }
  
  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1}-${endIndex} de ${length}`;
}
