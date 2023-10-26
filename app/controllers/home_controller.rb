class HomeController < ApplicationController
  def home
  end

  def search
    @query = params[:q]
    @posts = Post.all.map{ |post| post if post.tags.select { |t| t === params[:q] } }

    respond_to do |format|
      format.html { redirect_to root_path }
      format.turbo_stream
    end
  end
end
