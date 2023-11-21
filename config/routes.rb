Rails.application.routes.draw do
  root 'home#home'
  get '/sessions/login', to: 'sessions#new'
  post '/sessions/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/profile/:username', to: 'users#profile'
  post '/search', to: 'home#search'
  get 'posts/:username/:post_title', to: 'posts#show'

  resources :users
  resources :posts, except: [:show]
end
