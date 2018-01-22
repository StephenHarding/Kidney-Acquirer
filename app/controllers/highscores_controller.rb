class HighscoresController < ApiController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token
	def create
    highscore = Highscore.new(highscore_params)
    # highscore.users_id = current_user.id
    if highscore.save
      render json: {
        message: 'ok',
        highscore: highscore
      }
    else
      render json: { message: "Could not create score" }
    end
  end
   private

  def highscore_params
   {"score"=>"1.25", "users_id"=>"1"}
  end
end
