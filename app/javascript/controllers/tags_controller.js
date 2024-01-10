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
  }

  async listTags() {
    const entryValue = this.element.value
    const tagsList = await this.getTagsLits()
    const div = document.createElement("div")
    const ul = document.createElement("ul")

    this.inputSearch = entryValue

    const filterdTags = tagsList.filter((tag) => tag.includes(entryValue) ? tag : '')

    if (filterdTags.length > 0) {
      for (let i = 0; i < filterdTags.length; i++) {
        const li = document.createElement("li")
        li.id = filterdTags[i]
        li.classList.add("border-b-2", "border-b-gv-baltic-sea", "p-2")
        li.innerHTML = filterdTags[i]
        li.dataset.controller = "tags"
        li.dataset.action = "click->tags#appendToCombobox"
        ul.appendChild(li)
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
    const li = document.createElement("li")
    li.innerHTML = this.element.textContent

    li.id = this.element.textContent.toLowerCase().split(' ').join('_')
    li.classList.add("tag-item")

    this.tagsSelected.appendChild(li)
    this.comboboxSearch.focus()
  }
}
