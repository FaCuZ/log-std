const moment = require('moment')

const verbose = ['CRITICAL','ERROR','WARNING','INFO','DEBUG']

const self = {
	critical: (msj) => {
		if(check_env(0)) std.out(verbose[0], msj)
		std.err(verbose[0], msj)
	},
	error: (msj) => {
		if(check_env(1)) std.out(verbose[1], msj)
		std.err(verbose[1], msj)
	},
	warning: (msj) => {
		if(check_env(2)) std.out(verbose[2], msj)
	},
	info: (msj) => {
		if(check_env(3)) std.out(verbose[3], msj)
	},
	debug: (msj) => {
		if(check_env(4)) std.out(verbose[4], msj)
	},
	code: (msj, code) => {
		let tipo = (code >= 500) ? 1 : (code >= 400) ? 2 : (code >= 200) ? 3 : 4
		self[verbose[tipo].toLowerCase()](msj)
	}
}

module.exports = self

var std = {
	out: (tipo, msj) => {
		console.log('[' + moment().format("DD/MM/YYYY HH:mm:ss") + '] ' + tipo + ':', msj)
	},
	err: (tipo, msj) => {
		console.error('[' + moment().format("DD/MM/YYYY HH:mm:ss") + '] ' + tipo + ':', msj)
	},
	both: (tipo, msj) => {
		console.log('[' + moment().format("DD/MM/YYYY HH:mm:ss") + '] ' + tipo + ':', msj)
		console.error('[' + moment().format("DD/MM/YYYY HH:mm:ss") + '] ' + tipo + ':', msj)
	}
}

function check_env(value){
	let verbose_str = (process.env.VERBOSE) ? process.env.VERBOSE.toUpperCase() : 'DEBUG'
	let verbose_nro = verbose.findIndex(valor => valor === verbose_str)

	if(verbose_nro < 0) {
		std.both('CRITICAL', 'Failure in .env variable VERBOSE is incorrect')
		return false
	}

	if(verbose_nro >= value) return true

	return false
}
