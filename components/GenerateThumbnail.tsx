import React, { useRef, useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { GenerateThumbnailProps } from '@/types'
import { Loader } from 'lucide-react'
import { Input } from './ui/input'
import Image from 'next/image'

const GenerateThumbnail = ({ setImage, setImageStorageId, image, imagePrompt, setImagePrompt }: GenerateThumbnailProps) => {
  const [isAiThumbnail, setIsAiThumbnail] = useState(false)
  const generateImage = async () => { }
  const [isImageLoading, setIsImageLoading] = useState(false)
  const imageRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <div className='generate_thumbnail'>
        <Button
          type='button'
          variant="plain"
          onClick={() => setIsAiThumbnail(true)}
          className={cn("", { "bg-black-6": !isAiThumbnail })}
        >
          Use Ai to generate thumbnail
        </Button>
        <Button
          type='button'
          variant="plain"
          onClick={() => setIsAiThumbnail(false)}
          className={cn("", { "bg-black-6": !isAiThumbnail })}
        >
          Upload custom image
        </Button>
      </div>
      {isAiThumbnail ? (
        <div className='flex flex-col gap-5'>
          <div className='mt-5 flex flex-col gap-2.5'>
            <Label className="text-16 font-bld text-white-1">
              AI Prompt to generate Thumbnail
            </Label>
            <Textarea
              className='input-class font-;ight focus-visible:ring-offset-orange-1'
              placeholder='Provide text to generate thumbnail'
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)} />
          </div>
          <div className='w-full max-w-[200px]'>
            <Button className="text-16  bg-orange-1 py-4 font-extrabold text-white-1 "
              onClick={generateImage}>
              {isImageLoading ? (
                <>
                  Generating
                  <Loader size={20} className="animate-spin ml-2" />
                </>
              ) :
                (
                  "Generate"
                )}

            </Button>
          </div>
        </div>
      ) : (
        <div className='image_div' onClick={() => imageRef?.current?.click()}>
          <Input
            type='file'
            className='hidden'
            ref={imageRef}
          />
          {!isImageLoading ? (
            <Image
              src="/icons/upload-image.svg"
              width={40}
              height={40}
              alt='upload'
            />
          ) :
            (
              <div className='text-16 flex-center font-medium text-white-1'>
                Uploading
                <Loader size={20} className="animate-spin ml-2" />
              </div>
            )}
        </div>
      )}
      <div className='flex flex-col items-center gap-1'>
        <h2>
          Click to upload
        </h2>
        <p>
          SVG, PNG, JPG, GIF
        </p>
      </div>
    </>
  )
}

export default GenerateThumbnail