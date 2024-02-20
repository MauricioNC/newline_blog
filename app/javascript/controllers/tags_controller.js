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
    
    this.selectField = document.getElementById("post_tag_ids")
    this.comboboxTag = document.querySelector(".combobox-tags")
    this.tagsSelected = document.querySelector("#tags-selected")
    this.comboboxSearch = document.querySelector("#combobox-search") 
    this.closeSpan = `<span class='px-2 py-1 bg-gv-smalt-blue rounded-tr-lg rounded-br-lg font-bold hover:cursor-default' data-controller='tags' data-action='click->tags#removeTagItem'>X</span>`

    document.addEventListener("click", (event)=>{
      if (event.target !== this.comboboxSearch) {
        this.closeTagsList()
      }
    })
    this.tagsList = undefined
  }

  async listTags() {
    this.createAutoCopmpleteElement()
    this.creatListOfTagsElement()

    if (!this.tagsList)
      this.tagsList = await this.getTagsLits()

    const filteredTags = this.tagsList.filter((item) => item.tag.toLowerCase().includes(this.element.value) ? item : '')
    
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
    return JSON.parse(await response.text)
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
      const li = `<li id='${filteredTags[i].tag}' class='border-b-2 border-b-gv-baltic-sea without-ring'}>
        <a class='without-ring p-2 block w-full'
          data-controller='tags'
          data-action='click->tags#appendToCombobox keydown.enter->tags#registerTagToCombobox keydown.enter->tags#appendToCombobox'
          data-tags-id-param='${filteredTags[i].id}'
          data-tags-tag-param='${filteredTags[i].tag}'
          tabindex='${0}'>
          ${filteredTags[i].tag}
        </a>  
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

  appendToCombobox(event, value) {
    event.preventDefault()
    const li = `<li id='${typeof value === "string" ? value : this.element.textContent.trim().toLowerCase().split(' ').join('_')}' class='tag-item flex flex-row justify-between gap-2 items-center border-2 border-black shadow-hard'>
      ${typeof value === "string" ? value : this.element.textContent}
      ${this.closeSpan}
    </li>`
    this.tagsSelected.insertAdjacentHTML("beforeend", li)
    this.comboboxSearch.value = ""
    this.comboboxSearch.focus()
    this.closeTagsList()
    this.addOptionForSelect(event.params.id, event.params.tag)
  }

  registerTagToCombobox(event) {
    event.preventDefault()
    if (!document.getElementById("tags-autocomplete"))
    {
      event.params.id = ''
      event.params.tag = this.element.value
      this.appendToCombobox(event, this.element.value)
    }
  }

  addOptionForSelect(id, tag) {
    const option = `<option value='${id || tag}' selected>${tag}</option>`
    this.selectField.insertAdjacentHTML('beforeend', option)
  }
  
  removeTagItem() {
    document.querySelector(`.${this.element.parentElement.classList[0]}`).remove()
    this.element.parentElement.remove()
  }

  removeDOMElement(tag) {
    tag.remove()
  }

  closeTagsList() {
    document.getElementById("tags-autocomplete") ? document.getElementById("tags-autocomplete").remove() : ''
  }
}
