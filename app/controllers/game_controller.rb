class GameController < ApplicationController
	before_action :ensure_signed_in, only: [:index]
  def index
  	render :index
  end
  def main
  end

end
