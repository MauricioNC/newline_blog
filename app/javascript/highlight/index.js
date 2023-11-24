import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/highlight.min.js';

hljs.configure({languages: ['ruby', 'bash', 'javascript', 'erb']})

document.addEventListener("turbo:load", (e) => {
  document.querySelectorAll("pre").forEach((el) => {
    hljs.highlightElement(el)
  })
})