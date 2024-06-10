import { Component, Input, OnInit } from '@angular/core';
import { STATUS, StatusCode } from '../../constants';
import { StatusDetails } from '../../interfaces/status-details';
import { NgStyle } from '@angular/common';
import { Theme } from '../../interfaces/theme';

const TRANSPARENT = 'transparent';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss'
})
export class StatusBadgeComponent implements OnInit{
  @Input() statusCode: number;
  myStatus: StatusDetails;
  text: string = '';
  theme: Theme;

  // Trouver le status correspond et ses details
  ngOnInit(): void {
    this.myStatus = STATUS.find(status => status.id == this.statusCode) || STATUS[StatusCode.Creation];
    this.text = this.myStatus.text;
    this.theme = this.myStatus.theme;
  }

  getTheme() {
    const borderColor = this.statusCode === StatusCode.Inactive ? this.theme.textColor : TRANSPARENT;
    
    return {
      'color': this.theme.textColor,
      'background-color': this.theme.backgroundColor,
      'width': 'fit-content',
      'padding' : '2% 9%',
      'border-radius': '50px',
      'border': '1px solid',
      'border-color': borderColor,
    };
  }
}
