Rails.application.routes.draw do
  devise_for :users
  root   'messages#index'         #仮置きでルートパスの指定
end
