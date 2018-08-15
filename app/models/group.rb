class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  has_many :messages
  validates :name, presence: true

  def show_newest_message
    if (newest_message = messages.last ).present?
      newest_message.body? ? newest_message.body : "画像が投稿されています"
    else
      "メッセージはまだありません"
    end
  end
end
