import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils/index.js'
import { saveAs } from 'file-saver'

function loadFile (url, callback) {
  PizZipUtils.getBinaryContent(url, callback)
}

const ArchivoContrato = () => {
  const generateDocument = () => {
    loadFile(
      'https://docxtemplater.com/tag-example.docx',
      function (error, content) {
        if (error) {
          throw error
        }
        const zip = new PizZip(content)
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true
        })

        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render({
          first_name: 'John',
          last_name: 'Doe',
          phone: '0652455478',
          description: 'New Website'
        })
        const blob = doc.getZip().generate({
          type: 'blob',
          mimeType:
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }) // Output the document using Data-URI
        saveAs(blob, 'output.docx')
      }
    )
  }

  return (
        <div className="p-2">
        <button onClick={generateDocument}>
            Generate document
        </button>
    </div>
  )
}

export default ArchivoContrato
