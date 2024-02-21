class HomeController < ApplicationController
  def home
    @tags = Tag.limit(8).order("RANDOM()")
    @pagy, @posts = pagy(Post.order(created_at: :desc), items: 5)

    respond_to do |format|
      format.html
      format.turbo_stream
    end
  end

  def search
    @query = params[:q]
    @pagy, @posts = pagy(Post.left_joins(:tags).where('lower(tags.tag) LIKE ? OR lower(posts.title) LIKE ?', "%#{@query.downcase}%", "%#{@query.downcase}%").distinct.order(created_at: :desc), items: 5)

    respond_to do |format|
      format.html
      format.turbo_stream
    end
  end
end
