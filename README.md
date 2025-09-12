# 🎧 TechnoShop

**TechnoShop** è una Single Page Application (SPA) sviluppata in **React** con **Vite**, che consente agli utenti non autenticati di esplorare, confrontare e salvare dispositivi tecnologici preferiti.

L'app permette di sfogliare categorie come **smartphone**, **tablet**, **smartwatch** e **monopattini elettrici**, offrendo un'esperienza moderna, responsive e user-friendly.

---

## 🚀 Funzionalità principali

- 🔍 **Ricerca in tempo reale** con debounce per migliorare la UX
- 🎯 **Filtro** per categoria (es. smartphone, tablet, ecc.)
- 🔃 **Ordinamento** per `title` o `category` (A-Z e Z-A)
- 📄 **Pagina di dettaglio** con tutte le informazioni (`price`, `description`, `brand`, ecc.)
- 📊 **Comparatore** responsive per confrontare **2 o più dispositivi**
- ⭐ **Sistema di preferiti**, accessibile da ogni sezione
- 📭 **Gestione degli stati vuoti**:
  - Nessun risultato trovato
  - Lista preferiti vuota
  - Nessun elemento selezionato nel comparatore

---

## 🧑‍💻 Tecnologie utilizzate

- ⚛️ **React**
- ⚡ **Vite**
- 🌐 **React Router DOM**
- 📦 **Lodash** (per il debounce)
- 🧠 **Context API** per stato globale
- 🧾 **TypeScript** (tipi definiti in `types.ts`)

---

## 🎨 Stile & UI

- 🎨 **Bootstrap** via CDN
- 🔤 Font Google: **Roboto** e **Manrope**
- ⭐ **Font Awesome** per le icone
- 🧩 Favicon personalizzata

> L’interfaccia è completamente responsive e ottimizzata per desktop, tablet e mobile.

---

## 🗂️ Struttura delle pagine

| Percorso                 | Componente               | Descrizione                                  |
|--------------------------|--------------------------|----------------------------------------------|
| `/`                      | `ProductsList`           | Lista dei dispositivi                        |
| `/product/:id`           | `ProductsDetail`         | Dettaglio prodotto                           |
| `/confrontaPrezzi`       | `ComparisonPage`         | Comparatore di 2 o più dispositivi           |
| `/favorites`             | `Favorites`              | Prodotti salvati nei preferiti               |
| `/scooters`              | `ScootersPage`           | Lista monopattini elettrici                  |
| `/scooters/:id`          | `ScootersDetail`         | Dettaglio monopattino                        |
| `*`                      | `NotFoundPage`           | Pagina non trovata                           |

---


