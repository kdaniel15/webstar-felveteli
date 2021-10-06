# Webstar Felvételi

## Login page

A felhasználó csak a megfelelő adatok segítségével tud belépni, ilyenkor localstorage-ba kerül mentésre a token illetve felhasználónevünk. Amennyiben hibás adatokat adunk meg az input mezők alatt jelezzük a problémát.

## Character picker page

Mindkét erő oldaláról választunk egy karaktert, ha ugyanarról az erő oldalról akarunk választani kétszer akkor felugró ablakban hiba üzenetet kapunk erről. A kijelölt karaktereknél a kép mögötti sárga karika és az elszíneződött kiválasztom gomb jelez, ha egyszer választottunk egy erő oldalon karaktert csak az weboldal frissítésével lehet újrakezdeni a folyamatot. Valid választás után a képernyő alján megjelenik a szimuláció gomb ami tovább dob a Batte simulation oldalra.

## Battle simulation page

Az oldalra érkezve pár másodperces késleltetéssel elindul a küzdelem szimuláció, ha egy harcos élete eléri a nullát akkor a nyertes kihirdetésre kerül. Innen a vissza a fedélzetre gombbal tudunk visszajutni a karakter választó oldalra.
