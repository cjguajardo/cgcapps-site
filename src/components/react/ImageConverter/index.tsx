import React from 'react'
import { getBase64Size } from '@utils/image'
import useImageConverter from './hooks/useImageConverter'
import Success from '@components/react/animated/success'

export default function ImageConverter() {
  const { state, handlers, refs } = useImageConverter()
  const {
    handleConvertTo, handleOutput, handleQuality, handleClick,
    handleInputFileChange, handleReset, handleConvert, handleCopyToClipboard,
    handleDrop, handleDragOver
  } = handlers
  const { fileSelectorRef, dropBoxRef } = refs



  const calcCompressedSize = (): string => {
    if (state.compressed === null || state.compressed?.length == 0) return '0';

    return '~' + getBase64Size(state.compressed, true)
  }

  const calcOriginalSize = (): string => {
    if (state.original === null || state.original?.length == 0) return '0';

    return getBase64Size(state.original)
  }

  const compressedSize = calcCompressedSize();
  const originalSize = calcOriginalSize();


  return <div className="flex flex-col justify-items-center w-full relative">
    <div className="flex flex-rows items-center justify-center">
      <div className="mb-4 w-full px-5 py-2">
        <label className="px-4 py-6 uppercase">Convert to:</label>
        <select className="w-48 p-2 rounded" name="convertTo" id="convertTo" value={state.convertTo} onChange={handleConvertTo}>
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="webp">WEBP</option>
          <option value="gif">GIF</option>
        </select>
      </div>

      <div className="mb-4 w-full px-5 py-2">
        <label className="px-4 py-6 uppercase">Output:</label>
        <select className="w-48 p-2 rounded" name="output" id="output" value={state.output} onChange={handleOutput}>
          <option value="file">File</option>
          <option value="base64">Base64</option>
        </select>
      </div>

      <div className="mb-4 w-full px-5 py-2 flex flex-grow-2">
        <label className="px-4 py-6 uppercase">Quality:</label>
        <input type="range" min="0" max="100" step="5"
          value={state.quality}
          className="w-48 mx-4 rounded" onChange={handleQuality} />
        <label><span id="quality">{state.quality}</span>%</label>
      </div>
    </div>

    <div className="mb-4 w-full px-5 py-2">
      <div className="border border-dashed rounded-t-lg border-gray-300 p-4 w-full h-[200px] hover:cursor-pointer flex justify-items-center"
        ref={dropBoxRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}>
        {state.original === null && <div className="text-center text-slate-400 my-10 flex mx-auto">Drag an image file or just click to select from your filesystem.</div>}
      </div>
      <div className="flex flex-rows items-center border rounded-b-lg px-2 py-1">
        <div className="flex w-full text-center px-4">{originalSize}</div>
        <div className="flex w-full text-center px-4">image/png</div>
      </div>
      <input type="file" className="hidden" ref={fileSelectorRef} onChange={handleInputFileChange} accept='image/*' />
    </div>

    <div className="mb-4 w-3/4 px-5 py-2 flex flex-rows gap-2 justify-items-center m-auto">
      <button className="bg-indigo-900 text-white block hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-full" onClick={handleReset}>Reset</button>
      <button className="bg-indigo-900 text-white block hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-full" onClick={handleConvert}>Convert</button>
    </div>

    {state.compressed !== null && <>

      {state.output === 'file' && <div className="mb-4 w-3/4 px-5 py-2 flex flex-rows gap-2 justify-items-center m-auto">
        <a
          className="bg-teal-900 text-white block hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full w-full"
          download={`compressed.${state.convertTo}`}
          href={state.compressed || ''}>Download {compressedSize}</a>
      </div>
      }

      {state.output === 'base64' && <div className="mb-4 w-full px-5 py-2">
        <div className="border border-dashed rounded-t-lg border-gray-300 p-4 w-full h-[200px] break-words overflow-y-auto overflow-x-hidden">
          {state.compressed}
        </div>
        <div className="flex flex-rows justify-items-center border rounded-b-lg px-2 py-1">
          <div className="flex w-full text-center px-4">{compressedSize}</div>
          <div className="flex w-full text-center px-4 hover:cursor-pointer"
            onClick={handleCopyToClipboard}>
            {state.copied && <Success show={state.copied} />}
            {'  Copy to clipboard'}
          </div>

        </div>
      </div>
      }
    </>
    }

  </div >
}
