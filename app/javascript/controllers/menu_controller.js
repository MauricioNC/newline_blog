import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu", "dropdown", "profile", "settings"]

  connect() {
  }

  toggleMenu() {
    if (this.menuTarget.classList.contains("openmenu"))
    {
      this.close_dropdown()
    }
    else
    {
      this.show_dropdown()
    }
    
    this.menuTarget.classList.toggle("openmenu")
  }

  show_dropdown() {
    this.menuTarget.classList.remove("overflow-hidden")
    this.dropdownTarget.classList.remove("translate-x-64")
  }

  close_dropdown() {
    this.dropdownTarget.classList.add("translate-x-64")
    
    setTimeout(() => {
      this.menuTarget.classList.add("overflow-hidden")
    }, 600);
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
