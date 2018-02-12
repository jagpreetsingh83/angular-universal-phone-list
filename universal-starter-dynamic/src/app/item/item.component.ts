import {
  Component,
  OnDestroy,
  Input,
  Inject,
  Injector,
  PLATFORM_ID
} from '@angular/core';
import {DummyService} from '../dummy.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Item} from '../item';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {isPlatformBrowser} from '@angular/common';
import {TransferState, makeStateKey} from '@angular/platform-browser';

const PRICE_KEY = makeStateKey < string > ('price');

@Component({selector: 'app-item', templateUrl: './item.component.html', styleUrls: ['./item.component.css']})
export class ItemComponent implements OnDestroy {

  price : string;
  priceSubscription : Subscription;
  loading : boolean = false;
  closeResult : string;

  @Input()phone : Item;

  private modalService : NgbModal;

  constructor(private dummyService : DummyService, @Inject(PLATFORM_ID)private platformId : Object, private injector : Injector, private state : TransferState) {
    this.initPriceSubscription();
    // Hack to save from > Error: No component factory found for NgbModalBackdrop
    if (isPlatformBrowser(this.platformId)) {
      this.modalService = this
        .injector
        .get(NgbModal);
    }
  }

  open(content) {
    this
      .modalService
      .open(content, {windowClass: 'dark-modal'});
  }

  initPriceSubscription() {
    this.price = this
      .state
      .get(PRICE_KEY, 'Not Available');
    if (this.price === '' || this.price === 'Not Available') {
      this.loading = true;
      this.priceSubscription = this
        .dummyService
        .getPrice()
        .subscribe(p => {
          this.price = p;
          this
            .state
            .set(PRICE_KEY, p);
          this.loading = false;
        });
    }
  }

  ngOnDestroy() {
    if (this.priceSubscription) {
      this
        .priceSubscription
        .unsubscribe();
    }
  }
}
