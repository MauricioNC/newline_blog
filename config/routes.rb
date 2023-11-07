Rails.application.routes.draw do
  root 'home#home'
  get '/profile/:username', to: 'users#profile'
  post '/search', to: 'home#search'
  get '/:username/:post_title', to: 'posts#show'

  resources :users
  resources :posts, except: [:show]
end
