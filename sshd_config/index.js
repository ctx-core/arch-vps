import { be_ } from 'ctx-core/be'
import { file_exists__waitfor } from 'ctx-core/fs'
import { be_sig_triple_ } from 'ctx-core/rmemo'
import { run } from 'ctx-core/run'
import { tempfile_path_ } from 'ctx-core/tempfile'
import { readFile, unlink, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { $ } from 'zx'
import { ssh_url_ } from '../ssh_url/index.js'
export const [
	sshd_config__content$_,
	sshd_config__content_,
	sshd_config__content__set,
] = be_sig_triple_(()=>undefined)
export const sshd_config__upload = be_(ctx=>run(async ()=>{
	console.log('sshd_config__upload')
	const dir = dirname(new URL(import.meta.url).pathname)
	const sshd_config__content =
		sshd_config__content_(ctx)
		?? await readFile(`${dir}/../fs/etc/ssh/sshd_config`).then(buf=>buf.toString())
	if (typeof sshd_config__content === 'string') {
		const tempfile_path = await tempfile_path_()
		await writeFile(tempfile_path, sshd_config__content)
		await file_exists__waitfor(tempfile_path)
		try {
			// language=sh
			await $`scp ${tempfile_path} ${ssh_url_(ctx)}:/etc/ssh/sshd_config`
		} finally {
			await unlink(tempfile_path)
		}
	}
}))
