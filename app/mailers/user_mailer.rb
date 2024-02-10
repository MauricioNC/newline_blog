class UserMailer < ApplicationMailer
  before_action :set_params

  def signup_confirmation
    mail to: @user.email, subject: "Signup confirmation"
  end

  def signin_confirmation
    mail to: @user.email, subject: "Signin confirmation"
  end

  private

  def set_params
    @user = params[:user]
    @token = params[:token]
  end
end
