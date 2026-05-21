module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :verify_authenticity_token

      def create
        user = User.find_for_authentication(email: params[:email])

        if user&.valid_password?(params[:password])
          sign_in(user)

          render json: {
            success: true,
            user: { id: user.id, email: user.email }
          }, status: :ok
        else
          render json: {
            success: false,
            error: 'Email ou senha inválidos'
          }, status: :unauthorized
        end
      end

      def destroy
        sign_out(current_user) if current_user
        render json: { success: true, message: 'Logout realizado' }, status: :ok
      end
    end
  end
end
