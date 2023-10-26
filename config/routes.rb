Rails.application.routes.draw do
  get '/profile/:username', to: 'users#profile' 

  resources :users
end
