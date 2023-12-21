class ProfileController < ApplicationController
  def profile
  end

  def all
    render turbo_stream: turbo_stream.update('content', partial: 'shared/cards', locals: { posts: current_user.posts })
  end

  def liked
    @posts ||= []
    current_user.likes.joins(:post).each { |post| @posts.push(Post.find(post.post_id)) }
    render turbo_stream: turbo_stream.update('content', partial: 'shared/cards', locals: { posts: @posts })
  end
end
