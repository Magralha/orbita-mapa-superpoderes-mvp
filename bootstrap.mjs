import {mkdir,writeFile} from 'node:fs/promises';
import {dirname} from 'node:path';
const modules = {
 NM_API_INDEX:'api/index.mjs',
 NM_POSTGRES_STORAGE:'postgres-storage.mjs',
 NM_PARTICIPANT_VALIDATION:'participant-validation.mjs',
 NM_GUIDED_PRESENTATION:'guided-presentation.mjs',
 NM_GUIDED_BACKEND:'guided-backend.mjs',
 NM_INSIGHTS:'insights.mjs',
 NM_WORKSHOP:'workshop.mjs',
 NM_ROOM_DIAGNOSTICS:'room-diagnostics.mjs',
 NM_RENDER_SERVER:'render-server.mjs'
};
for (const [key,path] of Object.entries(modules)) {
 const source=process.env[key];
 if(!source || source.length<100)throw new Error('Required private application module not configured: '+key);
 await mkdir(dirname(path),{recursive:true});
 await writeFile(path,source,{mode:0o600});
}
console.log('Private server modules prepared for Render build; no source or credentials logged.');
