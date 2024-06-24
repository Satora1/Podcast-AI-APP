import { GeneratePodcastProps } from '@/types'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Loader, Target } from 'lucide-react'
import { Button } from './ui/button'
import { useAction } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { v4 as uuidv4 } from 'uuid';

const useGeneratePodcast = ({ setAudio, voiceType, voicePrompt, setAudioStorageId }: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const getPodcastAudio = useAction(api.openai.generateAudioAction)
  const generatePodcast = async () => {
    setIsGenerating(true)
    setAudio("")
    if (!voicePrompt) {
      return setIsGenerating(false)
    }
    try {
      const response = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt
      })
      const blob=new Blob([response],{type:"audio/mpeg"})
      const fileName=`podcast-${uuidv4()}.mp3`
      const file=new File([blob],filename,{type:"audio/mpeg"})
    } catch (error) {
      console.log("Error generating podcast", error)
      setIsGenerating(false)
    }
  }
  return { isGenerating, generatePodcast }
}

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);

  return (
    <div>
      <div className='flex flex-col gap-2.5'>
        <Label className="text-16 font-bld text-white-1">
          AI Prompt to generate Podcast
        </Label>
        <Textarea
          className='input-class font-;ight focus-visible:ring-offset-orange-1'
          placeholder='Provide text to generate Podcast'
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)} />
      </div>
      <div className='mt-5 w-full max-w-[200px]'>
        <Button className="text-16  bg-orange-1 py-4 font-extrabold text-white-1 ">
          {isGenerating ? (
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
      {props.audio && (
        <audio
          controls
          src={props.audio}
          autoPlay
          className='mt-5'
          onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  )
}

export default GeneratePodcast