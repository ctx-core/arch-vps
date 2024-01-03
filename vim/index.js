import { be_ } from 'ctx-core/be'
import { run } from 'ctx-core/run'
import { ssh } from 'zx'
import { ssh_url_ } from '../ssh_url/index.js'
export const vim__install = be_(ctx=>run(async ()=>{
	console.log('vim__install')
	// language=sh
	await ssh(ssh_url_(ctx))`yay -S vim --noconfirm`
}))
