import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Project } from './interfaces/project';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { StatusBadgeComponent } from "./components/status-badge/status-badge.component";
import { NgStyle } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpService } from './services/http.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [MatTableModule, MatPaginatorModule, MatInputModule, MatIconModule, MatButtonModule, StatusBadgeComponent, NgStyle]
})

export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['name', 'number', 'status'];
  dataSource = new MatTableDataSource<Project>();
  subscription: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private httpService: HttpService) {}

  // Subscription a l'observable pour chercher la liste des projets
  ngOnInit(): void {
    this.subscription = this.httpService.getProjects().subscribe((res) => {
      this.dataSource = new MatTableDataSource<Project>(res);
    })

    // Assigner la fonction personnalisee de filtrage
    this.dataSource.filterPredicate = customFilter;
  }

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
    this.dataSource.filter = value;
  }

  // Se désabonner
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}

// Filtrer seulement sur le nom et le numero de projet
const customFilter = (data : Project, filterValue : string) => {
  const filter = filterValue.trim().toLowerCase();
  return data.name.toLowerCase().includes(filter) || data.projectNumber.toString().toLowerCase().includes(filter);
}

// Traduire l'intervalle en francais
const frenchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 de ${length}`; }

  const startIndex = page * pageSize;

  // L'index de fin est le nombre le plus petit sans dépasser la longueur des items 
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1}-${endIndex} de ${length}`;
}
