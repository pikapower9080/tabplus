let backdropFilter = ``

function g(element){
    return document.getElementById(element)
}

let save = JSON.parse(localStorage.getItem("tabplus")) || {}
function set(key, value) {
    save[key] = value
    localStorage.setItem("tabplus", JSON.stringify(save))
}
function get(key) {
    if (typeof save[key] === "boolean") {
        return "" + save[key]
    }
    return save[key] || undefined
}
function saved(key) {
    if (typeof save[key] === "undefined") {
        return false
    } else {return true}
}

const el = {
    time: g("time"),
    goalInput: g("goal-input"),
    settingsOverlay: g("settings-overlay"),
    settings: g("settings"),
    settingsBtn: g("settingsicon"),
    customImages: g("custom-images"),
    colorInput: g("custom-color-input"),
    customMessages: g("custom-messages"),
    message: g("message"),
    timePosition: g("time-position"),
    messagePosition: g("message-position"),
    goalPosition: g("goal-position"),
    goal: g("goal"),
    shortcutSize: g("shortcut-size"),
    shortcutPos: g("shortcut-pos"),
    shortcutModal: g("shortcut-modal"),
    textShadowCheck: g("shadow-toggle"),
    goalCheck: g("goal-toggle"),
    shortcutsToggle: g("shortcuts-toggle"),
    shadowToggle: g("shadow-toggle"),
    darkenToggle: g("darken-toggle"),
    darkenBg: g("darken-bg"),
    blurBg: g("blur-bg"),
    grayscaleBg: g("grayscale-bg"),
    vignetteToggle: g("vignette-bg"),
    fontFamily: g("font-family"),
    secondaryFont: g("secondary-font")
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes
    strTime += ' ' + ampm;             
    return strTime;
}

el.goalInput.innerHTML = get("goal") || "..."
function tick() {
    el.time.innerText = formatAMPM(new Date())
    if (document.hasFocus()) {
        set("goal", el.goalInput.innerHTML)
    }
    if (document.activeElement !== el.goalInput) {
        el.goalInput.innerHTML = get("goal") || "..."
    }
}

setInterval(tick, 1000)
tick()

el.goalInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        e.preventDefault()
        el.goalInput.blur()
    }
    if (e.key == "Escape") {
        el.goalInput.blur()
    }
})

function toggleSettings() {
    if (el.settings.classList.contains("animateOut")) return;
    if (!el.settings.classList.contains("hidden")) {
        el.settings.classList.remove("animate")
        el.settings.classList.add("animateOut")
        el.settingsOverlay.classList.add("hidden")
        setTimeout(() => {
            el.settings.classList.remove("animateOut")
            el.settings.classList.add("hidden")
        }, 300)
    } else {
        el.settings.classList.add("animate")
        el.settings.classList.remove("hidden")
        el.settingsOverlay.classList.remove("hidden")
    }
}

function getOption(optionId) {
    return document.querySelector(`input[name="${optionId}"]:checked`)
}
function processSubSets() {
    document.querySelectorAll('fieldset.subset[data-requires]').forEach((subset) => {
        if (subset.dataset.requires) {
            if (document.getElementById(subset.dataset.requires) && document.getElementById(subset.dataset.requires).type == "radio") {
                if (document.getElementById(subset.dataset.requires).checked) {
                    subset.classList.remove("hidden")
                } else {
                    subset.classList.add("hidden")
                }
            }
        }
    })
}
document.querySelectorAll("input[type='radio']").forEach((radio) => {
    radio.addEventListener("change", (e) => {
        processSubSets()
        set("bg-option", getOption("bg-option").value)
        set("mg-option", getOption("mg-option").value)
        if (e.target.name && e.target.name == "bg-option") {
            refreshBackground()
        }
        if (e.target.name && e.target.name == "mg-option") {
            refreshMessage()
        }
    })
})

function updateBackdropFilter() {
    backdropFilter = `blur(${el.blurBg.value}px) brightness(${100 - el.darkenBg.value}%) grayscale(${el.grayscaleBg.value}%)`
    document.body.style.backdropFilter = backdropFilter
    if (el.vignetteToggle.checked) {
        document.body.style.boxShadow = "0 0 200px rgba(0,0,0,0.9) inset"
    } else {
        document.body.style.boxShadow = ""
    }
}

function updateFontFamily() {
    let familyText = ""
    if (el.fontFamily.value) {
        familyText = "?family=" + el.fontFamily.value
        if (el.secondaryFont.value) {
            familyText += "&family=" + el.secondaryFont.value
        }
    } else if (el.secondaryFont.value && !el.fontFamily.value) {
        familyText = "?famly=" + el.secondaryFont.value
    }
    if (familyText) {
        const newGoogleFontsUrl = `https://fonts.googleapis.com/css2${familyText}&display=swap`
        g("google-fonts").href = newGoogleFontsUrl
        document.documentElement.style.setProperty("--font", `'${el.fontFamily.value}', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`)
        document.documentElement.style.setProperty("--secondary-font", `'${el.secondaryFont.value}', sans-serif`)
    }
}

el.customImages.addEventListener("change", () => {
    set("customImages", el.customImages.value)
    refreshBackground()
})
el.customMessages.addEventListener("change", () => {
    set("customMessages", el.customMessages.value)
    refreshMessage()
})
el.colorInput.addEventListener("input", () => {
    refreshBackground()
    set("customColor", el.colorInput.value)
})
el.timePosition.addEventListener("input", () => {
    el.time.style.top = el.timePosition.value + "px"
    set("time-pos", el.timePosition.value)
})
el.messagePosition.addEventListener("input", () => {
    el.message.style.top = el.messagePosition.value + "px"
    set("message-pos", el.messagePosition.value)
})
el.goalPosition.addEventListener("input", () => {
    el.goal.style.bottom = el.goalPosition.value + "px"
    set("goal-pos", el.goalPosition.value)
})
el.shortcutSize.addEventListener("input", () => {
    document.documentElement.style.setProperty("--shortcut-size", el.shortcutSize.value + "px")
    set("shortcut-size", el.shortcutSize.value)
})
el.shortcutPos.addEventListener("input", () => {
    document.documentElement.style.setProperty("--shortcut-pos", el.shortcutPos.value + "px")
    set("shortcut-pos", el.shortcutPos.value)
})
el.shortcutsToggle.addEventListener("change", () => {
    set("enable-shortcuts", el.shortcutsToggle.checked)
    g("shortcut-grid").classList.toggle("hidden", !el.shortcutsToggle.checked)
})
el.goalCheck.addEventListener("change", () => {
    set("enable-goal", el.goalCheck.checked)
    g("goal").classList.toggle("hidden", !el.goalCheck.checked)
})
function updateTextShadow() {
    if (!el.shadowToggle.checked) {
        document.documentElement.style.setProperty("--text-shadow", "none")
    } else {
        document.documentElement.style.setProperty("--text-shadow", "rgba(0, 0, 0, 0.5) 2px 3px 5px")
    }
}
el.shadowToggle.addEventListener("change", () => {
    set("enable-shadow", el.shadowToggle.checked)
    updateTextShadow()
})
function updateShortcutBackgrounds() {
    document.querySelectorAll(".shortcut-row > a > div").forEach((shortcut) => {
        shortcut.classList.toggle("darken", el.darkenToggle.checked)
    })
}
el.darkenToggle.addEventListener("change", () => {
    set("darken-shortcuts", el.darkenToggle.checked)
    updateShortcutBackgrounds()
})
el.darkenBg.addEventListener("input", () => {
    set("darken-bg", el.darkenBg.value)
    updateBackdropFilter()
})
el.darkenBg.addEventListener("mousedown", (e) => {
    el.settingsOverlay.style.display = "none"
    el.settings.style.opacity = "50%"
})
el.darkenBg.addEventListener("mouseup", () => {
    el.settingsOverlay.style.display = ""
    el.settings.style.opacity = "100%"
})
el.blurBg.addEventListener("input", () => {
    set("blur-bg", el.blurBg.value)
    updateBackdropFilter()
})
el.grayscaleBg.addEventListener("input", () => {
    set("grayscale-bg", el.grayscaleBg.value)
    updateBackdropFilter()
})
el.grayscaleBg.addEventListener("mousedown", (e) => {
    el.settingsOverlay.style.display = "none"
    el.settings.style.opacity = "50%"
})
el.grayscaleBg.addEventListener("mouseup", () => {
    el.settingsOverlay.style.display = ""
    el.settings.style.opacity = "100%"
})
el.vignetteToggle.addEventListener("input", () => {
    set("vignette-bg", el.vignetteToggle.checked)
    updateBackdropFilter()
})
el.fontFamily.addEventListener("change", () => {
    set("font-family", el.fontFamily.value)
    updateFontFamily()
})
el.secondaryFont.addEventListener("change", () => {
    set("secondary-font", el.secondaryFont.value)
    updateFontFamily()
})

el.customImages.value = get("customImages") || ""
el.customMessages.value = get("customMessages") || ""
el.colorInput.value = get("customColor") || "#000000"
if (get("time-pos")) {
    el.timePosition.value = get("time-pos")
    el.time.style.top = el.timePosition.value + "px"
}
if (get("message-pos")) {
    el.messagePosition.value = get("message-pos")
    el.message.style.top = el.messagePosition.value + "px"
}
if (get("goal-pos")) {
    el.goalPosition.value = get("goal-pos")
    el.goal.style.bottom = el.goalPosition.value + "px"
}
if (get("shortcut-size")) {
    el.shortcutSize.value = get("shortcut-size")
    document.documentElement.style.setProperty("--shortcut-size", el.shortcutSize.value + "px")
}
if (get("shortcut-pos")) {
    el.shortcutPos.value = get("shortcut-pos")
    document.documentElement.style.setProperty("--shortcut-pos", el.shortcutPos.value + "px")
}
if (get("enable-shortcuts")) {
    el.shortcutsToggle.checked = JSON.parse(get("enable-shortcuts"))
    g("shortcut-grid").classList.toggle("hidden", !el.shortcutsToggle.checked)
}
if (get("enable-goal")) {
    el.goalCheck.checked = JSON.parse(get("enable-goal"))
    g("goal").classList.toggle("hidden", !el.goalCheck.checked)
}
if (get("enable-shadow")) {
    el.shadowToggle.checked = JSON.parse(get("enable-shadow"))
    updateTextShadow()
}
if (get("darken-shortcuts")) {
    el.darkenToggle.checked = JSON.parse(get("darken-shortcuts"))
    updateShortcutBackgrounds()
}
if (get("darken-bg")) {
    el.darkenBg.value = get("darken-bg")
    updateBackdropFilter()
}
if (get("blur-bg")) {
    el.blurBg.value = get("blur-bg")
    updateBackdropFilter()
}
if (get("grayscale-bg")) {
    el.grayscaleBg.value = get("grayscale-bg")
    updateBackdropFilter()
}
if (get("vignette-bg")) {
    el.vignetteToggle.checked = JSON.parse(get("vignette-bg"))
    updateBackdropFilter()
}

if (get("bg-option")) {
    document.querySelector(`input[value=${get("bg-option")}]`).checked = true
} else {
    g("bg-option-default").checked = true
}
if (get("mg-option")) {
    document.querySelector(`input[value=${get("mg-option")}]`).checked = true
} else {
    g("mg-option-motivational").checked = true
}
if (get("font-family")) {
    el.fontFamily.value = get("font-family")
    updateFontFamily()
}
if (get("secondary-font")) {
    el.secondaryFont.value = get("secondary-font")
    updateFontFamily()
}

document.addEventListener("keydown", (e) => {
    if (e.key == "Escape" && !el.settings.classList.contains("hidden")) {
        toggleSettings()
    }
})

document.getElementById("reset-btn").addEventListener("click", () => {
    if(confirm('Are you sure?')){localStorage.removeItem("tabplus"); save={}; window.location.reload()}
})
document.getElementById("shortcut-cancel-btn").addEventListener("click", () => {
    g('shortcut-modal').close()
})
g("file-backup").addEventListener("click", () => {
    const downloadUrl = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify({tabplus: save}))}`
    const a = document.createElement("a")
    a.href = downloadUrl
    a.download = `tab+ backup ${new Date().toLocaleString("en-US", {dateStyle: "short"}).replaceAll("/", "-")}`
    a.click()
    a.remove()
})
g("import-backup").addEventListener("click", () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "application/json"
    input.addEventListener("change", () => {
        const file = input.files[0]
        if (file.type == "application/json") {
            file.text().then((content) => {
                try {
                    content = JSON.parse(content)
                    if (content) {
                        if ("tabplus" in content && typeof content.tabplus == "object") {
                            localStorage.setItem("tabplus", JSON.stringify(content.tabplus))
                            window.location.reload()
                        } else {
                            alert("The selected file isn't a valid tab+ backup.")
                        }
                    }
                } catch(error) {
                    console.error(error)
                    alert("The selected file contained a syntax error, or there was another problem loading the backup.")
                }
            })
        } else {
            alert("The selected file isn't saved in the right format, it should be a JSON file.")
        }
    })
    input.click()
})
g("sync-backup").addEventListener("click", () => {
    if (confirm("Sync Backup:\n\nThis feature backs up your data to Chrome sync so you can use it between devices. You have to manually backup and restore on each device you want to sync. Without Chrome sync enabled or an internet connection, this will simply store a local backup.\n\nThis will override any existing backed up data.")) {
        if (chrome && "storage" in chrome) {
            chrome.storage.sync.set({backup: save}).then(() => {
                alert("Backed up successfully!")
            }).catch((error) => {
                console.error(error)
                alert(`Failed to backup data, it's possible that you've reached the sync data limit. Try again in a few minutes or consider backing up to a file using the "Save Backup" option.`)
            })
        } else {
            alert("You need to be running in an extension environment for sync backup to work.")
        }
    }
})
g("sync-restore").addEventListener("click", () => {
    if (confirm("Sync Restore:\n\nAny current data will be erased! Consider making a local backup first.")) {
        if (chrome && "storage" in chrome) {
            chrome.storage.sync.get().then((data) => {
                if ("backup" in data && typeof data.backup == "object") {
                    localStorage.setItem("tabplus", JSON.stringify(data.backup))
                    save = data.backup
                    window.location.reload()
                } else {
                    alert("No backup data was found, it was corrupted, or the backup was created in an incompatible version of Tab+")
                }
            }).catch((error) => {
                console.error(error)
                alert(`Failed to restore backup data, it's possible that you've reached the sync data limit. Try again in a few minutes.`)
            })
        } else {
            alert("You need to be running in an extension environment for sync restore to work.")
        }
    }
})

processSubSets()

el.settingsOverlay.addEventListener("click", toggleSettings)
el.settingsBtn.addEventListener("click", toggleSettings)

if (!saved("first-time")) {
    g("welcome").showModal()
    setTimeout(() => {document.querySelector("#welcome > .close-button").disabled = false}, 1) // Prevents the close button from being autofocused
    setTimeout(() => {document.querySelector("#welcome > .settings-button").disabled = false}, 1)
    document.querySelector("#welcome > .close-button").addEventListener("click", () => {
        set("first-time", false)
        g("welcome").close()
    })
    document.querySelector("#welcome > .settings-button").addEventListener("click", () => {
        set("first-time", false)
        g("welcome").close()
        toggleSettings()
    })
    g("welcome").addEventListener("cancel", () => {
        set("first-time", false)
    })
}