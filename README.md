# DB design

## users table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|

### Associations
- has_many :members
- has_many :groups, through: :members
- has_many :messages


## members table

|Column|Type|Options|
|------|----|-------|
|user_id|references :user|null: false, foreign_key: true|
|group_id|references :group|null: false, foreign_key: true|

### Associations
- belongs_to :group
- belongs_to :user


## groups table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Associations
- has_many :members
- has_many :messages
- has_many :users, through: :members


## messages table

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|references :user|null: false, foreign_key: true|
|group_id|references :group|null: false, foreign_key: true|

### Associations
- belongs_to :group
- belongs_to :user
