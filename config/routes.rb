Rails.application.routes.draw do
  get 'game/index'
   get 'game/assets/tiles2', to: 'asset#tiles'# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
 get 'game/assets/ground_1x1', to: 'asset#ground'
 get 'game/assets/walls_1x2', to: 'asset#walls'
 get 'game/assets/dude189x35', to: 'asset#dude'
  get 'game/assets/Kidney', to: 'asset#kidney'
get 'game/assets/collision_test4', to: 'asset#map', defaults: { format: 'json' }
resources :users, only: [:new, :create, :index, :show]
root "root#main"
  resource :session, only: [:new, :create, :destroy]
  resources :highscores
end
