import { promises as fs } from 'fs';
import FtpDeploy from 'ftp-deploy';
import { loadEnv } from 'vite';
import ftpConfig from './ftp.config.js';

process.env = { ...process.env, ...loadEnv('ftp', process.cwd()) };

const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /${process.env.VITE_BASE_URL}/
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /${process.env.VITE_BASE_URL}/index.html [L]
</IfModule>`;

async function generateHtaccessAndDeploy () {
	try {
		await fs.writeFile('./dist/.htaccess', htaccessContent);
		console.log('File written successfully');

		const ftpDeploy = new FtpDeploy();
		const config = {
			...ftpConfig,
			remoteRoot: process.env.VITE_FTP_DIR,
			localRoot: './dist',
			include: ['.*', '**/*'],
			// delete ALL existing files at destination before uploading, if true
			deleteRemote: true,
			// Passive mode is forced (EPSV command is not sent)
			forcePasv: true,
			// use sftp or ftp
			sftp: false,
		};
		console.log(process.env.VITE_FTP_DIR);

		await ftpDeploy.deploy(config);
		console.log(`Finish uploaded to: ${process.env.VITE_DOMAIN}${process.env.VITE_BASE_URL}`);
	} catch (error) {
		console.error('Error occurred:', error);
	}
}

generateHtaccessAndDeploy();
