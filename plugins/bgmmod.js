/* Copyright (C) 2020 afnanplk.
re edited by albin  and plk
*/

const Asena = require('../events');
const config = require('../config');
const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});
let baseURI = '/apps/' + config.HEROKU.APP_NAME;

 var plk_desc = ''
 var BGM_ONE = ''
 var BGM_TWO = ''
 
  if (config.LANG == 'EN') {
    
    plk_desc = 'change reply message BGM mode'
    BGM_ONE = '     '
    BGM_TWO = '     '
    }

    if (config.LANG == 'ML') {
      
      plk_desc = ' bgm  '
      BGM_ONE = '     '
      BGM_TWO = '     '
    }

 Asena.addCommand({pattern: 'bgm ?(.*)', fromMe: true, desc: plk_desc, usage: '.bgm one / two' }, (async (message, match) => {
        if (match[1] == 'two') {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['CHANGE_BGM_TO']: 'two'
                    } 
                });
                await message.sendMessage(BGM_TWO)
        } else if (match[1] == 'one') {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['CHANGE_BGM_TO']: 'one'
                    } 
                });
                await message.sendMessage(BGM_ONE)
        }
    }));
