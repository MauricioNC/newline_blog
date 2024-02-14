class HomeController < ApplicationController
  def home
    @posts = Post.all
    @tags = Tag.limit(8).order("RANDOM()")
  end

  def search
    @query = params[:q]
    @posts = Post.where('lower(title) LIKE ?', "%#{@query.downcase}%").to_a
    @posts_by_tag = Post.joins(:tags).where('lower(tags.tag) LIKE ?', "%#{@query.downcase}%").to_a

    @results =  unless @posts.empty? && @posts_by_tag.empty?
                  @posts + @posts_by_tag
                else
                  []
                end

    @results.uniq.flatten.compact_blank! unless @results.nil?

    if turbo_frame_request?
      if params[:q].empty?
        redirect_to root_path
      else
        render partial: "shared/cards", locals: { posts: @results, query: @query }
      end
    else
      redirect_to root_path
    end
  end
end
