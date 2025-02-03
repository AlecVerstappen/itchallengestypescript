# Typescript multiplayer quiz

## Doel

Het doel van deze opdracht is een bestaand project in TypeScript uitbreiden met extra features. Er moet ook gebruik gemaakt worden van branching in Git.

## Setup

De opdracht is gemaakt in TypeScript. Dit is een superset van JavaScript, wat betekent dat elke geldige JavaScript-code ook geldige TypeScript-code is. TypeScript voegt echter statische typecontroles toe aan JavaScript, waardoor het krachtiger en veiliger wordt, vooral voor grote en complexe projecten. Dit helpt bij het opvangen van fouten tijdens het ontwikkelproces en verbetert de codekwaliteit en onderhoudbaarheid.

TypeScript kun je niet zomaar runnen in je browser. Een TypeScriptbestand (.ts) wordt namelijk uitgevoerd op Node.Js. Node.Js is een javascript-omgeving die ons toelaat back-endtoepassingen te ontwikkelen voor oa API’s. Je ontwikkelt een TypeScript-project in een IDE zoals Visual Studio Code of WebStorm. Webstorm ga je ook gebruiken in het tweede jaar voor alle andere vakken van de JavaScript-leerlijn.

Voor deze opdracht kan je dus kiezen of je met Visual Studio Code of WebStorm werkt.

Gebruik onderstaande link om Node.js (en eventueel Webstorm) te installeren. Vanaf EsLint hoef je nu nog niet te installeren: [https://it-graduaten-javascript.netlify.app/lessen/devenv.html](https://it-graduaten-javascript.netlify.app/lessen/devenv.html)

De volledige setup van hoe alles werkt, vind je hieronder:

### Installatie van packages

Open een terminal en voer de volgende commando's uit:

```bash
pnpm install
```

Hiermee worden alle benodigde packages geïnstalleerd.

### Opstarten

Om de app te starten, voer je het volgende commando uit:

```bash
pnpm dev
```

### Testen

#### CI/CD

Deze app bevat een CI/CD pipeline geschreven met behulp van [GitHub Actions](https://docs.github.com/en/actions). Deze pipeline wordt automatisch uitgevoerd bij elke push naar de `main` branch. De pipeline bevat de volgende stappen:

1. Uitchecken van de code
2. Installeren van de benodigde packages
3. Bouwen van de app
4. Unit tests uitvoeren
5. E2E tests uitvoeren

Je vindt deze pipeline terug in het bestand `.github/workflows/build-and-test.yml`.

#### Unit tests

Deze app bevat unit tests geschreven met behulp van [Vitest](https://vitest.dev/). Om de unit tests te starten, voer je het volgende commando uit:

```bash
pnpm vitest
```

Je krijgt nu een overzicht van alle tests en of ze geslaagd zijn. Om dit overzicht te openen in de browser, voer je het volgende commando uit:

```bash
pnpm vitest --ui
```

#### E2E tests

Deze app bevat E2E tests geschreven met behulp van [Playwright](https://playwright.dev/). Om de E2E tests te starten, voer je het volgende commando uit:

```bash
pnpm playwright
```

Dit zal een browser openen en de tests uitvoeren.

## Werking en verduidelijking

### Algemeen

Alle nodige code voor de applicatie bevindt zich in de `src` map. De applicatie is opgedeeld in verschillende onderdelen:
 - `src/models`: Hierin bevinden zich de modellen die gebruikt worden in de applicatie.
 - `src/pages`: Hierin bevinden zich de verschillende Typescript-bestanden die de verschillende pagina's van de applicatie voorstellen.
 - `src/services`: Hierin bevinden zich de services die gebruikt worden in de applicatie.
 - `src/types`: Hierin bevinden zich de types die gebruikt worden in de applicatie.
 - `src/utils`: Hierin bevinden zich de utility functies die gebruikt worden in de applicatie.
 - `src/main.ts`: Dit is het startpunt van de applicatie.
 - `src/global.ts`: Hierin bevinden zich de globale variabelen die gebruikt worden in de applicatie.
 - `index.html`: Dit is de HTML-pagina die de applicatie bevat. Hiermee start de applicatie.

### Utils

In het bestand `src/utils/index.ts` vind je functionaliteit om elementen op de webpagina's te verbergen en te tonen. Daarnaast vind je er ook een methode om een alert te tonen.

## Opdracht

Je zal in deze opdracht gevraagd worden om de bestaande code uit te breiden tot een volledig werkende quiz applicatie. Gebruik de testen om te controleren of je code werkt. Je kan de testen ook gebruiken om te achterhalen wat de gewenste functionaliteit is.

Hierbij nog enkele vereisten:
- Bij het manueel toevoegen van vragen moet je rekening houden met volgende vereisten:
    - Een vraag bestaat uit minstens 5 woorden
    - Er moeten minimaal 2 antwoorden zijn
    - Er moet minimaal 1 correct antwoord zijn
- Bij het toevoegen van een speler(naam) moet je rekening houden met volgende vereisten:
    - Een naam moet uniek zijn
    - Een naam mag niet leeg zijn

Hieronder vind je nog enkele tips om je op weg te helpen:
- Begin met de code voor de modellen en services. Je kan de modellen testen met de unit tests. Eens deze werken, kan je overgaan tot de code voor de pagina's. 
- Begin met het implenteren van een singleplayer quiz. Dit zal je later op weg helpen met de multiplayer quiz.
- Begin met het implenteren van de API-vragen. Dit zal je later op weg helpen met de vragen die je zelf zal toevoegen.

Een volledig werkend voorbeeld vind je terug [op volgende website](https://itc2-multiplayer-quiz.pit-graduaten.be).