class DeleteAccountJob
  include Sidekiq::Job

  def perform(user_id)
    user = User.find(user_id)
    user.destroy
  end
end
