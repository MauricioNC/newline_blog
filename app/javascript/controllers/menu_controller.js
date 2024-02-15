import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu", "dropdown", "profile", "settings"]

  connect() {
    const topBar = this.element
    const topBarOffset = topBar.offsetHeight

    window.onscroll = function() {
      console.log(window.scrollY)
      if (window.scrollY > topBarOffset-10) {
        topBar.classList.remove("border-transparent")
        topBar.classList.add("w-full", "fixed", "bg-gv-dark-jungle", "border-black")
      } else if(window.scrollY < topBarOffset-20) {
        topBar.classList.add("border-transparent")
        topBar.classList.remove("w-full", "fixed", "bg-gv-dark-jungle", "border-black")
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
