module Api
  module V1
    class CustomCountriesController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :authenticate_user!
      before_action :set_custom_country, only: [:show, :update, :destroy]

      def index
        custom_countries = current_user.custom_countries
        render json: { countries: custom_countries }, status: :ok
      end

      def show
        render json: { country: @custom_country }, status: :ok
      end

      def create
        custom_country = current_user.custom_countries.build(custom_country_params)

        if custom_country.save
          render json: { country: custom_country }, status: :created
        else
          render json: { errors: custom_country.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @custom_country.update(custom_country_params)
          render json: { country: @custom_country }, status: :ok
        else
          render json: { errors: @custom_country.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @custom_country.destroy
        render json: { message: 'Country deleted successfully' }, status: :ok
      end

      private

      def set_custom_country
        @custom_country = current_user.custom_countries.find(params[:id])
      end

      def custom_country_params
        params.require(:custom_country).permit(:name, :capital, :region, :population, :flag, :code)
      end
    end
  end
end
