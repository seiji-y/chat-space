Rails.application.routes.draw do
  devise_for :users
  root   'messages#index'         #仮置きでルートパスの指定
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update]
end
