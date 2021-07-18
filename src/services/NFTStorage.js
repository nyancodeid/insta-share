export default class NFTStorage {
  constructor({ token }) {
    this.token = token;
    this.endpoint = new URL('https://api.nft.storage');
  }

  getAuth () {
    if (!this.token) throw new Error('missing token')
    return { Authorization: `Bearer ${this.token}` }
  }

  /**
   * @param {Blob|File} blob
   * @returns {Promise<String|Error>}
   */
  async storeBlob(blob) {
    const url = new URL('/upload', this.endpoint)

    if (blob.size === 0) {
      throw new Error('Content size is 0, make sure to provide some content')
    }

    const request = await fetch(url.toString(), {
      method: 'POST',
      headers: this.getAuth(),
      body: blob,
    })
    const result = await request.json()

    if (result.ok) {
      return result.value.cid
    } else {
      throw new Error(result.error.message)
    }
  }

  /**
   *
   * @param {File[]} files
   * @returns {Promise<String|Error>}
   */
  async storeDirectory(files) {
    const url = new URL('/upload', this.endpoint)
    const body = new FormData()
    let size = 0
    for (const file of files) {
      body.append('file', file, file.name)
      size += file.size
    }

    if (size === 0) {
      throw new Error(
        'Total size of files should exceed 0, make sure to provide some content'
      )
    }

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: this.getAuth(),
      body,
    })
    const result = await response.json()

    if (result.ok) {
      return result.value.cid
    } else {
      throw new Error(result.error.message)
    }
  }
}