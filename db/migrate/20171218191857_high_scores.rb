class HighScores < ActiveRecord::Migration[5.1]
  def change
  	  create_table :scores do |t|
  			t.decimal :score
  			t.integer :userid
  		end
  end
end
