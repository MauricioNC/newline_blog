require "test_helper"

class UserMailerTest < ActionMailer::TestCase
  test "email_confirmation" do
    mail = UserMailer.signup_confirmation
    assert_equal "Email confirmation", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
