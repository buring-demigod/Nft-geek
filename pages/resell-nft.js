import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { NFTContext } from '../context/NFTContext';
import { Loader, Button, Input } from '../components';

const ResellNft = () => {
  const { createSale } = useContext(NFTContext);
  const router = useRouter();
  const { tokenURI, tokenId } = router.query;
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchNFT = async () => {
    const { data } = await axios.get(tokenURI);

    setPrice(data.price);
    setImage(data.image);
    setIsLoading(false);
  };

  const resell = async () => {
    await createSale(tokenURI, price.toString(), true, tokenId);
    router.push('/');
  };

  useEffect(() => {
    if (tokenURI) fetchNFT();
  }, [tokenURI]);

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 px-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">Resell nft</h1>
        <Input
          inputType="number"
          title="Price"
          placeHolder="Nft price"
          handleClick={(e) => setPrice(e.target.value)}
        />

        {image && <img src={image} className="rounded mt-4" width={350} />}

        <div className="mt-7 w-full fle justify-end">
          <Button
            btnName="List NFT"
            classStyles="rounded-xl"
            handleClick={resell}
          />
        </div>
      </div>
    </div>
  );
};

export default ResellNft;
