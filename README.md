# To run:
In the `/goto` commands below, change 3728214 to the clan loot admin's ID in kol

## Chat command:
### Easy way:

    /goto '?'':(async function(){ const mod = await import(`https://arctur.us/kol/kol-loot.js?t=${Date.now()}`); mod.updateLoot(3728214);})();'

### Alternatively - if you have the .js file locally, enter this into chat and pick the .js file:

    /goto '?'':(async function(){[h]=await window.showOpenFilePicker();f=await h.getFile();t=await f.text();m=await import(`data:text/javascript;base64,${btoa(t)}`); m.updateLoot(3728214);})();'

## Then, when the message page loads, click on "Send Message."

## To develop:
### Have node installed
for example [using nvm, by following the install instructions here](https://github.com/nvm-sh/nvm), then

    $ nvm install 22

### Have yarn installed
For example:

    $ corepack enable
    $ corepack prepare yarn@stable --activate

### Install dependencies
    $ yarn

### Run dev server
    $ yarn run dev

### With dev server running, enter into chat:
Change 3728214 to the kol ID of the person you want to send loot info to

    /goto '?'':(async function(){ const mod = await import(`http://localhost:5173/src/main.ts?t=${Date.now()}`); mod.updateLoot(3728214); })();z='

## To build:
    $ yarn run build
