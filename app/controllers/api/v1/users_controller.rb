module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :authenticate_user!

      def update
        if current_user.update(user_params)
          sign_in(current_user, bypass: true)
          render json: {
            success: true,
            user: { id: current_user.id, email: current_user.email }
          }, status: :ok
        else
          render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        password = params[:password]

        unless current_user.valid_password?(password)
          render json: { error: 'Senha incorreta' }, status: :unauthorized
          return
        end

        current_user.destroy
        sign_out(current_user)
        render json: { message: 'Conta deletada com sucesso' }, status: :ok
      end

      private

      def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end
    end
  end
end
