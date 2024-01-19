import { Controller } from "@hotwired/stimulus"
import { FetchRequest } from '@rails/request.js'

// Connects to data-controller="tags"
let tagsAutoComplete = ""
let listOfTags = ""
export default class extends Controller {
  connect() {
    // AJAX request parameters
    this.url = "http://localhost:3000/tags" // url for AJAX request
    this.method = "GET" // GET method for AJAX request
    this.securityToken = document.head.querySelector("meta[name=csrf-token]")?.content // CSFR token
    
    this.comboboxTag = document.querySelector(".combobox-tags")
    this.tagsSelected = document.querySelector("#tags-selected")
    this.comboboxSearch = document.querySelector("#combobox-search") 
    this.closeSpan = `<span class='px-4 py-2 bg-neutral-900 rounded-tr-lg rounded-br-lg font-bold' data-controller='tags' data-action='click->tags#removeTagItem'>X</span>`

    document.addEventListener("click", (event)=>{
      if (event.target !== this.comboboxSearch) {
        this.closeTagsList()
      }
    })
  }

  async listTags() {
    this.createAutoCopmpleteElement()
    this.creatListOfTagsElement()
    
    const tagsList = await this.getTagsLits()
    const filteredTags = tagsList.filter((tag) => tag.includes(this.element.value) ? tag : '')
    
    if (filteredTags.length > 0) {
      this.appendTagsToListOfTags(filteredTags)
      this.appendOrReplaceTagsAutoComplete()
    }
    else {
      document.querySelector("#tags-autocomplete") ? this.removeDOMElement(document.querySelector("#tags-autocomplete")) : ''
    }
    
    this.comboboxSearch.value === "" ? this.removeDOMElement(document.querySelector("#tags-autocomplete")) : ''
  }

  async getTagsLits() {
    const request = new FetchRequest(this.method, this.url, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': this.securityToken
      }
    })
    const response = await request.perform()
    if (!response.ok) {  return [] }
    return JSON.parse(await response.text).tags
  }

  createAutoCopmpleteElement() {
    tagsAutoComplete = document.createElement("div")
    this.setElementAttributes(tagsAutoComplete, {id: "tags-autocomplete", class: ["bg-gv-dark-jungle", "p-2", "mt-2"] })
  }

  creatListOfTagsElement() {
    listOfTags = document.createElement("ul")
    this.setElementAttributes(listOfTags, {class: ["list-of-tags"], tabindex: "-1" })
  }

  setElementAttributes(element, params) {
    params?.id ? element.id = params.id : ''
    params?.class.forEach((classItem) => {
      element.classList.add(classItem)
    })
    params?.tabindex ? element.tabIndex = params.tabindex : ''
  }

  appendTagsToListOfTags(filteredTags) {
    for (let i = 0; i < filteredTags.length; i++) {
      const li = `<li id='${filteredTags[i]}' class='border-b-2 border-b-gv-baltic-sea p-2 without-ring'} data-controller='tags' data-action='click->tags#appendToCombobox keydown.enter->tags#registerTagToCombobox' tabindex='${0}'>
        ${filteredTags[i]}
      </li>`
      listOfTags.insertAdjacentHTML("beforeend", li)
    }

    tagsAutoComplete.appendChild(listOfTags)
  }
  
  appendOrReplaceTagsAutoComplete() {
    // The #tags-autocomplete div is replace with the new tags as the user types
    if (document.querySelector("#tags-autocomplete")) {
      this.comboboxTag.replaceChild(tagsAutoComplete, document.querySelector("#tags-autocomplete"))
    } 
    else {
      this.comboboxTag.appendChild(tagsAutoComplete)
    }
  }

  appendToCombobox(value) {
    const li = `<li id='${typeof value === "string" ? value : this.element.textContent.trim().toLowerCase().split(' ').join('_')}' class='tag-item flex flex-row justify-between gap-4 items-center'>
      ${typeof value === "string" ? value : this.element.textContent}
      ${this.closeSpan}
    </li>`
    this.tagsSelected.insertAdjacentHTML("beforeend", li)
    this.comboboxSearch.value = ""
    this.comboboxSearch.focus()
    this.closeTagsList()
  }

  registerTagToCombobox(event) {
    event.preventDefault()
    this.appendToCombobox(this.element.value)
  }
  
  removeTagItem() {
    this.element.parentElement.remove()
    this.comboboxSearch.focus()
  }

  removeDOMElement(tag) {
    tag.remove()
  }

  closeTagsList() {
    document.getElementById("tags-autocomplete") ? document.getElementById("tags-autocomplete").remove() : ''
  }
}
