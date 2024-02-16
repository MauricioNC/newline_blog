Rails.application.routes.draw do
  resources :users, except: [:create, :edit]
  resources :posts, except: [:show] do
    member do
      post "like", to: "posts#like"
      delete "unlike", to: "posts#unlike"
    end
  end

  root 'home#home'

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  get '/account/confirmation', to: 'account#confirmation', as: 'account_confirmation'

  get '/tags', to: 'tags#index'
  get '/tag/:tag', to: 'posts#posts_by_tag', as: 'posts_by_tag'

  # get '/account', to: 'users#edit'
  get '/search', to: 'home#search'
  get '/search-form', to: 'home#search_form'
  get 'posts/:username/:post_title', to: 'posts#show', as: 'show_post'

  # Profile paths
  get '/profile/:username/', to: 'profile#profile', as: 'profile'
  get '/profile/:username/all', to: 'profile#all', as: 'user_posts_all'
  get '/profile/:username/liked', to: 'profile#liked', as: 'user_posts_liked'

  # Settings paths
  get '/account', to: 'settings#account', as: 'profile_settings'
  get '/notifications', to: 'settings#notifications', as: 'notification_settings'
  get '/password', to: 'settings#password', as: 'password_settings'
  get '/delete', to: 'settings#delete', as: 'delete_settings'
  delete '/delete', to: 'settings#delete_account', as: 'delete_account'
end
