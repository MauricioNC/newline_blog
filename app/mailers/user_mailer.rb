class UserMailer < ApplicationMailer
  def email_confirmation
    @user = params[:user]
    @token = params[:token]

    mail to: @user.email, subject: "Email confirmation"
  end
end
