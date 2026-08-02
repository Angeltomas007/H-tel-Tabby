# Hotel Tabby — Sito web

Refonte completa del sito dell'Hotel Tabby (Golfo Aranci, Sardegna): sito statico, mobile-first, senza dipendenze da build tool, pronto per essere pubblicato su qualsiasi hosting statico (GitHub Pages, Netlify, Vercel, cPanel...).

## Come vederlo in locale

Nessuna installazione richiesta, è HTML/CSS/JS puro. Basta un server statico qualsiasi, ad esempio:

```bash
python3 -m http.server 8080
# poi apri http://localhost:8080
```

## Architettura del sito (sitemap)

- **`index.html`** — Home: hero con moteur de réservation persistente, punti di forza, anteprima camere, offerte in evidenza, storia dell'hotel, esperienze, recensioni, CTA finale.
- **`camere.html`** — Le 4 tipologie di camera (Classic, Vista Mare, Terrazza, Famiglia) con dettagli, prezzi indicativi e widget di prenotazione.
- **`offerte.html`** — Miglior tariffa garantita, prenota-prima, pacchetto famiglia, pacchetto romantico, sconti soggiorni lunghi.
- **`esperienze.html`** — Escursioni delfini, Arcipelago della Maddalena, centro storico di Golfo Aranci, come arrivare (aeroporto/porto/auto).
- **`contatti.html`** — Modulo di contatto breve (con consenso privacy), contatti rapidi (WhatsApp/telefono/email), mappa (placeholder da integrare), FAQ.
- **`privacy.html`** — Informativa sulla Privacy (GDPR).
- **`cookie-policy.html`** — Cookie Policy (il sito non usa cookie di profilazione né di terze parti).
- **`note-legali.html`** — Note legali e dati societari.

Header, moteur de réservation, footer (con link legali) e i pulsanti di contatto rapido sono presenti su ogni pagina. Un banner informativo cookie/privacy (non invasivo, richiesto una sola volta grazie a `localStorage`) compare al primo caricamento.

## Scelte di design

- **Palette**: sabbia calda, terracotta e blu Mediterraneo — estetica "boutique hotel", calda e attuale.
- **Tipografia**: stack di font di sistema (Georgia per i titoli, system-ui per i testi) — nessuna chiamata a servizi esterni (vedi sezione Sicurezza/RGPD sotto).
- **Mobile-first**: tutto il layout è pensato prima per mobile, poi arricchito su desktop via media query.

## Conversione (CRO)

- Moteur de réservation sempre visibile: nell'hero, come barra sticky su desktop dopo lo scroll, e come CTA fissa in basso su mobile.
- Pulsante di contatto flottante (WhatsApp / telefono / modulo rapido) su tutte le pagine.
- Copy orientato ai vantaggi della prenotazione diretta (tariffa migliore garantita, cancellazione flessibile).

## Sicurezza e conformità RGPD

- **Nessuna chiamata a domini esterni**: il sito non carica più font o script da CDN di terze parti (in precedenza Google Fonts, rimosso: il caricamento di Google Fonts da server esterni è stato oggetto di un provvedimento del Garante Privacy italiano per trasferimento non consentito dell'IP dei visitatori). Tutto è servito dal proprio dominio.
- **Nessun cookie di profilazione o di tracciamento**: nessun Google Analytics, nessun pixel pubblicitario. Il banner mostrato al primo accesso è puramente informativo.
- **Pagine legali** (`privacy.html`, `cookie-policy.html`, `note-legali.html`) già scritte e collegate nel footer di ogni pagina. Contengono campi `DA COMPLETARE` (evidenziati in giallo) per i dati societari reali (P.IVA, REA, email privacy dedicata) — **da compilare prima della messa online**.
- **HTTPS**: se pubblicato su GitHub Pages con dominio personalizzato, il certificato SSL è gratuito e automatico (Let's Encrypt) — basta attivare "Enforce HTTPS" nelle impostazioni Pages dopo aver collegato il DNS.
- Il modulo di contatto richiede una spunta di consenso esplicito al trattamento dei dati prima dell'invio, con link diretto all'Informativa Privacy.

## Da collegare prima della messa online

Il sito è stato costruito senza accesso al motore di prenotazione reale, quindi alcuni punti sono segnaposto da collegare:

1. **Motore di prenotazione**: il form di ricerca (`data-booking-form` in `assets/js/main.js`) oggi reindirizza a `contatti.html`. Va collegato al vero booking engine/PMS (es. Booking Experts, SiteMinder, Simple Booking...).
2. **Numeri e indirizzi reali**: telefono, WhatsApp ed email nel codice sono segnaposto (`+39 0789 000 000`, `info@hoteltabby.it`) — sostituire con quelli reali dell'hotel (cercare/sostituire in tutte le pagine).
3. **Immagini**: tutte le sezioni con foto sono placeholder (blocchi colorati con etichetta "Foto: ...") pronti per ricevere fotografie professionali in formato grande.
4. **Mappa**: il riquadro mappa in `contatti.html` va sostituito con un embed reale (Google Maps/OpenStreetMap).
5. **Prezzi**: i prezzi indicativi nelle camere/offerte sono a scopo dimostrativo — da aggiornare con le tariffe reali.
6. **Dati legali**: compilare i campi `DA COMPLETARE` in `privacy.html` e `note-legali.html` (P.IVA, REA, ragione sociale, email privacy dedicata).
