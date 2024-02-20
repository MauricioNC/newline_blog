class PostsController < ApplicationController
  before_action :authenticate!, only: [ :new, :create ]
  before_action :set_user, only: [ :show, :update, :like, :unlike ]
  before_action :set_post, only: [ :edit, :update, :like, :unlike ]

  def show
    @post = @user.posts.find_by_title(params[:post_title])
    @tags = Tag.limit(5).order("RANDOM()")
    @posts = Post.limit(6).order("RANDOM()")
    @like = @post.likes.where(post_id: @post.id).first
  end

  def new
    @post = @current_user.posts.new
  end

  def edit
  end

  def create
    params[:post][:tag_ids] = find_or_create_tags
    @post = @current_user.posts.new(posts_params.except(:tags))

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

  def destroy
    DeletePostJob.perform_async(params[:id])
    render turbo_stream: turbo_stream.remove("content_article_card_#{params[:id]}")
  end

  def like
    @like = current_user.likes.create(post: @post)
    render partial: "posts/post", locals: { post: @post }
  end

  def unlike
    current_user.likes.find_by(post_id: @post.id).destroy
    render partial: "posts/post", locals: { post: @post }
  end

  private

  def set_user
    @user = User.find_by_username(params[:username])
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def posts_params
    params.require(:post).permit(:title, :body, :banner, tag_ids: [])
  end

  def find_or_create_tags
    new_tags_list = []
    posts_params[:tag_ids].each_with_index do |tag_name_or_id, idx|
      next if tag_name_or_id.blank?

      if tag_name_or_id.to_i.to_s == tag_name_or_id
        new_tags_list.push(tag_name_or_id)
      else
        tag_id = Tag.find_or_create_by(tag: tag_name_or_id.strip).id.to_s
        new_tags_list.push(tag_id)
      end
    end
    new_tags_list
  end
end
