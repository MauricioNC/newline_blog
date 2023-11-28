class UsersController < ApplicationController

  def index
  end

  def new
  end

  def show
  end

  def update
  end

  def delete
  end

  def profile
    @user = current_user
    @posts = @user.posts.all
  end
end
