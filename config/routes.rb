Rails.application.routes.draw do
  root 'home#home'
  get '/profile/:username', to: 'users#profile'
  post '/search', to: 'home#search'

  resources :users
end
