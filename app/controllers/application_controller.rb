class ApplicationController < ActionController::Base
  helper_method :current_user, :user_authenticated?

  def authenticate!
    redirect_to login_path unless current_user
  end

  def user_authenticated?
    !!current_user
  end

  def current_user
    @current_user ||=
      begin
        return nil unless session[:user_id]

        User.find(session[:user_id])
      end
  end

  protected

  def generate_token(user)
    JwtTokenService.encode({ user_id: user.id, email: user.email })
  end
end
