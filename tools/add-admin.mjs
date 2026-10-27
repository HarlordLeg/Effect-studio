import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {createInterface} from 'node:readline/promises';
import {addAdmin} from '../lib/admin.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let input;
try{
 if(process.argv.length>3)throw Error('Usage: node tools/add-admin.mjs [login]');
 let username=process.argv[2];
 if(!username){input=createInterface({input:process.stdin,output:process.stdout});username=await input.question('New admin login: ');}
 const password=crypto.randomBytes(18).toString('base64url');
 await addAdmin(root,username,password);
 console.log('Admin added. Existing accounts preserved.\nLogin: '+username.trim()+'\nPassword: '+password+'\nSave this password.');
}catch(e){console.error(e.message);process.exitCode=1;}finally{input?.close();}
