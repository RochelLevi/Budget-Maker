class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user
    else
      render json: {errors: @user.errors.full_messages}, status: 422
    end

  end


  def show
    #do I need to error handle?
    @user = User.find(params[:id])
    render json: @user
  end

  private
    def user_params
      params.permit()
    end

end
