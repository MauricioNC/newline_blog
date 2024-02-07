class UserMailer < ApplicationMailer
  def signup_confirmation
    @user = params[:user]
    @token = params[:token]

    mail to: @user.email, subject: "Signup confirmation"
  end
end
