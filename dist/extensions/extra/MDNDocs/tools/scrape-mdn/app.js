var fs=require("fs");var request=require("request");var MDN_CSS_DOC_FILENAME="css";var MDN_HTML_DOC_FILENAME="html";var DOC_LANG="";var MDN_URL="https://developer.mozilla.org/en-US/";var MDN_HTML_DOC_URL="https://developer.mozilla.org"+DOC_LANG+"/docs/Web/HTML/Element$children?expand";var MDN_CSS_DOC_URL="https://developer.mozilla.org"+DOC_LANG+"/docs/Web/CSS$children?expand";function generate(url,filename){var docData={};console.log("Fetching and constructing "+filename+" documentation...");request(url,function(error,response,body){if(!error&&response.statusCode==200){var rawData=JSON.parse(body).subpages;for(var i=0;i<rawData.length;i++){var obj=rawData[i];docData[obj.title]={URL:obj.url,SUMMARY:obj.summary}}}fs.writeFile("../../"+filename+".json",JSON.stringify(docData,null,0),function(err){console.log(filename+".json has been written.")})})}generate(MDN_HTML_DOC_URL,MDN_HTML_DOC_FILENAME);generate(MDN_CSS_DOC_URL,MDN_CSS_DOC_FILENAME);