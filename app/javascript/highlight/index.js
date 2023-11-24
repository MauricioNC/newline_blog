import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/highlight.min.js';

document.addEventListener("turbo:load", (e) => {
  document.querySelectorAll("pre").forEach((el) => {
    const codeTag = document.createElement("code")

    // All the content in the pre tag, is passed to the code tag, then the code tag with the whole content is appended back to the pre tag
    codeTag.textContent = el.innerHTML
    el.innerHTML = ""
    hljs.highlightElement(el.appendChild(codeTag))
  })
})
