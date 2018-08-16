FactoryGirl.define do

  factory :message do
    body Faker::Lorem.sentence
    image File.open("spec/fixtures/cat1.jpg")
    user
    group
  end

end
