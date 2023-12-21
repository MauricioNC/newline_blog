class PostsController < ApplicationController
  before_action :authenticate!, only: [ :new, :create ]
  before_action :set_post, only: [ :edit, :update ]

  def show
    @post = @user.posts.find_by_title(params[:post_title])
    @tags = Tag.limit(5).order("RANDOM()")
    @posts = Post.limit(6).order("RANDOM()")
    @like = current_user.likes.where(post_id: @post.id).first
  end

  def new
    @post = @current_user.posts.new
  end

  def edit
  end

  def create
    @post = @current_user.posts.new(posts_params)

    if @post.save
      redirect_to root_path, notice: "Post was created successfully"
    else
      render :new, notice: "Something went wrong, please try again", status: :unprocessable_entity
    end
  end

  def update
    if @post.update(posts_params)
      redirect_to show_post_path(current_user.username, @post.title), notice: "Post was updated successfully"
    else
      render :edit, notice: "Something went wrong, try again",status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find_by_username(params[:username])
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def posts_params
    params.require(:post).permit(:title, :description, :content, :banner, tag_ids: [])
  end
end
