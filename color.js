console.clear()
const Https = require('https')
const Fs = require('fs')
const flens = {
    config: {
        // user to change color
        user: {
            name: `FL9NS`,   // username
            id: `103070919`  // user ID
        },
        // token of user
        token: {
            access: `<your_token_here>`, // user:manage:chat_color
            client: `<client_id_of_token_generated>`
        }
    },

    random: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    },

    color: () => {
        let colorChar = [`0`,`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`A`,`B`,`C`,`D`,`E`,`F`]
        let result = ``
        for(let i=1; i<=6; i++) {
            result += colorChar[flens.random(0, colorChar.length-1)]
        }
        return result
    },

    change: {
        color: (color) => {
            return new Promise((resolve) => {
                const req = Https.request({
                    hostname: 'api.twitch.tv',
                    path: `helix/chat/color?user_id=${flens.config.user.id}&color=%23${color}`,
                    method: `PUT`,
                    headers: {
                        'Authorization':`Bearer ${flens.config.token.access}`,
                        'Client-Id':`${flens.config.token.client}`,
                        'Content-Type': 'application/json'
                    }
                }, (res) => {
                    resolve(res.statusCode) // 204: Successfully updated the user’s chat color.
                })
                req.on('error', (e) => { resolve(0) })
                req.end()
            })
        }
    },

    pid: () => {
        // save pid in file for check if the PID is alive (not include in this script)
        Fs.writeFile(`/tmp/color.pid`, `${process.pid}`, (e) => {if(e){console.log(`impossible to save pid (${e})`)}})
    }
}

setInterval(async () => {
    let color = flens.color()
    let status = await flens.change.color(color)
    if(status !== 204) {
        process.stdout.write(`ERROR ${status}`+"         \r");
    } else {
        process.stdout.write(`#${color}`+"         \r");
    }
}, 500)

// save pid
flens.pid()
