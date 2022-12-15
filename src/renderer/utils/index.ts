export * as testData from './testData'

export const Uint8ArrayToString = (fileData: any) => {
    var dataString = '';
    for (var i = 0; i < fileData.length; i++) {
      dataString += String.fromCharCode(fileData[i]);
    }
    return dataString;
  };



