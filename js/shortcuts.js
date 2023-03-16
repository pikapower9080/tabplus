// Prevents the default close method and instead resets the form and closes
el.shortcutModal.addEventListener("cancel", (e) => {
    e.preventDefault()
    document.querySelector("#shortcut-modal .cancel-button").click()
})

const form = el.shortcutModal.querySelector("form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const id = window.editingShortcut
    const shortcutData = {}
    shortcutData.label = form.querySelector("#shortcut-name").value
    shortcutData.url = form.querySelector("input[type='url']").value
    shortcutData.emoji = form.querySelector("#shortcut-emoji").value
    localStorage.setItem(`shortcut-${id}`, JSON.stringify(shortcutData))
    document.querySelector("#shortcut-modal .cancel-button").click()
    applyShortcutData(shortcutData, id)
})

function applyShortcutData(shortcutData, id) {
    const shortcut = document.querySelector(`#shortcut-${id}`)
    if (shortcut) {
        shortcut.querySelector(".shortcut-name").innerText = shortcutData.label
        shortcut.querySelector(".shortcut-emoji").innerText = shortcutData.emoji
        shortcut.parentNode.href = shortcutData.url
    }
}

for (let index = 0; index <= 3; index++) {
    if (localStorage.getItem("shortcut-" + index) && JSON.parse(localStorage.getItem("shortcut-" + index))) {
        applyShortcutData(JSON.parse(localStorage.getItem("shortcut-" + index)), index)
    }
}

document.querySelectorAll(".shortcut").forEach((shortcut) => {
    shortcut.addEventListener("contextmenu", (e) => {
        e.preventDefault()
        window.editingShortcut = shortcut.id.replace("shortcut-", "")
        if (JSON.parse(localStorage.getItem("shortcut-" + window.editingShortcut))) {
            const data = JSON.parse(localStorage.getItem("shortcut-" + window.editingShortcut))
            el.shortcutModal.querySelector("#shortcut-name").value = data.label
            el.shortcutModal.querySelector("input[type='url']").value = data.url
            el.shortcutModal.querySelector("#shortcut-emoji").value = data.emoji
        }
        el.shortcutModal.showModal()
    })
})