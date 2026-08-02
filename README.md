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
- **`contatti.html`** — Modulo di contatto breve, contatti rapidi (WhatsApp/telefono/email), mappa (placeholder da integrare), FAQ.

Header, moteur de réservation, footer e i pulsanti di contatto rapido sono presenti su ogni pagina.

## Scelte di design

- **Palette**: sabbia calda, terracotta e blu Mediterraneo — estetica "boutique hotel", calda e attuale.
- **Tipografia**: Fraunces (serif, per i titoli) + Work Sans (per i testi), caricati da Google Fonts.
- **Mobile-first**: tutto il layout è pensato prima per mobile, poi arricchito su desktop via media query.

## Conversione (CRO)

- Moteur de réservation sempre visibile: nell'hero, come barra sticky su desktop dopo lo scroll, e come CTA fissa in basso su mobile.
- Pulsante di contatto flottante (WhatsApp / telefono / modulo rapido) su tutte le pagine.
- Copy orientato ai vantaggi della prenotazione diretta (tariffa migliore garantita, cancellazione flessibile).

## Da collegare prima della messa online

Il sito è stato costruito senza accesso al motore di prenotazione reale, quindi alcuni punti sono segnaposto da collegare:

1. **Motore di prenotazione**: il form di ricerca (`data-booking-form` in `assets/js/main.js`) oggi reindirizza a `contatti.html`. Va collegato al vero booking engine/PMS (es. Booking Experts, SiteMinder, Simple Booking...).
2. **Numeri e indirizzi reali**: telefono, WhatsApp ed email nel codice sono segnaposto (`+39 0789 000 000`, `info@hoteltabby.it`) — sostituire con quelli reali dell'hotel.
3. **Immagini**: tutte le sezioni con foto sono placeholder (blocchi colorati con etichetta "Foto: ...") pronti per ricevere fotografie professionali in formato grande.
4. **Mappa**: il riquadro mappa in `contatti.html` va sostituito con un embed reale (Google Maps/OpenStreetMap).
5. **Prezzi**: i prezzi indicativi nelle camere/offerte sono a scopo dimostrativo — da aggiornare con le tariffe reali.
