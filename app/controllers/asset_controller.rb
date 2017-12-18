class AssetController < ApplicationController
  def map
  	render file: "/Users/stephenharding/Desktop/WDI/Unit_04/GameApp/assets/games/collision_test4.json"
  end
  def tiles
  	send_file "/Users/stephenharding/Desktop/WDI/Unit_04/GameApp/assets/games/tiles2.png", type: 'image/png', disposition: 'inline'
  end
  def ground
  	send_file "/Users/stephenharding/Desktop/WDI/Unit_04/GameApp/assets/games/ground_1x1.png", type: 'image/png', disposition: 'inline'
  end
   def walls
  	send_file "/Users/stephenharding/Desktop/WDI/Unit_04/GameApp/assets/games/walls_1x2.png", type: 'image/png', disposition: 'inline'
  end
    def dude
  	send_file "/Users/stephenharding/Desktop/WDI/Unit_04/GameApp/assets/games/dude189x35.png", type: 'image/png', disposition: 'inline'
  end
   def kidney
  	send_file "/Users/stephenharding/Desktop/WDI/Unit_04/GameApp/assets/games/Kidney.png", type: 'image/png', disposition: 'inline'
  end
end