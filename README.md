# NOT PIXEL BOT

## BOT FEATURE

- Multi Account With Proxy Support
- Support Telegram Sessions and Telegram Query (Query May Expired)
- Auto Draw in Pixel
- Auto Complete Some Missions
- Auto Claim Mining
- Auto Upgrade Boost (reChargeSpeed,energyLimit,paintReward)

## Setup & Configure BOT

### Linux & MAC OS

1. clone project repo
   ```
   git clone https://github.com/vinskasenda/notpixel-bot.git
   ```
   and cd to project dir
   ```
   cd notpixel-bot
   ```
2. Run
   ```
   npm install
   ```
3. Run
   ```
   npm i telegram@2.22.2
   ```
4. Run
   ```
   mkdir -p accounts
   ```
5. Run
   ```
   cp config/config_tmp.js config/config.js && cp config/proxy_list_tmp.js config/proxy_list.js
   ```
6. (If You Use Telegram Sessions) To configure the app, run
   ```
   nano config/config.js
   ```
   and add your telegram app id and hash there.
7. (If You Use Proxy) To configure the app, run
   ```
   nano config/proxy_list.js
   ```
   and add your proxy listh there.
8. to start the app run
   ```
   npm run start
   ```
9. if any error regarding `config.js` not found, or `proxy_list.js` not found, try to copy `config` folder to `app` folder. make sure you have those file inside `config` folder.

### Windows

1. Open your `Command Prompt` or `Power Shell`.
2. Clone project repo
   ```
   git clone https://github.com/vinskasenda/notpixel-bot.git
   ```
   and cd to project dir
   ```
   cd notpixel-bot
   ```
3. Run
   ```
   npm instal
   ```
4. Run
   ```
   npm i telegram@2.22.2
   ```
5. Navigate to `not-pixel-bot` directory.
6. Make new folder named `accounts`.
7. Navigate to `config` folder and rename `config_tmp.js` to `config.js` also `proxy_list_tmp.js` to `proxy_list.js`.
8. Now Open and configure `config.js`.
9. Now back to the `not-pixel-bot` folder
10. To start the app open your `Command Prompt` or `Power Shell` again and run
    ```
    npm run start
    ```
11. If Any error happen contains config or proxy, Copy `config` folder to `app` folder
12. Finally run with
    ```
    node app/index.js
    ```

## Update Bot

To update bot follow this step :

1. run
   ```
   git pull
   ```
   or
   ```
   git pull --rebase
   ```
   if error run
   ```
   git stash && git pull
   ```
2. run
   ```
   npm update
   ```
3. start the bot.

## Setup Accounts

1. Run bot `npm run start`
2. Choose option `1` to create account
3. Choose account type `Query` or `Sessions`
4. `Session` Type
   1. Enter Account Name
   2. Enter your phone number starting with countrycode ex : `+628xxxxxxxx`
   3. You will be asked for verification code and password (if any)
   4. Start The bot Again after account creation complete
5. `Query` Type
   1. Enter Account Name
   2. Enter Telegram Query (you can get query by opening bot app on browser > inspect element > storage / application > session storage > telegram init params > copy tg web app data value)
   3. Start The bot Again after account creation complete
6. after bot started choose option 3 start bot

## Session Troubleshoot

If you asked to enter phone number again after sessions creation, it mean session not initialized correctly, try to delete the created sessions.

Example Case

- example you already have 1 session (sessionA) and all good when you run bot. After that you create another session, but when you run bot, the bot asked to enter phone number again, so the problem is on (sessionB), to fix it just remove the `accounts/sessionB` folder and re create it or just delete all folder inside `accounts` directory with prefix `sessions-`.

## Query Troubleshoot

if your bot get eror, with some error code `401` it mean your query expired, go get new query and run bot again and choose option `4` for query modification.

## Note

You can configure bot by opening `config.js` file and modify some of this param
```js
static MODE = 2; // 1 FOR 1 BY 1 RUN & 2 FOR MASS RUN
static USEAUTOUPGRADE = true; //USE AUTO UPGRADE OR NO
static REPAINTER = true; //USE INCORRECT COLOR REPAINTER
static CUSTOMDELAYINMIN = undefined; //CUSTOM DELAY IN MINUTES EX : 60 = 60 minutes
```

Don't use bot with `session` type if you using telegram account that bought from someone because it can make your telegram account deleted. instead of using `session` type, use `query` type.

This bot can use Telegram Query and Telegram Sessions. if you want to use sessions, and ever use one of my bot that use telegram sessions, you can just copy the `accounts` folder to this bot. Also for the telegram APP ID and Hash you can use it from another bot. If you want to use Telegram Query, get your query manually.

if you got error `Invalid ConstructorId` try to run this `npm i telegram@2.22.2`
