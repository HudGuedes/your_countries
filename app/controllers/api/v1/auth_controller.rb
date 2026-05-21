module Api
  module V1
    class AuthController < ApplicationController
      skip_before_action :verify_authenticity_token

      def show
        if current_user
          render json: {
            success: true,
            user: { id: current_user.id, email: current_user.email }
          }, status: :ok
        else
          render json: {
            success: false
          }, status: :ok
        end
      end
    end
  end
end
