import { Modal, Button } from 'react-bootstrap'
import { useRef } from 'react'

import { QRCodeSVG } from 'qrcode.react'
export default function EtiquetaModal({ show, onHide, detalle, produccion, op }) {
  const printRef = useRef()

  if (!detalle || !produccion || !op) return null

 
  const qrData = JSON.stringify({
  np: op.id,
  rollo: String(detalle.numero_rollo).padStart(3, '0'),
  lote: produccion.lote,
  fecha: produccion.fecha,
  turno: produccion.turno,
  producto: op.producto?.nombre,
  color: op.color?.nombre,
  densidad: op.densidad,
  ancho: op.ancho,
  espesor: op.espesor,
  kg: detalle.kg
})

  const handlePrint = () => {
  const contenido = printRef.current.innerHTML
  const ventana = window.open('', '_blank', 'width=500,height=450')
  ventana.document.write('<html><head><title>Etiqueta</title><style>* { margin: 0; padding: 0; box-sizing: border-box; } @page { margin: 0mm; size: 7cm 10cm; } html, body { width: 7cm; height: 10cm; font-family: Arial, sans-serif; background: white; } .etiqueta { width: 7cm; height: 10cm; border: 2px solid black; padding: 8px; text-align: center; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; } svg { max-width: 100%; }</style></head><body>' + contenido + '</body></html>')
  ventana.document.close()
  ventana.focus()
  setTimeout(() => { ventana.print(); ventana.close() }, 500)
}

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>
          <i className="fas fa-tag me-2"></i>
          Etiqueta — Rollo #{String(detalle.numero_rollo).padStart(3, '0')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center py-4">
        <div ref={printRef}>
          <div className="etiqueta" style={{ width: '7cm', height: '10cm', margin: 10,  border: '2px solid black', padding: 30, textAlign: 'center', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
            <div style={{ borderBottom: '1px solid black', paddingBottom: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 'bold', letterSpacing: 2 }}>COMERCIAL FRYS</div>
            </div>

            <div style={{ fontSize: 15, color: '#555' }}>
              {produccion.fecha} — Turno {produccion.turno}
            </div>

            <div style={{ fontSize: 16, fontWeight: 'bold' }}>
              LOTE: {produccion.lote}
            </div>

            <div>
              <div style={{ fontSize: 14, color: '#555' }}>N° ROLLO</div>
              <div style={{ fontSize: 42, fontWeight: 'bold', lineHeight: 1 }}>
                {String(detalle.numero_rollo).padStart(3, '0')}
              </div>
            </div>

            

            <div style={{ fontSize: 18, fontWeight: 'bold' }}>
              {op.ancho} cm × {op.espesor} mcr
            </div>

            <div style={{ fontSize: 18, color: '#555' }}>
              {op.producto?.nombre}  {op.color?.nombre} |  {op.densidad}
            </div>

            <div>
              
              <div style={{ fontSize: 38, fontWeight: 'bold', lineHeight: 1 }}>
                {detalle.kg} KG
              </div>
            </div>
            <p></p>
          
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <QRCodeSVG value={qrData} size={90} />
            </div>

          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          <i className="fas fa-times me-1"></i> Cerrar
        </Button>
        <Button variant="dark" onClick={handlePrint}>
          <i className="fas fa-print me-2"></i> Imprimir
        </Button>
      </Modal.Footer>
    </Modal>
  )
}