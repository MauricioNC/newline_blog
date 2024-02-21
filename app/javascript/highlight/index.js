// import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/highlight.min.js';
import { HighlightJS } from "highlight.js"

document.addEventListener('turbo:load', (event) => {
  document.querySelectorAll('pre code').forEach((el) => {
    HighlightJS.highlightElement(el);
  });
});
