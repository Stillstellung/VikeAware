Vikeaware is a painfully simple, VERY no frills status page generator using node and a simple html frontend.

It shows a few tiles on an html front-end that give a user:
Server Status (the game server itself)
Online Player List 
Deadliness Index (count of player deaths during the current server session)
Average World Save Time (maybe you don't need this, I have it as a matter of interest to observe as my world grows).

__________________________________________________________________________________________________________________________________________

Here's how you get the thing going:

(1)
Once you have the Vikeaware tool in its own directory, you will need to make sure you have node installed on your machine, 
and then run `npm install` in the directory.

(2)
You will then need to edit server.js and change the path to your log file in the two places: `const logPath` and 
`const logFilePath`.

(3) 
Change the name of your server or customize the tiles or whatever else you want to do in the HTML

(4)
Edit the players.json file to reflect the names and SteamIDs of the people on your server. 

(5) 
run `node server.js`
by default it will serve on port 3000 
feel free to improvise and expose the html in any way that makes sense for you at this stage. You could even
just use your own front end. everything is exposed at `/status` endpoint. Make your own viking magic!

__________________________________________________________________________________________________________________________________________

Notes:

I built this as an experiment with ChatGPT. That is to say, I fed ChatGPT with a series of very specific 
requirements over the course of a few days of experimentation and false starts. And this is what I ended up with. 
I changed any very stupid things that it tried to do, but I mostly 'let it be'. So please, don't roast me, roast the code,
roast our AI masters, and fork and fix to your heart's desire. There will be a writeup about the process on my blog (linked in my github)
in the next few days (March 7 '23 as of the writing of this README), if you're interested.

Anyway, being spawn of Robot, it probably scales very badly. 

Valheim logs clear out on each new session start- maybe that's configurable, but I have no idea. 
I don't know how big a log would need to be for this thing to start sucking. I wouldn't recommend trying to find out. 

__________________________________________________________________________________________________________________________________________

Future Improvements:
I'd like to improve the logic to try to divine a player's name and match it to Steam ID from the log info and keep that
persistent instead of relying on manual edits to `players.json`. 

Make death count persistent.
Player death count table (sums) 

Add event log w/ datetime stamps (raids etc).
__________________________________________________________________________________________________________________________________________
License and Contributing: 
Contribute away. I'll see it eventually, but please don't expect rapid response.
Curious to see how others might improve this thing. 
Full GPL text is found in the file LICENSE

    VikeAware: very simple Valheim Server status page
    Copyright (C) 2023  J Zedd

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
