import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-pickup-card',
  templateUrl: './pickup-card.component.html',
  styleUrls: ['./pickup-card.component.scss'],
})
export class PickupCardComponent implements OnInit {
  @Input() hasHeader = false;
  @Input() hasFooter = false;

  @Input() status: string = '';
  @Input() createdAt: string = '';
  @Input() UpdatedAt: string = '';

  @Input() notes: string = '';
  @Input() icon: string = '';

  @Input() IconColor: string = '';

  constructor() {}

  ngOnInit() {}
}
