import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/store/appState';
import { LoadingState } from 'src/store/loading/loadingState';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  loadingState$: Observable<LoadingState> | undefined;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.loadingState$ = this.store.select('loading');
  }
}
