Rails.application.routes.draw do
  resources :users, except: [:edit]
  resources :posts, except: [:show] do
    resources :likes, only: %i[ create destroy ]
  end

  root 'home#home'

  get '/sessions/login', to: 'sessions#new'
  post '/sessions/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # get '/account', to: 'users#edit'
  post '/search', to: 'home#search'
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
