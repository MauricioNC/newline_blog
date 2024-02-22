class ProfileController < ApplicationController
  def profile
    @posts = current_user.posts
  end

  def all
    @posts ||= current_user.posts
    render partial: 'shared/cards', locals: { posts: @posts }
  end

  def liked
    @posts ||= Post.joins(:likes).where("likes.user_id = ?", "#{current_user.id}").order(created_at: :desc)
    render partial: 'shared/cards', locals: { posts: @posts }
  end
end
