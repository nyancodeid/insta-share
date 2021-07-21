/**
 * File size human readble
 * @param {Number} bytes
 * @param {Boolean} round
 * @param {Number} fixed decimal
 * @returns {String}
 **/
export const fileSize = (bytes, si=false, dp=1) => {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return bytes.toFixed(dp) + ' ' + units[u];
}

/**
 * Copy text to clipboard
 * @param {String} value
 * @returns {Void}
 */
export const copyToClipboard = (value) => {
  const textArea = document.createElement("textarea");
  textArea.value = value;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
};

/**
 * Check is file type is video
 * @param {String} type
 * @returns {Boolean}
 **/
export const isVideo = (type) => {
  return type.indexOf("video") >= 0;
}

/**
 * Generate IPFS Gateway link
 * @param {String} cid
 * @param file
 * @returns {String}
 */
export const generateLink = ({ cid, file }) => {
  if (isVideo(file.type)) return `https://${cid}.ipfs.dweb.link`;

  return `https://cloudflare-ipfs.com/ipfs/${cid}`
}