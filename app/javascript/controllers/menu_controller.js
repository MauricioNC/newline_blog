import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu", "dropdown", "profile", "settings"]

  connect() {
    const topBar = this.element
    const topBarOffset = topBar.offsetHeight

    window.onscroll = function() {
      if (window.scrollY >= topBarOffset) {
        topBar.classList.add("bg-gv-baltic-sea", "shadow-sm")
      }
      else {
        topBar.classList.remove("bg-gv-baltic-sea", "shadow-sm")
      }
  }
  }

  toggleDropdown() {
    this.dropdownTarget.classList.toggle("hidden")
  }

  preventReload(e) {
    if (Object.keys(e.params).length > 0)
    {
      const currentUrl = window.location.href
      const targetUrl = e.params.request === "profile" ? this.profileTarget.href : this.settingsTarget.href
      
      if (currentUrl === targetUrl) {
        e.preventDefault()
      }
    }
  }
}
