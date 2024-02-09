class SessionsController < ApplicationController
  before_action :user_authenticated?, only: [ :new ]
  before_action :set_user, only: [:create]
  before_action :user_token_exist?, only: [:create]

  def new
    @user = User.new
  end

  def create
    token = generate_token @user
    RegisterTokenJob.perform_async(@user.id, token)
    UserMailer.with(user: @user, token: token).signin_confirmation.deliver_later
    respond_to do |format|
      format.turbo_stream {}
    end
  end

  def destroy
    current_user.token.destroy if current_user.token.present?
    reset_session
    redirect_to root_path
  end

  private

  def set_user
    @user = User.where(email: params[:email]).first
    raise ActiveRecord::RecordNotFound, "Email #{params[:email]} doesn't exist" if @user.nil?
  rescue ActiveRecord::RecordNotFound => e
    redirect_to login_path, notice: e.message
  end

  def user_token_exist?
    redirect_to login_path, notice: "Ya tienes un token de sesion activo, espera 15 minutos para generar uno nuevo" if @user.token.present?
  end
end
