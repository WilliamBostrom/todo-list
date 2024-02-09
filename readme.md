# TO-DO WEBSITE WITH LOGIN

## TypeScript projekt, även gjort med Firebase.

Individuell uppgift från Chas Academy.

## Beskrivning:

Uppgiften gick ut på att skapa ett To-do lista med HTML, CSS och TypeScript utan att använda några färdiga ramverk.To-Do listan implementerades även med Firebase Firestore istället för LocalStorage för att bevara ändringar mellan olika sessioner och enheter.

- Besök live-sidan: https://todo-enkelt.netlify.app/

## Installation

För att köra detta projekt lokalt, följ stegen nedan:

1.  **Klona detta repository till din lokala maskin:**

```bash
git clone https://github.com/WilliamBostrom/todo-list.git
```

2.  **Gå in i den klonade mappen::**

```bash
cd ditt-repo

```

3.**Installera projektets beroenden:**

```bash
npm install

```

4.**Öppna sidan:**

```bash
npm run dev
```

## Översikt över uppgiftens olika delar

### Varje uppgift ska ha:

- Ett unikt id
- En beskrivande text
- Om uppgifter är klar eller inte
- Användaren ska kunna:
- Se alla uppgifter
- Lägga till en uppgift
- Ta bort en uppgift
- Toggla om en uppgift är klar eller inte
- Rensa hela listan

### Övergripande krav

- Använda Typescript och alla dina "normala JS-filer" är .ts. Typescript kompilatorn ska ge 0 fel.
- Typescript kod som är explicit.
- Använda type eller interface för att beskriva en Todo-item.

### VG-krav:

- För varje todo ska det även finnas med en edit-knapp så att användaren kan ändra texten
- Du väljer en till valfri funktionalitet som höjer kvaliteten på din todo-list

## Resonemang

Genomförandet av denna uppgift var både lärorikt och utmanande, särskilt med tanke på min begränsade erfarenhet av TypeScript. Ju längre jag arbetade med uppgiften desto mer föll bitarna på plats när det kom till att strukturera upp koden. Jag valde att avstå från att använda localStorage, vilket jag hade gjort i tidigare projekt, och istället implementerade jag Firestore-databasen från Firebase. Detta beslut möjliggjorde hosting av sidan och användning av en To-Do-lista över olika sessioner och enheter.

Även om uppgiftens krav inte inkluderade inloggning, valde jag att lägga till en enklare inloggningsfunktion med hjälp av Firebase. Detta gjorde det möjligt att passera startsidan och ge användaren tillgång till att se alla "To-Do"-uppgifter. Man kan betrakta dessa som en global To-Do-lista, eftersom inga uppgifter för närvarande är kopplade till någon användaridentifiering.

När det gäller förbättringsområden finns det många, särskilt eftersom detta var mitt första projekt med TypeScript. Jag ser fram emot att fortsätta förbättra mina kunskaper och färdigheter i TypeScript genom praktisk träning och erfarenhet.

Under kursens gång nämndes det att vi kommer att fortsätta att bygga vidare på denna To-Do-lista med React. Där planerar jag att utveckla min befintliga Firebase-integration för att inte bara erbjuda en "logga in"-knapp utan även möjligheten för användare att bli medlemmar. Varje användare kommer då att ha sin egen privata To-Do-lista.

Jag noterade även några förbättringsområden gällande hur jag importerar och hanterar bilderna för att integrera dem på min live-hostade sida. Detta var min första erfarenhet av att live-hosta en sida med Vite, vilket ledde till några extra importer och if-satser för att hantera bilderna i script.ts-filen. Även om sidan fungerar som den ska och bilderna visas korrekt, känner jag att det finns utrymme för förbättringar för att rensa upp koden och ta bort onödiga rader som tillkommit under testningen för att inkludera bilderna i byggprocessen.
