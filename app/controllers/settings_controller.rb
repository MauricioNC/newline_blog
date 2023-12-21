class SettingsController < ApplicationController
  def account; end

  def notifications; end

  def password; end

  def delete; end

  def delete_account
    DeleteAccountJob.perform_async(current_user.id)
    session[:user_id] = nil
    redirect_to root_path
  end
end
