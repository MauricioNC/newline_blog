// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "@fortawesome/fontawesome-free"

import "./highlight"

document.addEventListener('turbo:load', () => {
  if (document.querySelector(".ss-placeholder"))
    document.querySelector(".ss-placeholder").innerHTML = "Add some tags"
})
