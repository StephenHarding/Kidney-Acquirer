class CreateHighscores < ActiveRecord::Migration[5.1]
  def change
    create_table :highscores do |t|
    	t.decimal :score
  		t.belongs_to :users
      	t.timestamps
    end
  end
end
