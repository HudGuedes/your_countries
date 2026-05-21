module Api
  module V1
    class RegistrationsController < ApplicationController
      skip_before_action :verify_authenticity_token

      def create
        user = User.new(user_params)

        if user.save
          sign_in(user)

          render json: {
            success: true,
            user: { id: user.id, email: user.email }
          }, status: :created
        else
          render json: {
            success: false,
            errors: user.errors.full_messages
          }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end
    end
  end
end
