class PostsController < ApplicationController
  before_action :authenticate!, only: [ :new, :create ]
  before_action :set_user, only: [ :show ]

  def show
    @post = @user.posts.where(title: params[:post_title])
    @tags = Tag.limit(5).order("RANDOM()")
    @posts = Post.limit(6).order("RANDOM()")
  end

  def new
  end

  def create
  end

  private

  def set_user
    @user = User.find_by_username(params[:username])
  end
end
