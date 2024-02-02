import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="requested-content"
export default class extends Controller {
  connect() {
  }
  
  highlight() {
    const current = document.querySelector(".selected")

    if (this.element != current) {
      this.unhighlighted_current(current)
      this.element.classList.add("selected", "bg-gv-smalt-blue")
    } 
  }
  
  unhighlighted_current(current) {
    current.classList.remove("selected", "bg-gv-smalt-blue")
  }
}
