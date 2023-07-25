export function Request(method, path, contentType, obj = null){
    
    const data = JSON.stringify(obj)

    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        console.log("Sending......");
        xhttp.onreadystatechange = async function(){
            if(this.readyState === 4){
                if (this.status >= 200 && this.status < 300){
                    console.log("Ok");
                    resolve(this.responseText);
                    return;
                }else{
                    console.log("Not Ok");
                    resolve(this.responseText);
                    return;
                }
            }
        }

        xhttp.open(method, path);
        xhttp.setRequestHeader("Content-type", contentType);
        xhttp.send(data);
    })
}