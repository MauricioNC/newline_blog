class AccountController < ApplicationController
  before_action :decode_token

  def confirmation
    raise JWT::DecodeError, @decoded if @decoded.instance_of?(String)

    session[:user_id] = User.find(@decoded[:user_id]).id
    redirect_to root_path
  rescue ActiveRecord::RecordNotFound => e
    e.message = "User not found"
    redirect_to login_path, notice: e.message
  rescue JWT::DecodeError => e
    redirect_to login_path, notice: e.message
  end

  private

  def decode_token
    redirect_to login_path, status: :unauthorized if params[:token].nil?

    token = params[:token]
    @decoded = JwtTokenService.decode(token)
  end
end
