import { Controller } from "@hotwired/stimulus"
import { FetchRequest } from '@rails/request.js'

// Connects to data-controller="tags"
export default class extends Controller {
  connect() {
    this.url = "http://localhost:3000/tags"
    this.method = "GET"
    this.securityToken = document.head.querySelector("meta[name=csrf-token]")?.content
    this.comboboxTag = document.querySelector(".combobox-tags")
    this.tagsSelected = document.querySelector("#tags-selected")
    this.comboboxSearch = document.querySelector("#combobox-search")
    this.inputSearch = ""
    this.closeSpan = `<span class='px-4 py-2 bg-neutral-900 rounded-tr-lg rounded-br-lg font-bold' data-controller='tags' data-action='click->tags#removeTag'>X</span>`
  }

  async listTags() {
    const entryValue = this.element.value
    const tagsList = await this.getTagsLits()
    const div = document.createElement("div")
    const ul = document.createElement("ul")

    this.inputSearch = entryValue

    const filteredTags = tagsList.filter((tag) => tag.includes(entryValue) ? tag : '')

    if (filteredTags.length > 0) {
      for (let i = 0; i < filteredTags.length; i++) {
        const li = `<li id='${filteredTags[i]}' class='border-b-2 border-b-gv-baltic-sea p-2'} data-controller='tags' data-action='click->tags#appendToCombobox'>
          ${filteredTags[i]}
        </li>`
        ul.insertAdjacentHTML("beforeend", li)
      }
      div.id = "tags-autocomplete"
      div.classList.add("bg-gv-dark-jungle", "p-2", "mt-2")
      ul.classList.add("list-of-tags")
      div.appendChild(ul)
      
      if (document.querySelector("#tags-autocomplete")) {
        this.comboboxTag.replaceChild(div, document.querySelector("#tags-autocomplete"))
      } else {
        this.comboboxTag.appendChild(div)
      }
    }
    else {
      if (document.querySelector("#tags-autocomplete")) {
        document.querySelector("#tags-autocomplete").remove()
      }
    }
    
    if (this.comboboxSearch.value === "") {
      document.querySelector("#tags-autocomplete").remove()
    }
  }

  async getTagsLits() {
    const request = new FetchRequest(this.method, this.url, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': this.securityToken
      }
    })

    const response = await request.perform()

    if (response.ok) {
      return JSON.parse(await response.text).tags
    }
  }

  appendToCombobox() {
    const li = `<li id='${this.element.textContent.trim().toLowerCase().split(' ').join('_')}' class='tag-item flex flex-row justify-between gap-4 items-center'>
      ${this.element.textContent}
      ${this.closeSpan}
    </li>`
    this.tagsSelected.insertAdjacentHTML("beforeend", li)
    this.comboboxSearch.focus()
  }
  
  removeTag() {
    this.element.parentElement.remove()
    this.comboboxSearch.focus()
  }
}
