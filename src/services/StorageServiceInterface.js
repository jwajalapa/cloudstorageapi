class StorageServiceInterface {
  async createFile(filePath, fileName, fileContents) {
    throw new Error('Method not implemented');
  }

  async downloadFile(filePath, fileName) {
    throw new Error('Method not implemented');
  }

  async deleteFile(filePath, fileName) {
    throw new Error('Method not implemented');
  }
}

module.exports = StorageServiceInterface;
