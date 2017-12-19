class HighScores < ActiveRecord::Migration[5.1]
  def change
  	  create_table :scores do |t|
  			t.decimal :score
  			t.belongs_to :users, foreign_key: true, index: true
  		end
  end
end
