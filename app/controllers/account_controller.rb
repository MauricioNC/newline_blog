class AccountController < ApplicationController
  before_action :decode_token
  before_action :set_user

  def confirmation
    raise JWT::DecodeError, @decoded if @decoded.instance_of?(String)

    session[:user_id] = @user.id
    redirect_to root_path
  rescue ActiveRecord::RecordNotFound => e
    e.message = "User not found"
    redirect_to login_path, notice: e.message
  end

  private

  def decode_token
    redirect_to login_path, status: :unauthorized if params[:token].nil?

    token = params[:token]
    @decoded = JwtTokenService.decode(token)

    redirect_to login_path, notice: @decoded if @decoded.instance_of? String
  end

  def set_user
    @user = User.find(@decoded[:user_id])
  end
end
