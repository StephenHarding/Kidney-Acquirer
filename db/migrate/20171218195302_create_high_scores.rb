class CreateHighScores < ActiveRecord::Migration[5.1]
  def change
    create_table :high_scores do |t|

      t.timestamps
    end
  end
end
