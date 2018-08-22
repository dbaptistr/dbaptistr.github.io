from flask import Flask
from flask import render_template
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///officials_data.db'
db = SQLAlchemy(app)

class Official(db.Model):
  __tablename__ = 'officials_data'
  __table_args__ = {
    'autoload': True,
    'autoload_with': db.engine
  }
  officialNumber = db.Column(db.String, primary_key=True)

@app.route("/")
def list():
  officials = Official.query.all()
  return render_template("list.html", officials=officials)


@app.route("/<officialNumber>/")
def show(officialNumber):
  official = Official.query.filter_by(officialNumber=officialNumber).first()
  return render_template("show.html", official=official) 

#@app.route("/officials/sanctions") 
#def show():
#  official = Official.query.all().first()
#  return render_template("show.html", official=official)

if __name__ == "__main__":
  app.run(debug=True)