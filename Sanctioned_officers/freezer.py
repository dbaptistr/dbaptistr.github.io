from flask_frozen import Freezer
from app import app, Official

app.config['FREEZER_RELATIVE_URLS'] = True
app.config['FREEZER_DESTINATION'] = 'docs'

freezer = Freezer(app)

@freezer.register_generator
def show():
    for official in Official.query.all():
        yield { 'officialNumber': official.officialNumber }

if __name__ == '__main__':
    freezer.freeze()