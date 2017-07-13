import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ComicsPage } from '../comics/comics';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ComicsPage;
  tab2Root = AboutPage;
  constructor() {

  }
}
