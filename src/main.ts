import { process } from './process-loot'

function waitForElem(win: Window, selector: string, timeoutSecs: number = 10,
    pollIntervalMs: number = 200) {

    let remainingTries = (timeoutSecs * 1000) / pollIntervalMs;

    return new Promise((resolve, reject) => {
        function waitForElementToDisplay(selector: string, time: number) {
            if (win.document.querySelector(selector) != null) {
                resolve(win.document.querySelector(selector));
            } else {
                remainingTries -= 1;
                if (remainingTries <= 0) {
                    reject(`Timeout waiting for ${selector}`);
                } else {
                    setTimeout(
                        () => waitForElementToDisplay(selector, time),
                        time
                    );
                }
            }
        }

        waitForElementToDisplay(selector, pollIntervalMs);
    });
}

async function updateLoot(recipient: number) {
    console.log(`updating loot at ${(new Date()).toISOString()}`);

    try {
        // hacky manual error handling test
        // throw new Error('test error');
    
        // load JSON from the API
        const jsonUrls = {
            status: 'api.php?for=loot&what=status',
            inventory: 'api.php?for=loot&what=inventory',
            closet: 'api.php?for=loot&what=closet',
            storage: 'api.php?for=loot&what=storage',
        };
        let jsonResults: Record<string, Object> = {};
    
        for (const [key, url] of Object.entries(jsonUrls)) {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${key} fetch failed with status ${response.status}`);
            }
            jsonResults[key] = await response.json();
        }
    
        // load HTML for non-API sources
        const htmlUrls = {
            collection: 'managecollection.php',
            familiar: 'familiar.php',
            charsheet: 'charsheet.php',
            skill1: 'desc_skill.php?whichskill=46',
            skill2: 'desc_skill.php?whichskill=47',
            skill3: 'desc_skill.php?whichskill=48',
        };
        let htmlResults: Record<string, string> = {};
    
        for (const [key, url] of Object.entries(htmlUrls)) {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${key} fetch failed with status ${response.status}`);
            }
            const rawHtml = await response.text();
            htmlResults[key] = rawHtml.replace(/[\x3C\x3E]/g, '|');
        }

        // process loaded data
        const result = process(
            jsonResults['status'], jsonResults['inventory'],
            jsonResults['closet'], jsonResults['storage'],
            htmlResults['collection'], htmlResults['familiar'],
            htmlResults['charsheet'], htmlResults['skill1'],
            htmlResults['skill2'], htmlResults['skill3']
        );

        // generate output
        const warnHtml = result.warnings.map(
            w => `<h3 style="background-color: #eec">${w}</h3>`
        ).join('\n');
    
        const allResults = Object.entries(jsonResults)
            .map(([k, v]) => [k, JSON.stringify(v)])
            .concat(Object.entries(htmlResults));
    
        const resultHtml = allResults.map(
            ([key, val]) => `
            <h3>${key}</h3>
            <textarea rows="4" cols="50">${val}</textarea><br>
            `
        ).join('\n');
    
        // prepare message for sending and display intermediate results
        // in case they're useful for debugging
        const mainPane = (window as any).top?.frames['mainpane'] as Window | null;
        if (mainPane == null) {
            throw new Error('no main pane');
        }
        mainPane.location = `/sendmessage.php?toid=${recipient}`;
    
        const messageArea = await waitForElem(mainPane, 'textarea[name="message"]') as HTMLTextAreaElement;
        let messageText = '';
        if (result.warnings.length > 0) {
            messageText += result.warnings.join('\n');
            messageText += '\n\n';
        }
        messageText += result.lootLines;
        messageArea.value = messageText;
    
        const addElement = mainPane.document.createElement("div");
        addElement.innerHTML = `
            ${warnHtml}
            ${resultHtml}
        `;
        messageArea.parentElement?.appendChild(addElement);
    } catch (e: any) {
        const mainPane = (window as any).top?.frames['mainpane'] as Window | null;
        if (mainPane == null) {
            throw new Error('no main pane');
        }
        mainPane.document.head.innerHTML = `
            <style type="text/css">
                body {
                    background-color: white;
                    font-family: arial;
                    text-color: black;
                }
                h3 {
                    padding: 1ex;
                }
            </style>
        `;

        mainPane.document.body.innerHTML = `
            <h3 style="background-color: #ecc">${e}</h3>
        `;
    }
}

export { updateLoot };
