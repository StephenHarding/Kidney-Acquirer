class AssetController < ApplicationController
  def map
    render file: "./app/assets/game/collision_test4.json"
  end
  def tiles
    send_file "./app/assets/game/tiles2.png", type: 'image/png', disposition: 'inline'
  end
  def ground
    send_file "./app/assets/game/ground_1x1.png", type: 'image/png', disposition: 'inline'
  end
   def walls
    send_file "./app/assets/game/walls_1x2.png", type: 'image/png', disposition: 'inline'
  end
    def dude
    send_file "./app/assets/game/Dude189x35.png", type: 'image/png', disposition: 'inline'
  end
   def kidney
    send_file "./app/assets/game/Kidney.png", type: 'image/png', disposition: 'inline'
  end
  def fav
    send_file "./app/assets/game/favicon.ico", type: 'image/png', disposition: 'inline'
  end
end