class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = current_user
      render :show
    else
      render json: { user: nil}
    end
  end

  def create
    @user = User.find_by_credentials(params["email"], params["password"])
    if @user
      login!(@user)
      render :show
    else
      render json: { errors: ["Incorrect email or password. Please try again or click 'Forgot your password?'."] }, status: :unauthorized
    end
  end

  def destroy
    if current_user
      logout!
      render json: {message: 'success'}
    end
  end
end
