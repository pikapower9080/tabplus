function g(element){
    return document.getElementById(element)
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
    darkenToggle: g("darken-toggle")
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

el.goalInput.innerHTML = localStorage.getItem("goal") || "..."
function tick() {
    el.time.innerText = formatAMPM(new Date())
    if (document.hasFocus()) {
        localStorage.setItem("goal", el.goalInput.innerHTML)
    }
    if (document.activeElement !== el.goalInput) {
        el.goalInput.innerHTML = localStorage.getItem("goal") || "..."
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
        localStorage.setItem("bg-option", getOption("bg-option").value)
        localStorage.setItem("mg-option", getOption("mg-option").value)
        if (e.target.name && e.target.name == "bg-option") {
            refreshBackground()
        }
        if (e.target.name && e.target.name == "mg-option") {
            refreshMessage()
        }
    })
})

el.customImages.addEventListener("change", () => {
    localStorage.setItem("customImages", el.customImages.value)
    refreshBackground()
})
el.customMessages.addEventListener("change", () => {
    localStorage.setItem("customMessages", el.customMessages.value)
    refreshMessage()
})
el.colorInput.addEventListener("input", () => {
    refreshBackground()
    localStorage.setItem("customColor", el.colorInput.value)
})
el.timePosition.addEventListener("input", () => {
    el.time.style.top = el.timePosition.value + "px"
    localStorage.setItem("time-pos", el.timePosition.value)
})
el.messagePosition.addEventListener("input", () => {
    el.message.style.top = el.messagePosition.value + "px"
    localStorage.setItem("message-pos", el.messagePosition.value)
})
el.goalPosition.addEventListener("input", () => {
    el.goal.style.bottom = el.goalPosition.value + "px"
    localStorage.setItem("goal-pos", el.goalPosition.value)
})
el.shortcutSize.addEventListener("input", () => {
    document.documentElement.style.setProperty("--shortcut-size", el.shortcutSize.value + "px")
    localStorage.setItem("shortcut-size", el.shortcutSize.value)
})
el.shortcutPos.addEventListener("input", () => {
    document.documentElement.style.setProperty("--shortcut-pos", el.shortcutPos.value + "px")
    localStorage.setItem("shortcut-pos", el.shortcutPos.value)
})
el.shortcutsToggle.addEventListener("change", () => {
    localStorage.setItem("enable-shortcuts", el.shortcutsToggle.checked)
    g("shortcut-grid").classList.toggle("hidden", !el.shortcutsToggle.checked)
})
el.goalCheck.addEventListener("change", () => {
    localStorage.setItem("enable-goal", el.goalCheck.checked)
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
    localStorage.setItem("enable-shadow", el.shadowToggle.checked)
    updateTextShadow()
})
function updateShortcutBackgrounds() {
    document.querySelectorAll(".shortcut-row > a > div").forEach((shortcut) => {
        shortcut.classList.toggle("darken", el.darkenToggle.checked)
    })
}
el.darkenToggle.addEventListener("change", () => {
    localStorage.setItem("darken-shortcuts", el.darkenToggle.checked)
    updateShortcutBackgrounds()
})

el.customImages.value = localStorage.getItem("customImages")
el.customMessages.value = localStorage.getItem("customMessages")
el.colorInput.value = localStorage.getItem("customColor")
if (localStorage.getItem("time-pos")) {
    el.timePosition.value = localStorage.getItem("time-pos")
    el.time.style.top = el.timePosition.value + "px"
}
if (localStorage.getItem("message-pos")) {
    el.messagePosition.value = localStorage.getItem("message-pos")
    el.message.style.top = el.messagePosition.value + "px"
}
if (localStorage.getItem("goal-pos")) {
    el.goalPosition.value = localStorage.getItem("goal-pos")
    el.goal.style.bottom = el.goalPosition.value + "px"
}
if (localStorage.getItem("shortcut-size")) {
    el.shortcutSize.value = localStorage.getItem("shortcut-size")
    document.documentElement.style.setProperty("--shortcut-size", el.shortcutSize.value + "px")
}
if (localStorage.getItem("shortcut-pos")) {
    el.shortcutPos.value = localStorage.getItem("shortcut-pos")
    document.documentElement.style.setProperty("--shortcut-pos", el.shortcutPos.value + "px")
}
if (localStorage.getItem("enable-shortcuts")) {
    el.shortcutsToggle.checked = JSON.parse(localStorage.getItem("enable-shortcuts"))
    g("shortcut-grid").classList.toggle("hidden", !el.shortcutsToggle.checked)
}
if (localStorage.getItem("enable-goal")) {
    el.goalCheck.checked = JSON.parse(localStorage.getItem("enable-goal"))
    g("goal").classList.toggle("hidden", !el.goalCheck.checked)
}
if (localStorage.getItem("enable-shadow")) {
    el.shadowToggle.checked = JSON.parse(localStorage.getItem("enable-shadow"))
    updateTextShadow()
}
if (localStorage.getItem("darken-shortcuts")) {
    el.darkenToggle.checked = JSON.parse(localStorage.getItem("darken-shortcuts"))
    updateShortcutBackgrounds()
}

if (localStorage.getItem("bg-option")) {
    document.querySelector(`input[value=${localStorage.getItem("bg-option")}]`).checked = true
} else {
    g("bg-option-default").checked = true
}
if (localStorage.getItem("mg-option")) {
    document.querySelector(`input[value=${localStorage.getItem("mg-option")}]`).checked = true
} else {
    g("mg-option-motivational").checked = true
}

document.addEventListener("keydown", (e) => {
    if (e.key == "Escape" && !el.settings.classList.contains("hidden")) {
        toggleSettings()
    }
})

document.getElementById("reset-btn").addEventListener("click", () => {
    if(confirm('Are you sure?')){localStorage.clear(); window.location.reload()}
})
document.getElementById("shortcut-cancel-btn").addEventListener("click", () => {
    g('shortcut-modal').close()
})

processSubSets()

el.settingsOverlay.addEventListener("click", toggleSettings)
el.settingsBtn.addEventListener("click", toggleSettings)

if (!localStorage.getItem("first-time")) {
    g("welcome").showModal()
    setTimeout(() => {document.querySelector("#welcome > .close-button").disabled = false}, 1) // Prevents the close button from being autofocused
    setTimeout(() => {document.querySelector("#welcome > .settings-button").disabled = false}, 1)
    document.querySelector("#welcome > .close-button").addEventListener("click", () => {
        localStorage.setItem("first-time", false)
        g("welcome").close()
    })
    document.querySelector("#welcome > .settings-button").addEventListener("click", () => {
        localStorage.setItem("first-time", false)
        g("welcome").close()
        toggleSettings()
    })
    g("welcome").addEventListener("cancel", () => {
        localStorage.setItem("first-time", false)
    })
}