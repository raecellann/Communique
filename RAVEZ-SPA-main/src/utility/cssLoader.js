/** 
 * Load your css on a specific page
 * @param {Array} cssFileNames a list contains the css files needed on the specfic page 
 * @param {String} pageTitle a page title :)
 */
export default function cssLoader(cssFileName, pageTitle = 'Communique') {
    // * Added Promise to fix the sudden css load delay on every page switching 🎈
    return new Promise((resolve) => {
        document.title = pageTitle

        if (!Array.isArray(cssFileName)) {
            cssFileName = [cssFileName];
        }
    
        // * Turns the cssFileName into a list full of unique names, to avoid duplicate css links
        const uniqueCssFiles = new Set(cssFileName);
    
        removeUnnecessaryCss(uniqueCssFiles)
    
        cssFileName.forEach(cssLinks => {
            if (!document.head.querySelector(`link[href="${cssLinks}"]`)) {
                const link = document.createElement('link');
        
                link.rel = 'stylesheet';
                link.href = cssLinks;
                
                link.onload = () => {
                    resolve();
                };

                document.head.appendChild(link)
            } else {
                resolve();
            }
        });
    });
}

/**
 * Removes the unnecesarry css links 💣
 * @param {*} uniqueCssFiles 
 */
function removeUnnecessaryCss(uniqueCssFiles) {
    const fontLink = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Paytone+One&display=swap';

    const allCssLinks = document.querySelectorAll(`link[rel="stylesheet"]`)

    allCssLinks.forEach(link => {

        const hrefValue = link.getAttribute('href');

        // console.log(hrefValue)

        if (!uniqueCssFiles.has(hrefValue) && hrefValue !== fontLink) {
            // console.log(uniqueCssFiles)
            // console.log(link)
            document.head.removeChild(link)
        }
    })
}