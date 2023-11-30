import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu", "dropdown"]

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
}
