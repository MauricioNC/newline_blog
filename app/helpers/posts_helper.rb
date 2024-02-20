require 'redcarpet'

module PostsHelper
  def markdown(text)
    options = {
      no_links: false,
      no_styles: false,
      escape_html: true,
      hard_wrap: true,
      link_attributes: { target: "_blank" }
    }
    extensions = {
      hard_wrap: true,
      autolink: true,
      no_intra_emphasis: true,
      tables: true,
      fenced_code_blocks: true,
      strikethrough: true,
      lax_spacing: true,
      space_after_headers: true,
      quote: true,
      footnotes: true,
      highlight: true,
      underline: true
    }
    renderer = Redcarpet::Render::HTML.new(options)
    Redcarpet::Markdown.new(renderer, extensions).render(text).html_safe
  end
end
