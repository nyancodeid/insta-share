import NFTStorage from "@src/services/NFTStorage";

// NFTStorage Public Key
const PUBLIC_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNhZEFEQjk2MjVEZjcwMDEyRDMzNjFFN2MyNDA5ZmE4MTNjODVmOTMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyNjYxOTQ2MDM2MiwibmFtZSI6IlB1YmxpYyBLZXkifQ.VlGodOSVqWq1N7SO298-l31GHhWwOgWP4WIZCnZoiPk`;

/**
 * Upload Blob to NFT Storage
 * @param {File} file
 * @returns {Promise<(boolean|string)[]|*[]>}
 */
export const uploadBlob = async (file) => {
  const token = PUBLIC_KEY;
  const client = new NFTStorage({ token });

  try {
    const cid = await client.storeBlob(file);
    const detail = getCidDetail({ cid, file });
    return [ false, detail ];
  } catch (error) {
    const detail = getCidDetail({ cid: null, file });
    return [ error, detail ];
  }
}

/**
 *
 * @param {String} cid
 * @param {File} file
 */
export const getCidDetail = ({ cid, file }) => {
  const base = {
    name: file.name,
    type: file.type,
    size: file.size,
    created_at: Date.now()
  }

  if (!cid) return { cid: false, file: base };

  return {
    cid,
    file: base
  };
}