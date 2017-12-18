class ThingsController < ApplicationController
	 before_action :ensure_signed_in
	   def show
    @thing = current_user.things.find(params[:id])
  end
end
