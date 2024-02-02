import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="previews"
export default class extends Controller {
  static targets = ["input", "preview", "labelElement", "labelText", "footerLegend"]

  connect() {
    this.toggledElements = false
  }
  
  preview() {
    let input = this.inputTarget
    let preview = this.previewTarget
    let file = input.files[0]
    let reader = new FileReader()
    
    this.labelTextTarget.innerText = ""
    
    reader.onloadend = function () {
      preview.src = reader.result
    }
    
    if (file) { reader.readAsDataURL(file) }

    !this.toggledElements ? this.toggleStyles() : ""
    document.getElementById("titleInput").focus()
  }

  removeBanner(event) {
    if (event) { event.preventDefault() } 
    
    this.previewTarget.src = ""
    this.toggleStyles()
    this.labelTextTarget.innerText = "Add a great banner"
    this.toggledElements = false
  }

  toggleStyles() {
    this.labelElementTarget.classList.toggle("bg-gv-dark-jungle")
    this.labelElementTarget.classList.toggle("p-2")
    this.labelElementTarget.classList.toggle("border-2")
    this.labelElementTarget.classList.toggle("border-black")
    this.footerLegendTarget.classList.toggle("hidden")
    this.toggledElements = true
  }
}
