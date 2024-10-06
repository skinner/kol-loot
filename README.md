## To run, enter into chat:
todo: deploy
Change 3728214 to the clan loot admin's ID in kol
    /goto '?'':(async function(){ const mod = await import(`http://arctur.us/kol/kol-loot.js?t=${Date.now()}`); mod.updateLoot(3728214); })();z='

## To develop:
### Install Yarn
https://yarnpkg.com/getting-started/install

### Run dev server
    $ yarn run dev

### With dev server running, enter into chat:
Change 3728214 to the kol ID of the person you want to send loot info to
    /goto '?'':(async function(){ const mod = await import(`http://localhost:5173/src/main.ts?t=${Date.now()}`); mod.updateLoot(3728214); })();z='

