Project One - PokeDrop (open to new name ideas) Member: Jimmy, Katie, Fonz, Akiyo

Core idea: Check weather based on user location to send a daily notification of weather for the next day. Message based on weather results.

Pokemon Weather Notification 
- Uses Google Maps API (geo tag) to check user location
  - Stretch: User can enter their zip code and a date to be stored and check weather forecast on that date
    Super stretch: Check users Google calendar and parse string from Google calendar API to find destination. Send message to user based on that location when checked.
- Uses weather API to check weather based on location information.
- Notifies user of current/destination weather and send notification
  Examples: 
    “You need a jacket!” - Pikachu 
    “You need an umbrella!” - Eevee 
    “100% chance of rain!” - Squirtle 
- Notification sent as MMS via Twilio
- Chat Bot with Pokemon Get special notification for events listed on user’s Google Calendar Group chat invite allowance Daily Pokemon Facts (ex: everyday at 10am)

Library to use: React
APIs: Weather, Google Maps, Chat Bot, Google Calendar, Pokemon, Twilio
UI: Log-In Insert information Form Compute result
Settings/Functionality: Set Home Location Daily facts time

 Task: 
  Akiyo - UI, Internal app chat (bonus)
  Jimmy - Map, Weather API - Jimmy 
  Katie - Pokemon API, Chat bot  
  Fonz - Authentication, Daily notification, Calendar API (bonus)
