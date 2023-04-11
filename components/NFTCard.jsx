import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

import images from '../assests';
import { NFTContext } from '../context/NFTContext';
import { shortenAddress } from '../utils/shortenAddress';

const NFTCard = ({ data, onProfilePage }) => {
  const { nftCurrency } = useContext(NFTContext);

  return (
    <Link href={{ pathname: '/nft-details', query: data }}>
      <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
        <div className="relative w-full h-52 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl">
          <Image
            src={data.image || images[`nft${data.i}`]}
            fill
            style={{ objectFit: 'cover' }}
            alt={`nft-${data.i}`}
          />
        </div>
        <div className="mt-3 flex flex-col">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">{data.name}</p>
          <div className="flexBetween mt-3 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xm minlg:text-lg">{data.price} <span className="normal">{nftCurrency}</span></p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xm minlg:text-lg">{data.seller.length > 10 ? shortenAddress(onProfilePage ? data.owner : data.seller) : data.seller}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
