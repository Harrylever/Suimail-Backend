
const sendToWalrus = async (payload: any) => {

    const uploadToWalrus = await fetch("https://walrus-publisher-testnet.n1stake.com/v1/blobs", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "message": payload,
        })
    })
    
    const walrusBlob = await uploadToWalrus.json();
    console.log(walrusBlob);
    return walrusBlob;
}

const getFromWalrus = async (blobId: string) => {
    console.log('.....fetching from walrus');
    try{
        const fetchFromWalrus = await fetch(`https://wal-aggregator-testnet.staketab.org/v1/blobs/${blobId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        
        const payload = await fetchFromWalrus.json()
        console.log('Payload from getWalrus:', payload);
        console.log(payload.message);
        return payload;
    }catch(error){
        console.log('Get from Walrus Error:', error)
    }
}

export {sendToWalrus, getFromWalrus};
