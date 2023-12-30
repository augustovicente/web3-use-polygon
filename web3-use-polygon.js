/* 
    - Use this script to import web3:
    <script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js/dist/web3.min.js">
    </script>
*/

const connect = async () => {
	if (window.ethereum && window.ethereum.isMetaMask) {
        // check if user has polygon network added to metamask

        const provider = window.ethereum;
        const web3 = new Web3(provider);
        const polygonNetworkId = '137';
        
        const request_wallet = () => {
            return window.ethereum.request({ method: 'eth_requestAccounts' })
        }

        const switch_to_polygon = () => {
            return window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{
                    chainId: web3.utils.toHex(polygonNetworkId)
                }]
            })
        }
        

        web3.eth.net.getId()
            .then(async (networkId) => {
                if (String(networkId) !== polygonNetworkId) {
                    // request to user polygon network
                    switch_to_polygon()
                        .then(async () => {
                            // request to user connect wallet
                            await request_wallet()
                        })
                        .catch(async (err) => {
                            alert("Rejeitado pelo usuário")

                            await add_polygon_network()
                        })
                } else {
                    // request to user connect wallet
                    await request_wallet()
                }
            })
    }
    else {
        alert("Instale o MetaMask")
    }
};

// connect it
const connectBtn = document.getElementById("connect-wallet");
connectBtn.addEventListener("click", connect);