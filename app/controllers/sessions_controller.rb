class SessionsController < ApplicationController
  before_action :user_authenticated?, only: [ :new ]
  before_action :set_user, only: [:create]

  def new
    @user = User.new
  end

  def create
    token = generate_token @user
    UserMailer.with(user: @user, token: token).signin_confirmation.deliver_later
    respond_to do |format|
      format.turbo_stream {}
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

  private

  def set_user
    @user = User.find_by_email(params[:email])
  end
end
