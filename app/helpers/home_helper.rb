module HomeHelper
  def extract_first_paragraph(content)
    doc = Nokogiri::HTML5.fragment(content)
    doc.at('p:has(text())').serialize.html_safe unless doc.at('p:has(text())').nil?
  end
end
