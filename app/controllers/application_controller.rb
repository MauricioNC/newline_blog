class ApplicationController < ActionController::Base
  before_action :set_user
  helper_method :current_user

  def authenticate!
    redirect_to root_path unless current_user
  end

  def current_user
    @current_user ||=
      begin
        return nil unless session[:user_id]

        User.find(session[:user_id])
      end
  end

  def set_user
    @user = if params[:id]
              User.find(params[:id])
            elsif params[:username]
              User.find_by_username(params[:username])
            else
              current_user
            end
  end
end
