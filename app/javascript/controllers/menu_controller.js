import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu", "dropdown", "profile", "settings"]

  connect() {
  }

  toggleMenu() {
    this.menuTarget.classList.toggle("openmenu")
    this.dropdownTarget.classList.toggle("hide-side-menu")
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
