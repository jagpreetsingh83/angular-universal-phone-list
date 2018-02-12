import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DummyService} from '../dummy.service';
import {TransferState, makeStateKey} from '@angular/platform-browser';

const ITEMS_KEY = makeStateKey < Object[] > ('items');

@Component({selector: 'app-container', templateUrl: './container.component.html', styleUrls: ['./container.component.css']})
export class ContainerComponent implements OnDestroy {

  items : Object[] = [];
  itemsSubscription : Subscription;
  loading : boolean = false;

  constructor(private dummyService : DummyService, private state : TransferState) {
    this.initItemsSubscription();
  }

  initItemsSubscription() {
    this.items = this
      .state
      .get(ITEMS_KEY, []);
    if (this.items.length === 0) {
      this.loading = true;
      this.itemsSubscription = this
        .dummyService
        .getItems()
        .subscribe(items => {
          this.items = items;
          this
            .state
            .set(ITEMS_KEY, items);
          this.loading = false;
        });
    }
  }

  ngOnDestroy() {
    if (this.itemsSubscription) {
      this
        .itemsSubscription
        .unsubscribe();
    }
  }

}
