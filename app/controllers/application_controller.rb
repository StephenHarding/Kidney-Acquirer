class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
 
 def current_user
    @current_user ||= find_current_user
  end
  def sign_in(user)
    token = SecureRandom.urlsafe_base64 # random 22-char string
    session[:session_token] = token
    user.update_attribute(:session_token, token)
  end
   def find_current_user
    token = session[:session_token]
    token && User.find_by(session_token: token)
  end
  def sign_out
    session.delete(:session_token)
    current_user.update_attribute(:session_token, nil)
  end
    def ensure_signed_in
    return if current_user
    flash[:error] = 'you must be signed in to see this'
    redirect_to root_path
  end
  def ensure_signed_out
    return unless current_user
    flash[:error] = 'you are signed in so you cant see that'
    redirect_to root_path
  end
end
