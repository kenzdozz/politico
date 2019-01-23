import fs from 'fs';
import mkdirp from 'mkdirp';

const lastId = (arr) => {
  const last = Math.max(...arr.map(obj => obj.id));
  return last < 0 ? 0 : last;
};

const base64ImageDecode = (base64Data, folder) => {
  if (!base64Data) return '';
  let ext = '';
  const index0 = base64Data.charAt(0);
  if (index0 === 'i') ext = '.png';
  else if (index0 === '/') ext = '.jpg';
  else if (index0 === 'R') ext = '.gif';
  else if (index0 === 'U') ext = '.webp';

  const publicPath = `${__dirname}/../public/`;
  const fileDir = `img/${folder}`;
  const filePath = `${fileDir}/${new Date().getTime()}${ext}`;
  mkdirp.sync(publicPath + fileDir);
  const err = fs.writeFileSync(publicPath + filePath, base64Data, 'base64');
  if (!err) return filePath;
  return '';
};

export { lastId, base64ImageDecode };
