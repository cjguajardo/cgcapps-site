import {memo} from 'react'
import {type ImageDimensions} from '@utils/image'

type BottomDetailProps = {
  size:string|null;
  name:string|null;
  mime:string|null;
  dimensions: ImageDimensions;
}

const BottomDetail =({
  size='',
  name='',
  mime='',
  dimensions={width:0, height:0}
}:BottomDetailProps)=>{

  const dimString = dimensions.width+dimensions.height>0?`${dimensions?.width||0}x${dimensions?.height||0}`:''
  const sizeString = size !== ''?`~ ${size}`:' '

  return  <div className="grid grid-cols-3 md:flex md:flex-row items-center border rounded-b-lg px-2 py-1">
    <div className="flex w-full text-center px-4 ">{sizeString}</div>
    <div className="col-span-3 col-start-1 row-start-1 md:flex w-full text-center px-4">{name}&nbsp;</div>
    <div className="flex w-full text-center px-4">{dimString}</div>
    <div className="flex w-full text-center px-4">{mime}</div>
  </div>

}

export default memo(BottomDetail)
