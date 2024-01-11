require 'redcarpet'

module PostsHelper
  def markdown(text)
    options = {
      no_links: false,
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
    renderer = Redcarpet::Render::HTML.new
    Redcarpet::Markdown.new(renderer, extensions).render(text).delete("<p></p>")
  end
end
