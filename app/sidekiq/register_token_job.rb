class RegisterTokenJob
  include Sidekiq::Job

  def perform(user_id, token)
    user = User.find(user_id)
    user.create_token(token: token)
  end
end
