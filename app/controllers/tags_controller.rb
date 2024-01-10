class TagsController < ApplicationController
  def index
    render json: { tags: Tag.all.map { |t| t.tag.downcase }, status: :ok }
  end
end
