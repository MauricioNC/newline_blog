class DeletePostJob
  include Sidekiq::Job

  def perform(post_id)
    post = Post.find(post_id)
    post.destroy
  end
end
