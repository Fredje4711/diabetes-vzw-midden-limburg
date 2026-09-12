# Zoekmachines en publicatie

## Huidig websiteadres

https://fredje4711.github.io/diabetes-vzw-midden-limburg/

De site blijft statische HTML, CSS en JavaScript. De zichtbare vormgeving, menunamen en ankerpunten zijn niet veranderd voor SEO.

## Sitemap

Bestand: `C:\laragon\www\diabetes-vzw-midden-limburg\sitemap.xml`

Online: https://fredje4711.github.io/diabetes-vzw-midden-limburg/sitemap.xml

De sitemap bevat de unieke voorkeursadressen van inhoudelijke pagina's. Doorverwijzingen, interne overzichten, overlegpagina's en verouderde scanneruitleg staan er niet in. Twee inhoudelijk identieke voedingsartikelen verwijzen met hun canonical naar de versie in de verdiepingsmap; beide oude adressen blijven bruikbaar. Niet-identieke artikelen behouden hun eigen adres.

Ankers zijn deelbare onderdelen van een pagina en komen niet als afzonderlijke pagina's in de XML-sitemap. Hun bestaande adressen blijven werken en staan in het ankerlinkoverzicht.

Er staan bewust geen fictieve lastmod-datums, priority- of changefreq-waarden in de sitemap. Google negeert die laatste twee; een onjuiste wijzigingsdatum helpt niet.

## Paginagegevens

- Elke inhoudelijke pagina heeft een titel, beschrijving en absoluut voorkeursadres (canonical).
- Herhaalde metabeschrijvingen bij de voedingstijdlijn zijn vervangen door beschrijvingen van het specifieke onderwerp, zonder de medische inhoud te wijzigen of te herbevestigen.
- Open Graph-gegevens voorzien titel, beschrijving, adres en afbeelding voor delen op sociale media. De ontvangende dienst beslist hoe die worden weergegeven.
- De verkeerde browsertitel 'Gezellige fietstocht' bij de culturele uitstap is gecorrigeerd.
- Het interne ankerlinkoverzicht, de huisstijlvoorstellen en oude scanneruitleg hebben noindex, follow. Dat is geen wachtwoordbeveiliging.
- Lokale bestuursdemonstraties en werkbestanden worden niet naar GitHub meegenomen. Het bestaande GitHub Pages-publicatieproces sluit ook de interne rapporten uit via _config.yml.

## Google Search Console afronden

1. Open https://search.google.com/search-console/ en meld zelf aan met het Google-account dat de vereniging hiervoor wil gebruiken.
2. Voeg een property van het type **URL-voorvoegsel** toe, niet het domeintype. Vul exact in: `https://fredje4711.github.io/diabetes-vzw-midden-limburg/`.
3. Kies als verificatiemethode **HTML-tag**. Kopieer de volledige door Google opgegeven meta-tag en geef die aan Codex. Deel geen wachtwoord, herstelcode of aanmeldcode.
4. Codex kan die verificatietag in de homepage plaatsen en publiceren. Ga pas daarna terug naar Google en klik op Verifiëren. Laat de tag ook na succesvolle verificatie staan.
5. Ga in Search Console naar **Sitemaps**. Dien `sitemap.xml` in onder het hierboven genoemde websiteadres.
6. Controleer of Google de sitemap kan lezen. Met URL-inspectie kan vervolgens de homepage worden gecontroleerd en, indien nodig, indexering worden aangevraagd.

Indexering en posities zijn beslissingen van Google. Een sitemap, verificatie of verzoek tot indexering garandeert geen opname of snelle plaatsing. De technische werkzaamheden betekenen ook niet dat Google al is gekoppeld: de accountaanmelding en verificatie moeten werkelijk afgerond zijn.

### Waarom geen robots.txt in deze projectmap?

Voor deze GitHub-projectsite zou een robots.txt op `fredje4711.github.io/diabetes-vzw-midden-limburg/robots.txt` niet de robots.txt van de host zijn. Zoekmachines gebruiken daarvoor `https://fredje4711.github.io/robots.txt`. Dat bestand valt buiten deze repository. Daarom gebruiken we hier pagina-noindex waar nodig en dienen we de sitemap rechtstreeks in Search Console in. Plaats niet zomaar blokkades in een robots.txt van een andere repository.

## Een nieuwe pagina toevoegen

1. Geef de pagina een passende, unieke titel en beschrijving.
2. Zet de absolute canonical op het definitieve publieke adres. Bij een index.html in een map gebruiken we het mapadres met afsluitende slash.
3. Voeg hetzelfde adres één keer als loc-element toe aan sitemap.xml, mits de pagina publiek geïndexeerd moet worden.
4. Zorg voor een gewone aanklikbare interne link naar de pagina.
5. Controleer dat het adres werkt, niet doorverwijst en geen noindex bevat. Publiceer de pagina en bijgewerkte sitemap samen.
6. Pas bij gewijzigde titels of beschrijvingen ook og:title en og:description aan.

## Later een eigen domein

Een eigen domein kan met GitHub Pages worden gebruikt; betaalde webhosting is daarvoor niet noodzakelijk. Bij een domeinwissel moeten canonical-adressen, og:url, og:image en de sitemap gezamenlijk worden aangepast. Behoud bestaande paden en ankers waar mogelijk. Verifieer het nieuwe domein en de relevante nieuwe Search Console-property en controleer doorverwijzingen voordat het oude adres wordt losgelaten.

## Bronnen

- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/crawling-indexing/robots/intro
- https://support.google.com/webmasters/answer/9008080
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages
