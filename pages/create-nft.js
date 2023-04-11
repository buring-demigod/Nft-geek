import { useState, useMemo, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import Dropzone, { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { Button, Input } from '../components';
import images from '../assests';
import { NFTContext } from '../context/NFTContext';

const createNft = () => {
  const { theme } = useTheme();
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({ price: '', name: '', description: '' });
  const { uploadToIPFS, createNFT } = useContext(NFTContext);
  const router = useRouter();

  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);

    setFileUrl(url);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  const fileStyle = useMemo(() => (
    `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
    ${isDragActive && 'border-file-active'}
    ${isDragAccept && 'border-file-accept'}
    ${isDragReject && 'border-file-reject'}
    `
  ), [isDragAccept, isDragReject, isDragAccept]);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full ">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">Create Nft</h1>
        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 text-xl font-semibold">Upload File</p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 text-xl font-semibold"> PNG,GIF,SVG,WEBM,Max 100mb</p>
                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    style={{ objectFit: 'contain' }}
                    alt="file upload"
                    className={theme === 'light' && 'filter invert'}
                  />
                </div>
                <p className="font-poppins dark:text-white text-nft-black-1 text-xl font-semibold"> Drag and Drop FIles</p>
                <p className="font-poppins mt-2 dark:text-white text-nft-black-1 text-xl font-semibold"> Or browse</p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="assest_file" />
                </div>
              </aside>
            )}
          </div>
        </div>
        <Input
          inputType="input"
          title="Name"
          placeHolder="NFT Name"
          handleClick={(e) => { setFormInput({ ...formInput, name: e.target.value }); }}
        />
        <Input
          inputType="textarea"
          title="description"
          placeHolder="NFT description"
          handleClick={(e) => { setFormInput({ ...formInput, description: e.target.value }); }}
        />
        <Input
          inputType="number"
          title="price"
          placeHolder="NFT price"
          handleClick={(e) => { setFormInput({ ...formInput, price: e.target.value }); }}
        />
        <div className="mt-10 w-full flex justify-end">
          <Button
            btnName="Create NFT"
            classStyles="rounded-xl"
            handleClick={() => {
              createNFT(formInput, fileUrl, router);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default createNft;
