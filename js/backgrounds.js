const defaultBackgroundPrefix =
    "https://raw.githubusercontent.com/pikapower9080/tabplus/assets/";
let backgrounds = [
    "aaron-burden-XxvXRmsH860-unsplash.jpg",
    "adam-kool-ndN00KmbJ1c-unsplash.jpg",
    "andrew-coelho-m6tAqZvy4RM-unsplash.jpg",
    // 'aperture-vintage-SshYpuf607g-unsplash.jpg',
    "artem-sapegin-8c6eS43iq1o-unsplash.jpg",
    "ashim-d-silva-WeYamle9fDM-unsplash.jpg",
    "bailey-zindel-NRQV-hBF10M-unsplash.jpg",
    "benjamin-davies-Zm2n2O7Fph4-unsplash.jpg",
    "benjamin-voros-phIFdC6lA4E-unsplash.jpg",
    // 'casey-horner-fsJB3KT2rj8-unsplash.jpg',
    "christian-joudrey-DuD5D3lWC3c-unsplash.jpg",
    "christopher-kuzman-2LhCDvS_7xs-unsplash.jpg",
    "david-marcu-78A265wPiO4-unsplash.jpg",
    "fabian-quintero-UWQP2mh5YJI-unsplash.jpg",
    "geran-de-klerk-WJkc3xZjSXw-unsplash.jpg",
    "hendrik-cornelissen--qrcOR33ErA-unsplash.jpg",
    "ian-dooley-hpTH5b6mo2s-unsplash.jpg",
    "jay-castor-7AcMUSYRZpU-unsplash.jpg",
    // 'jay-mantri-TFyi0QOx08c-unsplash.jpg',
    "joel-holland-TRhGEGdw-YY-unsplash.jpg",
    "joey-kyber-sFLVTqNzG2I-unsplash.jpg",
    "johann-siemens-EPy0gBJzzZU-unsplash.jpg",
    "johannes-plenio-RwHv7LgeC7s-unsplash.jpg",
    "john-mccann-bm15OYOm-Gc-unsplash.jpg",
    "jonatan-pie-VlH2eHyE_50-unsplash.jpg",
    "kace-rodriguez-p3OzJuT_Dks-unsplash.jpg",
    "kalen-emsley-Bkci_8qcdvQ-unsplash.jpg",
    "karsten-wurth-M84bYZnCMQg-unsplash.jpg",
    "lukasz-szmigiel-jFCViYFYcus-unsplash.jpg",
    "mike-erskine--rSka4Bw-EU-unsplash.jpg",
    "niko-photos-tGTVxeOr_Rs-unsplash.jpg",
    "nikola-majksner-hXNGeAFOgT4-unsplash.jpg",
    "quino-al-mBQIfKlvowM-unsplash.jpg",
    "roberto-nickson-vZ1JAXUO3-0-unsplash.jpg",
    "rowan-heuvel-U6t80TWJ1DM-unsplash.jpg",
    "sabeer-darr-Upz-tnx2v2s-unsplash.jpg",
    "sasha-freemind-gooBgyq17i0-unsplash.jpg",
    "sebastian-unrau-v4e3JI7DDHI-unsplash.jpg",
    "sergei-a--heLWtuAN3c-unsplash.jpg",
    "sergey-shmidt-koy6FlCCy5s-unsplash.jpg",
    "simon-wilkes-jlVEj8IDPQc-unsplash.jpg",
    "todd-quackenbush-XBxQZLNBM0Q-unsplash.jpg",
    "v2osk-1Z2niiBPg5A-unsplash.jpg",
    "vincent-van-zalinge-vUNQaTtZeOo-unsplash.jpg",
    "wil-stewart-pHANr-CpbYM-unsplash.jpg",
    "willian-justen-de-vasconcellos-T_Qe4QlMIvQ-unsplash.jpg",
    "yousef-espanioly-DA_tplYgTow-unsplash.jpg",
    "zoltan-tasi-eS1omi9_W58-unsplash.jpg",
];
const colors = [
    "#E53935",
    "#C62828",
    "#EC407A",
    "#9C27B0",
    "#BA68C8",
    "#6A1B9A",
    "#673AB7",
    "#3F51B5",
    "#1E88E5",
    "#4FC3F7",
    "#00BCD4",
    "#26A69A",
    "#4CAF50",
    "#3CCC65",
    "#CDDC39",
    "#FFC107",
];

function refreshBackground() {
    if (getOption("bg-option")?.value == "custom") {
        let customBgs = get("customImages")?.trim().split("\n");
        if (customBgs && customBgs.length > 0) {
            document.documentElement.style.setProperty(
                "--background",
                `url("${
                    customBgs[Math.floor(Math.random() * customBgs.length)]
                }")`,
            );
            return;
        }
    }
    if (getOption("bg-option")?.value == "materialColors") {
        document.documentElement.style.setProperty("--background", "");
        document.documentElement.style.setProperty(
            "--background-color",
            colors[Math.floor(Math.random() * colors.length)],
        );
        return;
    }
    if (getOption("bg-option")?.value == "color") {
        document.documentElement.style.setProperty("--background", "");
        document.documentElement.style.setProperty(
            "--background-color",
            el.colorInput.value,
        );
        return;
    }
    if (getOption("bg-option")?.value == "bing") {
        if (window.chrome && chrome.runtime && chrome.runtime.id) {
            // Running as chrome extension
            fetch(
                "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1",
            )
                .then((res) => {
                    res.json().then((data) => {
                        document.documentElement.style.setProperty(
                            "--background",
                            `url("https://bing.com${data.images[0].url}")`,
                        );
                        document.getElementById("bing-copyright").innerText =
                            data.images[0].copyright;
                        document.getElementById("bing-copyright").href =
                            data.images[0].copyrightlink;
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            // Running as demo or development build
            document.getElementById("bing-copyright").innerText =
                "This feature is not available in the demo.";
            document.getElementById("bing-copyright").href =
                "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS";
        }
    }
    if (getOption("bg-option")?.value == "bing") return;
    document.documentElement.style.setProperty(
        "--background",
        `url("${
            defaultBackgroundPrefix +
            backgrounds[Math.floor(Math.random() * backgrounds.length)]
        }")`,
    );
}
refreshBackground();
