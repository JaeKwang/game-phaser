import { ethers } from "ethers";

const HARDHAT_NETWORK_URL = "http://127.0.0.1:8545/";
const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; 
import CONTRACT_ABI from "./abi/RiftySummonerCard.json";
const provider = new ethers.JsonRpcProvider(HARDHAT_NETWORK_URL);

// 2️⃣ MetaMask 지갑 연결을 위한 Signer 가져오기
async function getSigner() {
    return await provider.getSigner(0);
}

// 3️⃣ 스마트 컨트랙트 인스턴스 가져오기 (`signer` 연결 필수!)
async function getContract() {
    const signer = await getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI.abi, signer); // ✅ `signer` 연결
}

// 4️⃣ **카드 가져오기 (signer 연결)**
async function getCardList() {
    const contract = await getContract(); // ✅ signer가 연결된 컨트랙트 가져오기
    try {
        const signer = await getSigner();
        const nfts = await contract.getOwnedNFTs(signer.address);
        
        const nftData = await Promise.all(
            nfts.map(async (id) => {
                const nft = await contract.getNFT(id);
                const name = await contract.getCardName(nft[0], 'kr');
                return {
                    id: Number(id),
                    name: String(name),
                    card_id: Number(nft[0]),
                    level: Number(nft[1]),
                    rank: Number(nft[2]),
                    skills: nft[3].map((skill) => Number(skill)), // ✅ 배열 내 BigNumber 변환
                    growthType: Number(nft[4]),
                    image: nft[5],
                    attribute: Number(nft[6]),
                    originRank: Number(nft[7]),
                    originSkillId: Number(nft[8]),
                    originSkillLevel: Number(nft[9]),
                    obtainable: Number(nft[10]),
                    tribes: nft[11].map((tribe) => Number(tribe)), // ✅ tribes 배열 변환
                };
            })
        );
        return nftData;
    } catch (error) {
        console.error("Error fetching card:", error);
        return null;
    }
}

export { getCardList };