Rails.application.routes.draw do
  root 'home#home'
  get '/sessions/login', to: 'sessions#new'
  post '/sessions/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/profile/:username', to: 'users#profile'
  post '/search', to: 'home#search'
  get '/:username/:post_title', to: 'posts#show'
  get '/posts/:username/new', to: 'posts#new'

  resources :users
  resources :posts, except: [:show, :new]
end
