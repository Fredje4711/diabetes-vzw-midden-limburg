# Uitgevoerde verbeteringen — 12 september 2026

## Resultaat

- Homepage: op verzoek is de oorspronkelijke hero-opmaak hersteld, zonder het toegevoegde donkere tekstvlak en met de oorspronkelijke tekststijl. De lichtere WebP-afbeelding blijft behouden.
- Contact: grotere mobiele tekst en ruimere e-maillinks.
- Footer: de e-mailknop toont het volledige adres op één regel, met een kleinere lettergrootte die zich aan de kolombreedte aanpast en behoud van een klikhoogte van 44 pixels. Gecontroleerd op vijftien breedtes van 320 tot 1920 pixels, inclusief omslagpunten van de footerindeling.
- Diabetesklok: tabletindeling in twee rijen; labels blijven leesbaar.
- Mythen en feiten: grotere tekst, beter tekstcontrast, behoud van de grote symbolen, twee kolommen op gsm en drie op tablet. Kaarten kunnen meegroeien bij vergrote tekst. Een lang antwoord wordt volledig getoond zonder intern scrollvak. De toegankelijke naam volgt de zichtbare kaartzijde.
- 100 vragen: grotere en donkerdere categorietitels, met behoud van de compacte knoppen.
- Rijbewijs: leesbare mobiele informatietekst, keuzelijst en FAQ.
- Menu: Escape brengt de toetsenbordfocus terug naar de bijbehorende menuknop.
- Risicotest: expliciete uitleg dat de website geen mail verstuurt. E-mailbezorging verloopt via een medewerker met wie dit is afgesproken. De bestaande invulvelden, toestemming en PDF-functie blijven behouden.

## Gewijzigde bestanden

Alle onderstaande paden liggen onder `C:\laragon\www\diabetes-vzw-midden-limburg`.

Functionele wijzigingen:

- `site/css/main.css`
- `site/js/navigation.js`
- `mythen-en-feiten/index.html`
- `mythen-en-feiten/style.css`
- `mythen-en-feiten/script.js`
- `diabetes-100-vragen/index.html`
- `diabetes-en-rijbewijs/index.html`
- `risicotest-diabetes/index.html`

Afbeeldingsverwijzingen en versienummers van CSS/menucode:

- `index.html`
- `ankerlinks.html`
- `apps/installeren.html`
- `contact.html`
- `cultuur-ontspanning.html`
- `downloads.html`
- `fotos.html`
- `infosessies.html`
- `onze-diabetes-apps.html`
- `videos.html`
- `wekelijkse-wandeling.html`

Nieuwe geoptimaliseerde afbeeldingen (de oorspronkelijke PNG-bestanden zijn behouden):

| Bestand in site/image/ | Oorspronkelijk | Nieuwe versie |
| --- | ---: | ---: |
| home-hero-activiteiten.webp | 2.570.387 bytes | 278.058 bytes |
| wekelijkseWandeling.webp | 2.308.327 bytes | 384.606 bytes |
| wandelingWDD.webp | 12.995.428 bytes | 776.074 bytes |
| webLogov3_2.webp | 1.517.219 bytes | 111.670 bytes |

## Controles

- Acht pagina's getest in Chrome op breedtes 320, 390, 768, 800, 1024, 1440 en 1920 pixels.
- Geen horizontale pagina-overloop of afgesneden symbolen in deze controles.
- Alle twaalf kaartantwoorden met Enter geopend en met spatie gesloten; toegankelijke namen en antwoordhoogte gecontroleerd.
- Kaartvoorkanten aanvullend met verdubbelde basislettergrootte gecontroleerd.
- Menu sluiten met Escape en focusterugkeer getest.
- Zoekfunctie van 100 vragen en volledige risicotest met fictieve antwoorden doorlopen.
- Geen JavaScript-fouten tijdens deze tests.
- PDF-afdruk van testresultaat met en zonder e-mailaanvraag: elk één A4-pagina. De versie met aanvraag is ook visueel gecontroleerd.
- Geoptimaliseerde homepage-afbeeldingen laden zonder fouten.
- Geen volledige medische inhoudscontrole of certificering van toegankelijkheid; geen test op een fysiek Samsung-toestel.

## Aanvullende vragen: Google en ALT

Dit is onderzocht maar niet als nieuwe SEO-opdracht uitgevoerd:

- Homepage en infosessies hebben al een paginatitel, metabeschrijving en viewport-instelling.
- In de lokale projectmap is geen sitemap.xml gevonden. Een sitemap en controle via Google Search Console zijn aanbevolen vervolgstappen; daadwerkelijke indexering is niet vastgesteld.
- HTML-scan van 110 bestanden buiten bestuursdemo: 129 img-elementen. Zes ontbrekende ALT-attributen staan in werkbestanden-webtoepassingen. In de overige gescande HTML-bestanden ontbreekt het attribuut niet. Dit is een technische aanwezigheidscontrole, geen volledige inhoudelijke beoordeling van alle beschrijvingen.
- Lege ALT-teksten bij logo's naast organisatienamen en videominiaturen met bijbehorende titel kunnen bewust correct zijn.
- De fotoviewer vult ALT dynamisch met albumnaam en fotonummer. Een beschrijving van de concrete foto kan later informatiever zijn.

## Niet uitgevoerd

- Geen medische teksten veranderd en geen fictieve medische controledatum toegevoegd.
- Geen automatische e-maildienst ingericht.
- Geen SEO-instellingen gewijzigd, sitemap aangemaakt of Search Console gekoppeld.
- Geen bestanden verwijderd, gecommit of gepusht.
- Eerdere wijzigingen aan apps en bestuursdemo zijn behouden. De scripts apps/installeren.js en site/js/apps-overzicht.js waren vooraf al gewijzigd en zijn in deze opdracht niet aangepast.
- Vóór een toekomstige publicatie moeten eventuele verschillen tussen de lokale website en de live GitHub-versie veilig worden samengevoegd; de eerdere analyse signaleerde een live quizpagina die lokaal ontbrak.
