import {ethers} from "ethers";
import Image from "next/image";
import {useEffect, useState} from "react";

const BOKI_CONTRACT = "0x248139aFB8d3A2e16154FbE4Fb528A3a214fd8E7";
const BOKI_TOKEN_ID = 4715;

export default function Home() {
  const [token, setToken] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const contractAbi = [
    "function name() view returns (string)",
    "function tokenURI(uint256 _tokenId) view returns (string)"
  ];

  useEffect(async () => {
    setLoading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", {});
    const contractInstance = new ethers.Contract(BOKI_CONTRACT, contractAbi, provider)
    const tokenURI = await contractInstance.tokenURI(BOKI_TOKEN_ID);

    fetch(tokenURI)
      .then((result) => result.json())
      .then(data => {
        console.log(data);
        setToken(data)
        setLoading(false)
      });
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!token) return <p>No token data</p>

  return (
    <div>
      <h1>NFT Community for Boki</h1>
      <p>"This is a showcase app for NFT communities"</p>
      <Image src={`https://img.x2y2.io/v2/1/${BOKI_CONTRACT}/${BOKI_TOKEN_ID}/1440/image.jpg`} width={400} height={400} alt={token.name} />
    </div>
  )
}

export async function getStaticProps() {

  return {
    props:{
    }
  }
}
