export default class IPFSNetwork {
  constructor() {
    this.endpoint = new URL('https://ipfs.infura.io:5001');
  }

  /**
   * @param {Blob|File} blob
   * @returns {Promise<String|Error>}
   */
  async storeBlob(blob) {
    const url = new URL('/api/v0/add?stream-channels=true', this.endpoint)

    if (blob.size === 0) {
      throw new Error('Content size is 0, make sure to provide some content')
    }

    const formData = new FormData();
    formData.append('file', blob);

    const request = await fetch(url.toString(), {
      method: 'POST',
      body: formData,
    })
    const result = await request.json()

    if (request.ok) {
      return result.Hash
    } else {
      throw new Error(`Error while upload into IPFS Network`)
    }
  }
}