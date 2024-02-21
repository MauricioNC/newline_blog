@user = User.first
100.times do
  @user.posts.create(
    title: Faker::Lorem.sentence,
    body: Faker::Lorem.paragraphs(number: 5).join("\n"),
    # user_id: rand(1..10) # Suponiendo que ya tienes al menos 10 usuarios creados
  )
end
