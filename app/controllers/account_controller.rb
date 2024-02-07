class AccountController < ApplicationController
  def validate
    redirect_to login_path, status: :unauthorized if params[:token].nil?

    token = params[:token]
    @decoded = JwtTokenService.decode(token)
    session[:user_id] = User.find(@decoded[:user_id]).id
    redirect_to root_path
  rescue ActiveRecord::RecordNotFound => e
    render login_path, notice: e.message, status: :unauthorized
  rescue JWT::DecodeError => e
    render login_path, notice: e.message, status: :unauthorized
  end
end
