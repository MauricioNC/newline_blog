class UserMailer < ApplicationMailer
  def email_confirmation
    @user = params[:user]

    mail to: @user.email, subject: "Email confirmation"
  end
end
