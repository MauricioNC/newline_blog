class UsersController < ApplicationController
  before_action :set_user, only: [:edit, :update]

  def index
  end

  def new
    @user = User.new
  end

  def show
  end

  def edit
  end

  def create
    @user = User.new(user_params)

    respond_to do |format|
      format.html { render :new } unless @user.save

      token = generate_token @user
      UserMailer.with(user: @user, token: token).signup_confirmation.deliver_later
      format.html {}
      format.turbo_stream {}
    end
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

  def set_user
    @user = if params[:id]
              User.find(params[:id])
            else
              current_user
            end
  end

  def user_params
    params.require(:user).permit(:fullname, :username, :email)
  end
end
