

export function LogInfo(msg) {
    console.log(' % c % s % s % s', 'color: yellow; background - color: black;', '–', msg, '–');
}

export function LogError(msg) {
    console.log('% c % s % s % s', 'color: brown; font - weight: bold; text - decoration: underline;', '–', msg,'–');
    
}