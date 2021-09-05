import IPFSNetwork from "@src/services/IPFSNetwork";

/**
 * Upload Blob to NFT Storage
 * 
 * @typedef {Object} SafeAsync
 * @property {Boolean|Error} error
 * @property {FileDetail} data
 * 
 * @param {File} file
 * @returns {Promise<SafeAsync>}
 */
export const uploadBlob = async (file) => {
  const client = new IPFSNetwork();

  let detail = getCidDetail({ cid: null, file });

  // Max 50MB Upload
  if (file.size > 52428800) {
    return [ new Error(`Maximum file size to be upload is 50 MB`), detail ];
  }

  try {
    const cid = await client.storeBlob(file);
    detail = getCidDetail({ cid, file });
    return { error: false, data: detail };
  } catch (error) {
    return { error, data: detail };
  }
}

/**
 * Get CID Detail with File
 * 
 * @typedef {Object} FileDetail
 * @property {String} cid
 * @property {Object} file
 * @property {String} file.name
 * @property {String} file.type
 * @property {Number} file.size
 * @property {Number} file.created_at
 * 
 * @param {Object} params
 * @param {String} params.cid
 * @param {File} params.file
 * @returns {FileDetail}
 */
export const getCidDetail = ({ cid, file }) => {
  const base = {
    name: file.name,
    type: file.type,
    size: file.size,
    created_at: Date.now()
  }

  if (!cid) return { cid: null, file: base };

  return {
    cid,
    file: base
  };
}