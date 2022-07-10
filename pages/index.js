import {ethers} from "ethers";
import {useState} from "react";
import Image from "next/image";

const BOKI_CONTRACT = "0x248139aFB8d3A2e16154FbE4Fb528A3a214fd8E7";

export default function Home({title, description}) {
  const [community, setCommunity] = useState("____")
  const [bokiImg, setBokiImg] = useState("")

  const handleClick = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const contractAbi = [
      "function name() view returns (string)",
      "function tokenURI(uint256 _tokenId) view returns (string)"
    ];
    const contractInstance = new ethers.Contract(BOKI_CONTRACT, contractAbi, provider)
    const name = await contractInstance.name()
    setCommunity(name);
    const asevenexBokiURI = await contractInstance.tokenURI(4715);
    const asevenexBokiData = await fetch(asevenexBokiURI).then(result => console.log(result));
    // console.log(asevenexBoki);
    setBokiImg(asevenexBoki)
  }

  return (
    <div>
      <h1>NFT Community for {community}</h1>
      <p>"This is a showcase app for NFT communities"</p>
      {bokiImg && <Image src={bokiImg} width={400} heigth={400} layout="fixed" />}
      <button onClick={handleClick}>Connect Wallet</button>
    </div>
  )
}

export async function getStaticProps() {

  return {
    props:{

    }
  }
}
