
const fs = require('fs');
const config = require('./config')
let scByteCodePath = config.endScBytecodePath;

const getSigner = require('./wallet');

const  {
    storecode, instantiate, exeucte
} = require('./scTools')
const fn_storecode = async (scByteCodePath) => {


    let singer = await getSigner();
    let fileContent = fs.readFileSync(scByteCodePath);
    storecode(singer, fileContent);

    /*
    *

*/
}

fn_storecode(scByteCodePath)