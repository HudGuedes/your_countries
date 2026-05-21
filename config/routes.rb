Rails.application.routes.draw do
  root 'home#index'

  devise_for :users

  namespace :api do
    namespace :v1 do
      post 'login', to: 'sessions#create'
      delete 'logout', to: 'sessions#destroy'
      post 'register', to: 'registrations#create'
      get 'current_user', to: 'auth#show'

      put 'users/update', to: 'users#update'
      patch 'users/update', to: 'users#update'
      delete 'users/destroy', to: 'users#destroy'

      resources :countries, only: [:index, :show] do
        collection do
          get 'search/:name', action: :search
        end
      end

      resources :custom_countries, except: [:new, :edit]
    end
  end
end
