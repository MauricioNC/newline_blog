import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="form"
export default class extends Controller {
  connect() {
    this.email_container = document.querySelector(".email_group")
    this.password_container = document.querySelector(".password_group")
    this.email_error_message = false
    this.password_error_message = false
  }
  
  validate(event) {
    if (this.email_error_message) {
      this.element.classList.add("focus:border-gv-fire-engine-red")
    }

    if (this.password_error_message) { 
      this.element.classList.add("focus:border-gv-fire-engine-red")
    }

    if (event.params.inputType === "email") {
      this.email_match() ? this.close_email_error_message() : this.show_email_error_message()
    }
    else if (event.params.inputType === "password") {
      this.password_match() ? this.close_password_error_message() : this.show_password_error_message()
    }
  }
  
  email_match() {
    const regex_pattern = /^[\w+]+@[\w+]+\.[\w+]+$/
    return regex_pattern.test(this.element.value)
  }

  password_match() {
    const regex_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#!$_.]).{9,18}$/
    return regex_pattern.test(this.element.value)
  }

  show_email_error_message() {
    if (!this.email_error_message && !this.password_error_message) {
      this.create_error_message("Please enter a valid email", "email_error")
    }
  }

  show_password_error_message() {
    if (!this.email_error_message && !this.password_error_message) {
      this.create_error_message(`
        Please enter a valid password:<br>
        - Minimum 8 characters,<br>
        - Minimum 1 lower case letter (a-z),<br>
        - Minimum 1 upper case letter (A-Z),<br>
        - Minimum 1 digit (0-9),<br>
        - Minimum 1 special character (@#!$_.)
      `,
      "password_error") 
    }
  }

  close_email_error_message() {
    if (this.email_error_message && this.email_error_message)
    {
      this.email_error_message.remove()
      this.email_error_message = null
      this.element.classList.remove("focus:border-gv-fire-engine-red", "border-gv-fire-engine-red")
    }
  }

  close_password_error_message() {
    if (this.password_container && this.password_error_message)
    {
      this.password_error_message.remove()
      this.password_error_message = null
      this.element.classList.remove("focus:border-gv-fire-engine-red", "border-gv-fire-engine-red")
    }
  }

  create_error_message(message, type) {
    this.error_message = document.createElement("p")
  
    this.element.classList.add("border-gv-fire-engine-red")
    this.error_message.id = type
    this.error_message.innerHTML = message
    this.error_message.classList.add("bg-red-300", "text-red-900", "text-sm", "font-thin", "mt-2", "rounded-lg", "border-2", "border-gv-fire-engine-red", "p-2")
    
    this.append_error_message(this.error_message, type)
  }

  append_error_message(element, type) {
    if (type === "email_error") {
      this.email_container.appendChild(element)
      this.email_error_message = element
      this.element.classList.add("focus:border-gv-fire-engine-red")
    }
    else if (type === "password_error") {
      this.password_container.appendChild(element)
      this.password_error_message = element
      this.element.classList.add("focus:border-gv-fire-engine-red")
    }
  }
}
