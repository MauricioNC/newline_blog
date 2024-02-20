module HomeHelper
  def extract_first_paragraph(content)
    doc = Nokogiri::HTML.fragment(content.to_s) # Returns an array with all the content wraped within <div></div> tags
    first_paragraph = doc.at('div:has(text())') # Returns the first div that have a text
    first_paragraph.content if first_paragraph
  end
end
