module Api
  module V1
    class CountriesController < ApplicationController
      skip_before_action :verify_authenticity_token
      before_action :authenticate_user!

      def index
        page = params[:page] || 1
        per_page = params[:per_page] || 24
        per_page = [per_page.to_i, 50].min
        search_term = params[:search]

        result = CountriesService.all_countries

        if result[:success]
          api_countries = result[:data]
          custom_countries = current_user.custom_countries.map { |c| c.as_json }
          all_countries = api_countries + custom_countries

          sorted_countries = all_countries.sort_by { |c| c['name'] || c[:name] }

          if search_term.present?
            search_downcase = search_term.downcase
            sorted_countries = sorted_countries.select do |country|
              name = country['name'] || country[:name]
              name&.downcase&.include?(search_downcase)
            end
          end

          paginated = Kaminari.paginate_array(sorted_countries)
                              .page(page)
                              .per(per_page)

          render json: {
            countries: paginated,
            pagination: {
              current_page: paginated.current_page,
              per_page: paginated.limit_value,
              total_count: paginated.total_count,
              total_pages: paginated.total_pages
            }
          }, status: :ok
        else
          render_response(result)
        end
      end

      def show
        result = CountriesService.by_code(params[:code])
        render_response(result)
      end

      def search
        result = CountriesService.by_name(params[:name])
        render_response(result)
      end

      private

      def render_response(result)
        if result[:success]
          render json: result, status: :ok
        else
          status = case result[:status]
                   when 404 then :not_found
                   when 503 then :service_unavailable
                   else :unprocessable_entity
                   end
          render json: { error: result[:error] }, status: status
        end
      end
    end
  end
end
