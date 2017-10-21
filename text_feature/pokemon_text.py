import requests
import keys
from flask import Flask
from flask import render_template
from flask import request
from twilio.rest import Client


app = Flask(__name__)
# Account SID from twilio.com/console
account_sid = keys.account_sid
# Auth Token from twilio.com/console
auth_token = keys.auth_token

pokemon_weather = {
    '2': ('Pikachu', 'Expect Thunder storms',
          'https://vignette2.wikia.nocookie.net/camphalfbloodroleplay/images/7/77/Pikachu.png/revision/latest?cb=20141004224742'),
    '3': ('Squirtle', 'Pack an umbrella for drizzle',
          'https://cdn.bulbagarden.net/upload/thumb/3/39/007Squirtle.png/250px-007Squirtle.png'),
    '5': ('Gyarados', 'Gonna Make it Rain!',
          'https://cdn.bulbagarden.net/upload/thumb/4/41/130Gyarados.png/250px-130Gyarados.png'),
    '6': ('Articuno', "I'm throwing snow your way!",
          'https://cdn.bulbagarden.net/upload/thumb/4/4e/144Articuno.png/250px-144Articuno.png'),
    '7': ('Butterfree', 'Flapping gusts all over town!',
          'http://vignette1.wikia.nocookie.net/pokemonfanon/images/f/f2/012Butterfree_AG_anime.png/revision/latest?cb=20160926202802'),
    '8': ('Clefairy', 'Clear skies ahead!',
          'https://cdn.bulbagarden.net/upload/thumb/f/f4/035Clefairy.png/250px-035Clefairy.png'),
    '9': ('Jigglypuff', 'The End is Nigh',
          'http://i1.kym-cdn.com/photos/images/original/000/969/432/9a2.gif')
}

def get_the_weather(zip):
    APIKey = ''
    URL = 'https://api.openweathermap.org/data/2.5/forecast?&appid='+APIKey+'&zip='+zip+',us'
    r = requests.get(URL).json()
    description = r['list'][1]['weather'][0]['description']
    id = r['list'][1]['weather'][0]['id']
    return str(id)[0]


@app.route("/")
def index_page():
    return render_template('index.html')


@app.route("/text", methods=['GET','POST'])
def poke_text():
    results = request.form
    key = get_the_weather(results['zip'])
    #Form submission in results
    #print(results)
    # Account SID from twilio.com/console
    account_sid = ""
    # Auth Token from twilio.com/console
    auth_token = ""
    client = Client(account_sid, auth_token)
    message = client.messages.create(
        to="+1" + results['cell'],
        from_="+12093950402",
        body="{} says, {} at {}".format(pokemon_weather[key][0], pokemon_weather[key][1], results['zip']),
        media_url=pokemon_weather[key][2])
    print('''\tSent to: +1{}
    from: +12093950402
    {} says, {} at {}
    image_url:{}
    '''.format(results['cell'], pokemon_weather[key][0], pokemon_weather[key][1], results['zip'],  pokemon_weather[key][2]))
    return render_template('index.html') #print("number:{}, zip code:{}, and key:{}".format()) #message.sid


if __name__ == "__main__":
    app.run()
