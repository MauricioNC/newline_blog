class TagsController < ApplicationController
  def index
    tags = Tag.select(:id, :tag).map { |t| { id: t.id, tag: t.tag } }
    render json: tags, status: :ok
  end
end
