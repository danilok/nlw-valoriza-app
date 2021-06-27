import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private metaService: Meta) {
    this.metaService.addTags([
      { name: 'title', content: 'NLW Valoriza - NLW #6' },
      { name: 'description', content: 'NLW Valoriza - NLW #6' },
      { name: 'keywords', content: 'angular, javascript, typescript, meta, seo, rocketseat, nlw, node' },
      { itemprop: 'name', content: 'NLW Valoriza - NLW #6' },
      { itemprop: 'description', content: 'NLW-VALORIZA - Reconheça seus amigos com tags' },
      { itemprop: 'image', content: 'https://rocketseat.com.br/og/rocketseat.png' },
      { property: 'twitter:title', content: 'NLW Valoriza - NLW #6' },
      { property: 'twitter:description', content: 'NLW-VALORIZA - Reconheça seus amigos com tags' },
      { property: 'twitter:image', content: 'https://rocketseat.com.br/og/rocketseat.png' },
      { property: 'og:title', content: 'NLW Valoriza - NLW #6' },
      { property: 'og:description', content: 'NLW-VALORIZA - Reconheça seus amigos com tags' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://rocketseat.com.br/og/rocketseat.png' },
      { property: 'og:url', content: 'https://nlw-valoriza-app.vercel.app' },
    ]);
  }
}
