class DeletePostJob
  include Sidekiq::Job

  def perform(post_id)
    post = Post.where(id: post_id)
    post.first.destroy if post.any?
  end
end
