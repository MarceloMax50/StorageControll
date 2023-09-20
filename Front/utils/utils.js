    //fonte: https://www.sitepoint.com/delay-sleep-pause-wait/
    export function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }