class PostsController < ApplicationController
  before_action :authenticate!, only: [ :new, :create ]
  before_action :set_user, only: [ :show ]

  def show
    @post = @user.posts.find_by_title(params[:post_title])
    @tags = Tag.limit(5).order("RANDOM()")
    @posts = Post.limit(6).order("RANDOM()")
  end

  def new
    @post = @current_user.posts.new
  end

  def create
    @post = @current_user.posts.new(posts_params)

    if @post.save
      redirect_to root_path, notice: "Post was created successfully"
    else
      render :new, notice: "Something went wrong, please try again", status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find_by_username(params[:username])
  end

  def posts_params
    params.require(:post).permit(:title, :description, :content, :banner, tag_ids: [])
  end
end
