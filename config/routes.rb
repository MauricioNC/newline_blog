Rails.application.routes.draw do
  root 'home#home'
  get '/profile/:username', to: 'users#profile' 

  resources :users
end
