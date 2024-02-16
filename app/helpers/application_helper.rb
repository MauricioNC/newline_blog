module ApplicationHelper
  include Pagy::Frontend

  def agent_mobile?
    user_agent = request.user_agent
    client = DeviceDetector.new(user_agent)
    client.device_type == "smartphone"
  end
end
