class UsersController < ApplicationController
  def index
  end

  def new
  end

  def show
  end

  def edit
  end

  def update
    if @user.update(user_params)
     redirect_to profile_settings_path, notice: "Your information was updated successfully"
    else
      render :edit, notice: "Something went wrong, try again", status: :unprocessable_entity
    end
  end

  def delete
  end

  private

  def user_params
    params.require(:user).permit(:fullname, :username, :email, :password, :biography)
  end
end
