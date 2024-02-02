class LikesController < ApplicationController
  before_action :authenticate!
  before_action :set_post

  def create
    @like = @post.likes.build(user_id: current_user.id)

    respond_to do |format|
      if @like.save
        format.html {  }
        format.turbo_stream {  }
      end
    end
  end

  def destroy
    @post.likes.where(id: params[:id]).delete_all

    respond_to do |format|
      format.html {  }
      format.turbo_stream {  }
    end
  end

  private

  def set_post
    @post = Post.find(params[:post_id])
  end
end
