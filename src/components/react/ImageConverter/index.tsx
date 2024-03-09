import React from 'react'
import { getBase64Size, getBase64Mime } from '@utils/image'
import useImageConverter from './hooks/useImageConverter'
import Success from '@components/react/animated/success'
import BottomDetail from './bottom-detail'

export default function ImageConverter() {
  const { state, handlers, refs } = useImageConverter()
  const {
    handleConvertTo, handleQuality, handleClick,
    handleInputFileChange, handleReset, handleCopyToClipboard,
    handleDrop, handleDragOver, handleSize,
  } = handlers
  const { fileSelectorRef, dropBoxRef } = refs



  const compressedSize = getBase64Size(state.compressed||'', true);
  const compressedMime = getBase64Mime(state.compressed||'');

  const originalSize = getBase64Size(state.original||'', true);
  const originalMime = getBase64Mime(state.original||'');

  const downloadName = state.name?state.name.split('.')[0] + '.'+state.convertTo:''


  return <div className="flex flex-col justify-items-center w-full relative">

    <div className="mb-4 w-full md:px-5 py-2">
      <div className="border border-dashed rounded-t-lg border-gray-300 p-4 w-full h-[200px] hover:cursor-pointer flex justify-items-center"
        ref={dropBoxRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}>
        {state.original === null && <div className="text-center text-slate-400 flex-wrap content-center flex mx-auto h-full">Drag an image file or just click to select from your filesystem.</div>}
      </div>
      <BottomDetail size={originalSize} name={state.name} mime={originalMime} dimensions={state.original_dimensions} />
      <input type="file" className="hidden" ref={fileSelectorRef} onChange={handleInputFileChange} accept='image/*' />
    </div>


    {state.compressed !== null && <div className="mb-4 w-full md:px-5 py-2">
      <div className="border border-dashed rounded-t-lg border-gray-300 p-4 w-full h-[200px] break-words overflow-y-auto overflow-x-hidden">
        {state.compressed}
      </div>
      <BottomDetail size={compressedSize} name={state.name} mime={compressedMime} dimensions={state.compressed_dimensions} />

      <div className="mb-4 w-3/4 px-5 py-2 flex flex-col md:flex-row gap-2 justify-items-center m-auto">

        <div className="bg-teal-900 text-white block hover:bg-teal-700 text-white text-center font-bold py-2 px-4 rounded-full w-full hover:cursor-pointer"
          onClick={handleCopyToClipboard}>
          {'Copy to clipboard  '}
          {state.copied && <Success />}
        </div>
        <a
          className="bg-teal-900 text-white block hover:bg-teal-700 text-white text-center font-bold py-2 px-4 rounded-full w-full"
          download={downloadName}
          href={state.compressed || ''}>Download</a>
      </div>
    </div>}

    {/* options */}
    <div className="flex flex-col sm:flex-row items-center justify-center">
      <div className="mb-4 w-full px-5 py-2">
        <label className="px-4 py-6 uppercase">Convert to:</label>
        <select className="w-full sm:w-48 p-2 mt-2 rounded" name="convertTo" id="convertTo" value={state.convertTo} onChange={handleConvertTo}>
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="webp">WEBP</option>
          <option value="gif">GIF</option>
        </select>
      </div>

      <div className="mb-4 w-full px-5 py-2">
        <label className="px-4 py-6 uppercase">Resize:</label>
        <div className="flex flex-row w-full mt-2">
          <input type="range" min="0" max="200" step="5"
            value={state.ratioSize}
            className="w-full sm:w-48 rounded me-2"
            onChange={handleSize} />
          <span className="text-sm text-slate-400" id="quality">{state.ratioSize}%</span>
        </div> 
      </div>

      <div className="mb-4 w-full px-5 py-2">
        <label className="px-4 py-6 uppercase">Quality:</label>
        <div className="flex flex-row w-full mt-2">
          <input type="range" min="0" max="100" step="5"
            value={state.quality}
            className="w-full sm:w-48 rounded me-2"
            onChange={handleQuality} />
          <span className="text-sm text-slate-400" id="quality">{state.quality}%</span>
        </div>
      </div>

      <div className="mb-4 w-3/4 px-5 py-2 flex flex-row gap-2 justify-items-center m-auto">
        <button className="bg-indigo-900 text-white block hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-full" onClick={handleReset}>Reset</button>
      </div>

    </div>


  </div >
}
